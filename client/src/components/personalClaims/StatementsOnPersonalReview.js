import { periods } from "../../imgs/period-icons";
import { useState } from "react";
import { EmployeeSelectionForm } from "./EmployeeSelectionForm";
import { getSumPersonal } from "../../calculations/get-sum-claims";
import { useNavigate } from "react-router-dom";
import { StartPreloader } from "../preloaders/StartPreloader";

export function StatementsOnPersonalReview({
  claims,
  currentEmployee,
  setCurrentResponsible,
  setCurrentCurator,
  setStatePeriod,
  setCurrentEmployee
}) {

  const [selectionFormView, setSelectionFormView] = useState("employee-selection-form-hidden")

  const navigate = useNavigate();

  function showCaimsPersonal(employee = null, curator = null, period = null) {
    setStatePeriod(period);
    setCurrentResponsible(employee);
    setCurrentCurator(curator);
    navigate("/list-of-claims-personal");
  }
  function showCaimsPersonalAll(employee = null, curator = null, period = null) {
    setStatePeriod(period);
    setCurrentResponsible(employee);
    setCurrentCurator(curator);
    navigate("/list-of-claims-personal-all");
  }
  if (claims !== null) {
    return (<div>
      <EmployeeSelectionForm
        claims={claims}
        selectionFormView={selectionFormView}
        setSelectionFormView={setSelectionFormView}
        setCurrentEmployee={setCurrentEmployee}
        setCurrentResponsible={setCurrentResponsible}
      />
      <table style={{ width: "100%" }}>
        <tr style={{ position: "sticky", top: "38px", backgroundColor: "CadetBlue" }}>
          <th onClick={() => setSelectionFormView("wrap-form")} style={{ width: "45%", fontSize: "20px", cursor: "pointer" }} title="Выбрать сотрудника">
            &nbsp;&nbsp;{currentEmployee ? currentEmployee : "ФИО"}
          </th>
          <th onClick={() => setStatePeriod(null)} style={{ width: "5%", cursor: "default" }}>
            Всего:
          </th>
          {periods.map(period => {
            return <th onClick={() => setStatePeriod(period.num)} className="th-table-header">
              <div className="th-img-block">
                <svg id={period.num} viewBox="0 0 122.87 122.88" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <title>{period.num === 2 ? "поступило новых заявлений" : period.num + " дней со дня принятия заявления"}</title>
                  {period.icon}
                </svg>
              </div>
              <div className="staff-block"></div>
            </th>
          })
          }
          <th onClick={() => setStatePeriod(21)} title="более 20 дней со дня принятия заявления" className="th-table-header-21">
            <div className="th-img-block">
              <svg id="более 20 дней" viewBox="0 0 580 580">
                <path fill-rule="nonzero" d="M294.24 17.11C294.24 7.69 303.52 0 315.1 0c11.57 0 20.87 7.65 20.87 17.11v74.85c0 9.42-9.3 17.11-20.87 17.11-11.58 0-20.86-7.65-20.86-17.11V17.11zm97.69 379.25h-28.37c-2.82-34.41-8.75-32.21-8.75-66.65 0-12.71 10.32-23 22.99-23 12.69 0 23 10.33 23 23 .03 34.39-6.02 32.24-8.87 66.65zm-28.37 16.4h28.37v25.15h-28.37v-25.15zm14.26-174.65c36.98 0 70.56 15.04 94.83 39.35C496.96 301.7 512 335.25 512 372.31c0 37.02-15.02 70.61-39.3 94.88l-.68.64c-24.23 23.88-57.5 38.66-94.2 38.66-37.06 0-70.61-15.04-94.88-39.31l-.64-.69c-23.9-24.24-38.68-57.53-38.68-94.18 0-37.06 15.04-70.61 39.32-94.88 24.27-24.28 57.85-39.32 94.88-39.32zm78.74 55.41c-20.09-20.11-47.96-32.58-78.74-32.58-30.75 0-58.61 12.47-78.75 32.62-20.15 20.14-32.62 48-32.62 78.75 0 30.5 12.25 58.14 32.02 78.19l.6.55c20.14 20.14 48 32.62 78.75 32.62 30.48 0 58.12-12.26 78.21-32.03l.54-.58c20.15-20.15 32.61-48 32.61-78.75s-12.48-58.61-32.62-78.79zM56.8 242.28c-1.17 0-2.23-5.2-2.23-11.56 0-6.39.92-11.54 2.23-11.54h56.94c1.18 0 2.24 5.2 2.24 11.54 0 6.38-.92 11.56-2.24 11.56H56.8zm90.77 0c-1.17 0-2.23-5.2-2.23-11.56 0-6.39.92-11.54 2.23-11.54h56.94c1.18 0 2.24 5.2 2.24 11.54 0 6.38-.92 11.56-2.24 11.56h-56.94zm90.77 0c-1.16 0-2.22-5.2-2.22-11.56 0-6.39.92-11.54 2.22-11.54h56.94c1.19 0 2.25 5.15 2.25 11.49-5.7 3.55-11.2 7.44-16.43 11.61h-42.76zm-181.4 66.24c-1.18 0-2.24-5.2-2.24-11.57 0-6.38.93-11.58 2.24-11.58h56.94c1.18 0 2.22 5.2 2.22 11.58 0 6.37-.91 11.57-2.22 11.57H56.94zm90.77 0c-1.18 0-2.24-5.2-2.24-11.57 0-6.38.93-11.58 2.24-11.58h56.94c1.18 0 2.23 5.2 2.23 11.58 0 6.37-.92 11.57-2.23 11.57h-56.94zM57.06 374.8c-1.18 0-2.24-5.2-2.24-11.58 0-6.37.94-11.57 2.24-11.57H114c1.19 0 2.24 5.2 2.24 11.57 0 6.38-.93 11.58-2.24 11.58H57.06zm90.78 0c-1.19 0-2.25-5.2-2.25-11.58 0-6.37.94-11.57 2.25-11.57h56.94c1.18 0 2.24 5.2 2.24 11.57 0 6.38-.94 11.58-2.24 11.58h-56.94zM106.83 17.11C106.83 7.69 116.1 0 127.69 0c11.57 0 20.86 7.65 20.86 17.11v74.85c0 9.42-9.34 17.11-20.86 17.11-11.59 0-20.86-7.65-20.86-17.11V17.11zM22.97 163.64h397.39V77.46c0-2.94-1.19-5.53-3.09-7.43-1.9-1.9-4.59-3.08-7.42-3.08h-38.1c-6.39 0-11.59-5.2-11.59-11.57 0-6.38 5.2-11.58 11.59-11.58h38.1c9.32 0 17.7 3.77 23.82 9.89 6.12 6.13 9.88 14.49 9.88 23.82v136.81c-7.61-2.62-15.41-4.73-23.44-6.29v-21.38h.25H22.97v223.17c0 2.94 1.18 5.52 3.08 7.42 1.91 1.9 4.61 3.09 7.44 3.09h188.85c2.16 8.01 4.86 15.83 8.11 23.35H33.71c-9.3 0-17.7-3.75-23.84-9.89C3.75 427.72 0 419.36 0 410.02V77.55c0-9.29 3.75-17.7 9.87-23.82 6.14-6.13 14.5-9.88 23.84-9.88h40.67c6.38 0 11.57 5.2 11.57 11.56C85.95 61.8 80.76 67 74.38 67H33.71c-2.96 0-5.54 1.18-7.44 3.08-1.9 1.9-3.09 4.59-3.09 7.43v86.16h-.21v-.03zm158.95-96.69c-6.39 0-11.57-5.2-11.57-11.57 0-6.38 5.18-11.58 11.57-11.58h77.55c6.39 0 11.57 5.2 11.57 11.58 0 6.37-5.18 11.57-11.57 11.57h-77.55z" />
              </svg>
            </div>
            <div className="staff-block"></div>
          </th>
          <th onClick={() => setStatePeriod(1095)} title={"более 1095 дней, возможно превышение срока исковой давности"} className="th-table-header-1095">
            <div className="th-img-block-1095">
              <svg xmlns="http://www.w3.org/2000/svg" fill="black" className="bi bi-hourglass-bottom" viewBox="0 0 16 16">
                <path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5zm2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702s.18.149.5.149.5-.15.5-.15v-.7c0-.701.478-1.236 1.011-1.492A3.5 3.5 0 0 0 11.5 3V2h-7z" />
              </svg>
            </div>
          </th>
        </tr>
        <tbody>
          <tr
            className="table-row-responsible-level"
            style={{
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
          </tr>
          <tr
            className="table-row-responsible-level"
            style={{
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            <td style={{ cursor: "default" }}>&nbsp;&nbsp;&nbsp;Является ответственным по текущей стадии рассмотрения:</td>
            <td onClick={() => showCaimsPersonal(currentEmployee, null, null)} >
              &nbsp;&nbsp;&nbsp;{getSumPersonal(claims, null, currentEmployee, null)}
            </td>
            {periods.map(period => {
              return <td
                onClick={() => showCaimsPersonal(currentEmployee, null, period.num)}
                style={{ textAlign: "center" }}>
                {getSumPersonal(claims, period.num, currentEmployee, null)}
              </td>
            })}
            <td onClick={() => showCaimsPersonal(currentEmployee, null, 21)}
              style={{ textAlign: "center" }}>
              {getSumPersonal(claims, 21, currentEmployee, null)}
            </td>
            <td onClick={() => showCaimsPersonal(currentEmployee, null, 1095)}
              style={{ textAlign: "center" }}>
              {getSumPersonal(claims, 1095, currentEmployee, null)}
            </td>
          </tr>
          <tr
            className="table-row-responsible-level"
            style={{
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            <td style={{ cursor: "default" }}>
              &nbsp;&nbsp;&nbsp;Является ответственным куратором убытка:
            </td>
            <td onClick={() => showCaimsPersonal(null, currentEmployee, null)}>
              &nbsp;&nbsp;&nbsp;{getSumPersonal(claims, null, null, currentEmployee)}</td>
            {periods.map(period => {
              return (
                <td onClick={() => showCaimsPersonal(null, currentEmployee, period.num)}
                  style={{ textAlign: "center" }}>
                  {getSumPersonal(claims, period.num, null, currentEmployee)}
                </td>)
            })}
            <td onClick={() => showCaimsPersonal(null, currentEmployee, 21)}
              style={{ textAlign: "center" }}>
              {getSumPersonal(claims, 21, null, currentEmployee)}
            </td>
            <td onClick={() => showCaimsPersonal(null, currentEmployee, 1095)}
              style={{ textAlign: "center" }}>
              {getSumPersonal(claims, 1095, null, currentEmployee)}
            </td>
          </tr>
        </tbody>
        <tfoot style={{ backgroundColor: "grey" }} >
          <tr
            style={{
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            <td style={{ cursor: "default" }}>&nbsp;&nbsp;Итого:</td>
            <td onClick={() => showCaimsPersonalAll(currentEmployee, currentEmployee, null)}>
              &nbsp;&nbsp;&nbsp;{getSumPersonal(claims, null, currentEmployee, currentEmployee)}</td>
            {periods.map(period => {
              return <td onClick={() => showCaimsPersonalAll(currentEmployee, currentEmployee, period.num)}
                style={{ textAlign: "center" }}>{getSumPersonal(claims, period.num, currentEmployee, currentEmployee)}</td>
            })}
            <td onClick={() => showCaimsPersonalAll(currentEmployee, currentEmployee, 21)}
              style={{ textAlign: "center" }}>{getSumPersonal(claims, 21, currentEmployee, currentEmployee)}</td>
            <td onClick={() => showCaimsPersonalAll(currentEmployee, currentEmployee, 1095)}
              style={{ textAlign: "center" }}>{getSumPersonal(claims, 1095, currentEmployee, currentEmployee)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    )
  }
  return <StartPreloader />
}
