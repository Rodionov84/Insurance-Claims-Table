const express = require('express')
const fileUpload = require('express-fileupload');
const app = express();
const cors = require('cors');
const port = 3001
const readXlsxFile = require('read-excel-file/node');
const routs = require('./routs.js');
const connectPool = require('./files/db.js');

console.time("Time starts");

const map = {
  "Заявление": "claimNumber",
  "Количество календарных дней с даты заявления до даты среза": "filingDays",
  "Количество календарных дней на стадии": "taskStartDays",
  "Филиал заявления": "branch",
  "Тип заявления": "typeOfClaim",
  "Способ получения типизированного заявления": "methodOfReceiving",
  "Способ возмещения": "refundMethod",
  "Стадия или точка маршрута": "reviewStage",
  "Ответственный по текущей стадии": "stageResponsible",
  "Куратор": "claimCurator",
  "Задача": "taskNumber",
  "Дата и время среза по задачам": "cutDate",
  "Дата получения полного комплекта документов": "dateReceivedSetOfDocuments",
}

const mapChek = {
  "Заявление": "claimNumber",
  "Дата и время среза по задачам": "cutDate",
  "Задача": "taskNumber",
  "Количество календарных дней с даты заявления до даты среза": "filingDays",
  "Количество календарных дней на стадии": "taskStartDays",
  "Филиал заявления": "branch",
  "Стадия или точка маршрута": "reviewStage",
}

app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/statements", async (req, res) => {
  try {
    const statements = await connectPool.query("SELECT statements_json FROM uploading_file");
    res.json(statements.rows[0]);

  } catch (err) {
    console.error(err.message);
  }
})

app.use('/', routs);

app.use(fileUpload());

app.post('/upload', function (req, res) {
  const dateToday = new Date();
  console.log("------ upload -------", req.files)
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let sampleFile = req.files.sampleFile;
  console.log("------------sampleFile: ", req.files)
  let excelFrom1C = sampleFile.data;

  transformExcelToJSON(excelFrom1C, map)
    .then(rows => {
      if (!excelFileValidator(rows, mapChek)) {
        throw new Error("validation error");
      }
      return rows;
    })
    .then(rows => {
      const query = 'UPDATE uploading_file SET statements_json = $1, id = $3, data_time = $2';
      const jsonRows = JSON.stringify(rows, null, 4);
      connectPool
        .query(query, [jsonRows, dateToday, 1])
        .then(() => res.send(rows))
        .catch((e) => console.error(e.message));
    })
    .catch((error) => {
      res.status(422);
      res.send(error.message);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function transformExcelToJSON(excelFrom1C, map) {
  return readXlsxFile(excelFrom1C, { map })
    .then(({ rows }) => {
      console.log("Time starts");
      return rows
    })
    .catch(() => {
      throw new Error("error parsing file!")
    })
}

function excelFileValidator(rows, mapChek) {
  return Object.values(mapChek).every(val => Object.keys(rows[0]).includes(val));
}
