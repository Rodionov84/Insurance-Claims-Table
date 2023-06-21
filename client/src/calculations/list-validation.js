export function listValidation(statements) {
  if (statements !== null) {
    let result = []
    const dublicateDaysIgnore = [1, 2, 3, 4, 5, 6, 7]
    for (const claim of statements) {
      let objClaim = { ...claim };
      const regex = new RegExp('D');
      objClaim.id = objClaim.claimNumber + objClaim.taskNumber;
      if (regex.test(objClaim.claimNumber)) {
        objClaim.typeOfAppeal = 'ОСАГО';
      } else {
        objClaim.typeOfAppeal = 'ПВУ';
        objClaim.id = objClaim.claimNumber + objClaim.taskNumber;
      }
      if (objClaim.stageResponsible === '#ERROR_undefined' || objClaim.stageResponsible === undefined) {
        objClaim.stageResponsible = 'Ответственный не назначен';
      }
      if (objClaim.methodOfReceiving === '#ERROR_undefined' || objClaim.methodOfReceiving === undefined) {
        objClaim.methodOfReceiving = 'Способ получения Заявления не указан';
      }
      if (objClaim.refundMethod === "#ERROR_undefined" || objClaim.refundMethod === undefined) {
        objClaim.refundMethod = "Способ возмещения не выбран";
      }
      if (objClaim.typeOfClaim === "#ERROR_undefined" || objClaim.typeOfClaim === undefined) {
        objClaim.typeOfClaim = "Тип заявления не выбран";
      }
      if (objClaim.claimCurator === "#ERROR_undefined" || objClaim.claimCurator === undefined) {
        objClaim.claimCurator = "Куратор не назначен";
      }
      if (objClaim.dateReceivedSetOfDocuments === "#ERROR_undefined" || objClaim.dateReceivedSetOfDocuments === undefined) {
        objClaim.dateReceivedSetOfDocuments = "дата не указана";
      }
      // фильтры для оплаты счетов СТОА:
      if ((objClaim.reviewStage === "Организация выплаты"
        || objClaim.reviewStage === "Организация выплаты после исправлений"
        || objClaim.reviewStage === "Оформление выплаты страхового возмещения"
        || objClaim.reviewStage === "Согласование страхового акта"
        || objClaim.reviewStage === "Запрос по выплате")
        && (objClaim.refundMethod === "по счетам СТОА страховщика"
          || objClaim.refundMethod === "по счетамСТОА страхователя")) {
        objClaim.typeOfPayment = "Оплата счета СТОА";
      } else {
        objClaim.typeOfPayment = "Не оплата счетов СТОА";
      } if (objClaim.reviewStage === "Обмен по заявке РСА первичный"
        && dublicateDaysIgnore.includes(objClaim.filingDays)) {
        objClaim.statementDublicate = "Обмен по заявке РСА Дубль задчи";
      } else {
        objClaim.statementDublicate = "Не дубль задачи";
      }
      result.push(objClaim);
    }
    return result;
  }
  return null;
}
