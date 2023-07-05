import { CalendarIcon } from "../../../imgs/CalendarIcon.js";
import { Stopwatch } from "../../../imgs/Stopwatch.js";

export function HeaderOfListsClaims({ setStateView }) {
  return (
    <tr className="list-of-claims-header">
      <td className="first-column-list-of-claims">№</td>
      <td className="second-column-list-of-claims">
        Номер убытка:
      </td>
      <td title={'Срок с даты заявления'} className="third-column-list-of-claims" onClick={() => setStateView("filingDays")}>
        <div className="header-paddings-calendar">
          <CalendarIcon />
        </div>
      </td>
      <td title={'Срок нахождения на стадии'} className="fourth-column-list-of-claims" onClick={() => setStateView("taskStartDays")}>
        <div className="header-paddings-stopwatch">
          <Stopwatch />
        </div>
      </td>
      <td className="fifth-column-list-of-claims">
        Тип возмещения:
      </td>
      <td className="sixth-column-list-of-claims">
        Стадия рассмотрения:
      </td>
      <td className="seventh-column-list-of-claims">
        Филиал:
      </td>
      <td
        className="eighth-column-list-of-claims"
        onClick={() => setStateView("stageResponsible")}>
        Ответственный:
      </td>
    </tr>
  )
}
