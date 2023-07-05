export function ListOfClaims({ claim, index }) {
  const titleLable = `Способ урегулирования: ${claim.typeOfAppeal}, Тип обращения: ${claim.typeOfClaim} 
Способ обращения: ${claim.methodOfReceiving}`;
    return (
      <tr key={claim.id}>
        <td>{index}</td>
        <td title={titleLable}>
          {claim.claimNumber}
        </td>
        <td className="content-center" title={`Дата получения полного комплекта документов:  ${claim.dateReceivedSetOfDocuments}`}>
          {claim.filingDays}
        </td>
        <td className="content-center" title={'Срок нахождения на стадии'}>
          {claim.taskStartDays}
        </td>
        <td>
          {claim.refundMethod.slice(0, 14)}
        </td>
        <td title={claim.reviewStage}>
          {claim.reviewStage.slice(0, 43)}
        </td>
        <td title={claim.branch}>
          {claim.branch.slice(0, 20)}
        </td>
        <td title={`ответственный:  ${claim.stageResponsible}
куратор убытка: ${claim.claimCurator}`}>
          {claim.stageResponsible.slice(0, 28)}
        </td>
      </tr>
    )
}
