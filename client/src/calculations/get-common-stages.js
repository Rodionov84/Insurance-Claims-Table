export function getCommonStages(claims) {
  let result = [];

  function fillListStages(claims) {
    listValidation(claims);
    const resultByStages = {};
    for (const claim of claims) {
      const key = claim.reviewStage;
      if (resultByStages[key] === undefined) {
        resultByStages[key] = [];
      };
      resultByStages[key].push(claim);
    }
    return resultByStages;
  }

  function fillListResponsibles(claims) {
    const stages = fillListStages(claims);
    const resultByResponsibles = {};
    for (const stage in stages) {
      resultByResponsibles[stage] = {};
      for (const claim of stages[stage]) {
        const key = claim.stageResponsible;
        if (resultByResponsibles[stage][key] === undefined) {
          resultByResponsibles[stage][key] = [];
        };
        resultByResponsibles[stage][key].push(claim);
      }
    }
    return resultByResponsibles;
  }

  function listValidation(claims) {
    for (const claim of claims) {
      const regex = new RegExp('D');
      if (regex.test(claim.claimNumber)) {
        claim.typeOfAppeal = 'ОСАГО';
      } else {
        claim.typeOfAppeal = 'ПВУ';
      }
      if (claim.stageResponsible === '#ERROR_undefined') {
        claim.stageResponsible = '_Ответственный не назначен';
      }
      if (claim.methodOfReceiving === '#ERROR_undefined') {
        claim.methodOfReceiving = '_Способ получения Заявления не указан';
      }
      claim.id = claim.claimNumber + claim.taskNumber;
    }
  }
  if (claims !== null) {
    result.push(fillListResponsibles(claims))
    return result[0];
  }
  return null;
}



































// const claims = require("../data/statements.json");

// function getCommonStages(claims) {
//   let result = [];

//   function fillListStages(claims) {
//     listValidation(claims);
//     const resultByStages = {};
//     for (const claim of claims) {
//       const key = claim.reviewStage;
//       if (resultByStages[key] === undefined) {
//         resultByStages[key] = [];
//       };
//       resultByStages[key].push(claim);
//     }
//     return resultByStages;
//   }

//   function fillListResponsibles(claims) {
//     const stages = fillListStages(claims);
//     const resultByResponsibles = {};
//     for (const stage in stages) {
//       resultByResponsibles[stage] = {};
//       for (const claim of stages[stage]) {
//         const key = claim.stageResponsible;
//         if (resultByResponsibles[stage][key] === undefined) {
//           resultByResponsibles[stage][key] = [];
//         };
//         resultByResponsibles[stage][key].push(claim);
//       }
//     }
//     return resultByResponsibles;
//   }

//   function listValidation(claims) {
//     for (const claim of claims) {
//       const regex = new RegExp('D');
//       if (regex.test(claim.claimNumber)) {
//         claim.typeOfAppeal = 'ОСАГО';
//       } else {
//         claim.typeOfAppeal = 'ПВУ';
//       }
//       if (claim.stageResponsible === '#ERROR_undefined') {
//         claim.stageResponsible = '_Ответственный не назначен';
//       }
//       if (claim.methodOfReceiving === '#ERROR_undefined') {
//         claim.methodOfReceiving = '_Способ получения Заявления не указан';
//       }
//       claim.id = claim.claimNumber + claim.taskNumber;
//     }
//   }
//   result.push(fillListResponsibles(claims))
//   return result[0];
// }

// module.exports = {
//   getCommonStages
// }


// const statements =
// {
//   "Заказ независимой экспертизы по урегулированию убытков": {
//     "Вязовская Ирина Геннадьевна": [
//       {
//         "claimNumber": "ТТТ 7017348363D№0000003",
//         "filingDays": 19,
//         "taskStartDays": 4,
//         "branch": "Центральный филиал",
//         "typeOfClaim": "Первичное",
//         "methodOfReceiving": "Лично",
//         "refundMethod": "по калькуляции СОГАЗ",
//         "reviewStage": "Заказ независимой экспертизы по урегулированию убытков",
//         "stageResponsible": "Матвеев Алексей Владимирович",
//         "taskNumber": "042531520",
//         "typeOfAppeal": "ОСАГО",
//         "id": "ТТТ 7017348363D№0000003042531520"
//       }
//     ]
//   },
//   "Заказ независимой экспертизы по УУ": {
//     "Вязовская Ирина Геннадьевна": [
//       {
//         "claimNumber": "ХХХ 0262023216P№0001",
//         "filingDays": 19,
//         "taskStartDays": 4,
//         "branch": "Волгоградский филиал",
//         "typeOfClaim": "Первичное",
//         "methodOfReceiving": "Лично",
//         "refundMethod": "по калькуляции НЭ (независимой экспертизы)",
//         "reviewStage": "Заказ независимой экспертизы по УУ",
//         "stageResponsible": "Вязовская Ирина Геннадьевна",
//         "taskNumber": "042562141",
//         "typeOfAppeal": "ПВУ",
//         "id": "ХХХ 0262023216P№0001042562141"
//       },
//       {
//         "claimNumber": "ХХХ 0262023216P№0002",
//         "filingDays": 18,
//         "taskStartDays": 5,
//         "branch": "Волгоградский филиал",
//         "typeOfClaim": "Первичное",
//         "methodOfReceiving": "Лично",
//         "refundMethod": "по калькуляции НЭ (независимой экспертизы)",
//         "reviewStage": "Заказ независимой экспертизы по УУ",
//         "stageResponsible": "Вязовская Ирина Геннадьевна",
//         "taskNumber": "042562141",
//         "typeOfAppeal": "ПВУ",
//         "id": "ХХХ 0262023216P№0002042562141"
//       },
//     ],
//     "Грибкова Анна Геннадьевна": [
//       {
//         "claimNumber": "ХХХ 0260499010P№0001",
//         "filingDays": 4,
//         "taskStartDays": 4,
//         "branch": "Волгоградский филиал",
//         "typeOfClaim": "Первичное",
//         "methodOfReceiving": "Лично",
//         "refundMethod": "по счетам СТОА страховщика",
//         "reviewStage": "Обмен по заявке РСА первичный",
//         "stageResponsible": "Вязовская Ирина Геннадьевна",
//         "taskNumber": "042539553",
//         "typeOfAppeal": "ПВУ",
//         "id": "ХХХ 0260499010P№0001042539553"
//       }
//     ]
//   }
// }
