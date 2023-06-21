export function HeaderOfListsClaims({setStateView, stateView }) {
  return (
    <tr style={{ position: "sticky", background: "grey", fontWeight: 700, top: "38px" }}>
      <td style={{ width: "3%" }}></td>
      <td style={{ width: "18%" }}>
        Номер убытка:
      </td>
      <td title={'Срок с даты заявления'} style={{ width: "2%" }} onClick={() => setStateView("filingDays")}>
        <div style={{ padding: '0 0 3px 5px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-week" viewBox="0 0 16 16">
            <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
          </svg>
        </div>
      </td>
      <td title={'Срок нахождения на стадии'} style={{ width: "5%" }} onClick={() => setStateView("taskStartDays")}>
        <div style={{ padding: '0 0 3px 25px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-stopwatch" viewBox="0 0 16 16">
            <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
            <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
          </svg>
        </div>
      </td>
      <td style={{ width: "11%" }}>
        Тип возмещения:
      </td>
      <td style={{ width: "27%" }}>
        Стадия рассмотрения:
      </td>
      <td style={{ width: "14%" }}>
        Филиал:
      </td>
      <td onClick={() => setStateView("stageResponsible")}>
        Ответственный:
      </td>
    </tr>
  )
}