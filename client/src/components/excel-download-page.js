import { useState } from "react";
import preloader from "../imgs/waves.gif"

export function ExcelDownloadPage({ preloaderCssClass, setPreloaderCssClass }) {
  const [drag, setDrag] = useState(false);
  // const [preloaderCssClass, setPreloaderCssClass] = useState("preloader-off");

  function dragStartHandler(e) {
    e.preventDefault();
    setDrag(true);
  }

  function dragLeave(e) {
    e.preventDefault();
    setDrag(false);
  }

  function dropHandler(e) {
    e.preventDefault();
    const excelFile = e.dataTransfer.files[0];
    downloaderExcelFile(excelFile);
    setDrag(false);
  }

  function downloaderExcelFile(file) {
    setPreloaderCssClass("preloader-active");
    const sendBodyFile = new FormData();
    const xhr = new XMLHttpRequest();
    sendBodyFile.append("sampleFile", file);

    xhr.open("POST", "http://localhost:3001/upload");
    xhr.send(sendBodyFile);
    xhr.onload = () => {
      if (xhr.status === 422) {
        alert(`Ошибка при чтении файла! 
        Возможно, отсутствуют необходимые поля таблицы`);
        setPreloaderCssClass("preloader-off")
      }
      else {
        //setStatements(JSON.parse(xhr.response));
        setPreloaderCssClass("preloader-info");
        setTimeout(() => setPreloaderCssClass("preloader-off"), 3000);
      }
    }
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Загрузка файла Excel:</h1>
      <div>
        {drag
          ? <div className="over-file-slot"
            onDragStart={e => dragStartHandler(e)}
            onDragLeave={e => dragLeave(e)}
            onDragOver={e => dragStartHandler(e)}
            onDrop={e => dropHandler(e)}
          >
            <h3>Отпустите файл, чтобы загрузить его</h3>
          </div>
          : <div
            className="empty-file-slot"
            onDragStart={e => dragStartHandler(e)}
            onDragLeave={e => dragLeave(e)}
            onDragOver={e => dragStartHandler(e)}
          >
            <h3>
              {preloaderCssClass === "preloader-off"
                ? "Перенесите файл для загрузки."
                : preloaderCssClass === "preloader-info"
                  ? "Данные успешно обновлены!"
                  : "Идёт загрузка и обработка файла..."}
            </h3>
            <div className={preloaderCssClass}>
              <img src={preloader} alt="Preloader..." />
            </div>
          </div>
        }
      </div>
      <div style={{ margin: "5px auto", width: "15%" }} ><h6 style={{textAlign: "center"}}>Или</h6> 
        <input title="Выберите файл для загрузки" type="file" accept='.xlsx' onChange={e => {
          e.preventDefault();
          downloaderExcelFile(e.target.files[0]);
        }} />
      </div>
    </div>)
}

    // fetch('http://localhost:3001/upload', {
    //     method: "POST",
    //     mode: "cors",
    //     credentials: "same-origin",
    //     headers: {
    //         "Content-Type": "multipart/form-data"
    //     },
    //     body: sendBodyFile,
    // })

