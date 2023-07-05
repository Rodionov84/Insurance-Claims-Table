import { Link } from "react-router-dom";
import { stages, typesOfClaim, refundMethods, typesOfAppeal, methodsOfReceiving } from "../../data/entities-of-view"

export function Settings(
  {
    stateCommonView,
    changerView,
    stateCommonViewOptions,
    changerViewOptions
  }
) {

  return <div>
    <br></br>
    <h4>
      &nbsp;&nbsp;&nbsp;&nbsp;Настройки
    </h4>
    <div>
      <div>
        <h5>Фильтровать по способам урегулирования:</h5>
        {typesOfAppeal.map(typeOfAppeal => {
          return <>
            &nbsp;&nbsp;
            <input
              type="checkbox"
              id={typeOfAppeal}
              name={typeOfAppeal}
              value={typeOfAppeal}
              onChange={() => changerView(typeOfAppeal)}
              checked={stateCommonView.includes(typeOfAppeal) ? "checked" : ""} />
            <label htmlFor={typeOfAppeal}>&nbsp;&nbsp;{typeOfAppeal}</label><br />
          </>

        })}
        <div>
          <h5>Фильтровать по способам возмещения:</h5>
          &nbsp;&nbsp;
          <input
            type="checkbox"
            id="Оплата счета СТОА"
            name="Оплата счета СТОА"
            value="Оплата счета СТОА"
            onChange={() => changerViewOptions("Оплата счета СТОА")}
            checked={stateCommonViewOptions.includes("Оплата счета СТОА") ? "checked" : ""} />
          <label htmlFor={"Оплата счета СТОА"}
            title="При отключении данного фильтра не отображаются убытки на стадиях: 
          - Организация выплаты,
          - Организация выплаты после исправлений,
          - Оформление выплаты страхового возмещения,
          - Согласование страхового акта,
          - Запрос по выплате, 
          тип возмещения которых - по счетам СТОА">&nbsp;&nbsp;Учитывать стадии оплаты счетов СТОА</label><br />
          &nbsp;&nbsp;<input
            type="checkbox"
            id="Обмен по заявке РСА Дубль задчи"
            name="Обмен по заявке РСА Дубль задчи"
            value="Обмен по заявке РСА Дубль задчи"
            onChange={() => changerViewOptions("Обмен по заявке РСА Дубль задчи")}
            checked={stateCommonViewOptions.includes("Обмен по заявке РСА Дубль задчи") ? "checked" : ""} />
          <label htmlFor={"Обмен по заявке РСА Дубль задчи"}
            title="При отключении данного фильтра не отображаются задачи на стадии Обмен по заявке РСА первичный,
срок рассмотрения которых от 1 до 7 дней.          
">&nbsp;&nbsp;Учитывать дублирующие стадии обмена с РСА</label><br />
          {refundMethods.map(refundMethod => {
            return <>
              &nbsp;&nbsp;
              <input
                type="checkbox"
                id={refundMethod}
                name={refundMethod}
                value={refundMethod}
                onChange={() => changerView(refundMethod)}
                checked={stateCommonView.includes(refundMethod) ? "checked" : ""} />
              <label htmlFor={refundMethod}>&nbsp;&nbsp;{refundMethod}</label><br />
            </>

          })}
        </div>
      </div>
      <div>
        <h5>Фильтровать по способам обращения:</h5>
        {methodsOfReceiving.map(methodOfReceiving => {
          return <>
            &nbsp;&nbsp;
            <input
              type="checkbox"
              id={methodOfReceiving}
              name={methodOfReceiving}
              value={methodOfReceiving}
              onChange={() => changerView(methodOfReceiving)}
              checked={stateCommonView.includes(methodOfReceiving) ? "checked" : ""} />
            <label htmlFor={methodOfReceiving}>&nbsp;&nbsp;{methodOfReceiving}</label><br />
          </>
        })}
      </div>
      <br></br>
      <div>
        <h5>Фильтровать по стадиям и ТМ:</h5>
        {stages.sort((a, b) => a.localeCompare(b)).map(stage => {

          return <>
            &nbsp;&nbsp;
            <input
              type="checkbox"
              id={stage}
              name={stage}
              value={stage}
              onChange={() => changerView(stage)}
              checked={stateCommonView.includes(stage) ? "checked" : ""}
            />
            <label htmlFor={stage}>&nbsp;&nbsp;{stage}</label><br />
          </>
        })}
      </div>
      <div>
        <h5>Фильтровать по типам заявления:</h5>
        {typesOfClaim.map(typeOfClaim => {
          return <>
            &nbsp;&nbsp;
            <input
              type="checkbox"
              id={typeOfClaim}
              name={typeOfClaim}
              value={typeOfClaim}
              onChange={() => changerView(typeOfClaim)}
              checked={stateCommonView.includes(typeOfClaim) ? "checked" : ""} />
            <label htmlFor={typeOfClaim}>&nbsp;&nbsp;{typeOfClaim}</label><br />
          </>
        })}
      </div>
      <br></br>
      <br></br>
      <br></br>
    </div>
  </div>
}