const { listValidation } = require("../calculations/list-validation");

export function setFilters(statements, stateCommonView, stateCommonViewOptions) {
  if (statements !== null) {
    const updatedStatements = listValidation(statements);
    return updatedStatements.filter(statement => {
      return (
        stateCommonView.includes(statement.reviewStage)
        && stateCommonView.includes(statement.typeOfClaim)
        && stateCommonView.includes(statement.refundMethod)
        && stateCommonView.includes(statement.typeOfAppeal)
        && stateCommonView.includes(statement.methodOfReceiving)
        && stateCommonViewOptions.includes(statement.typeOfPayment)
        && stateCommonViewOptions.includes(statement.statementDublicate)
      )
    })
  }
  return null
}
