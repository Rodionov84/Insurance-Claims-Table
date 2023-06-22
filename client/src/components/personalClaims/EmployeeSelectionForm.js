export function EmployeeSelectionForm({ claims, setCurrentEmployee, selectionFormView, setSelectionFormView }) {
  const responsibles = claims.reduce((acc, item) => {
    if (acc.includes(item.stageResponsible)) {
      return acc; // если значение уже есть, то просто возвращаем аккумулятор
    }
    return [...acc, item.stageResponsible]; // добавляем к аккумулятору и возвращаем новый аккумулятор
  }, []);

  const curators = claims.reduce((acc, item) => {
    if (acc.includes(item.claimCurator)) {
      return acc; // если значение уже есть, то просто возвращаем аккумулятор
    }
    return [...acc, item.claimCurator]; // добавляем к аккумулятору и возвращаем новый аккумулятор
  }, []);
  const employees = [...responsibles, ...curators].reduce((acc, item) => {
    if (acc.includes(item)) {
      return acc;
    }
    return [...acc, item];
  }, []).sort((a, b) => a.localeCompare(b));

  function employeeSelected(e) {
    setSelectionFormView("employee-selection-form-hidden");
    setCurrentEmployee(e.target.value);
  }

  return (
    <div className={selectionFormView}>
      <div className="employee-selection-form">
        <h5 >Выбрать сотрудника:</h5>
        <div className="employee-selection-row">
          <select type="text" class="form-select form-select-sm" aria-label=".form-select-sm example" onChange={employeeSelected}>
          <option value="ФИО">Выбрать сотрудника</option>
            {employees.map((employee => {
              return <option value={employee}>{employee}</option>
            }))}
          </select>
          <button onClick={() => setSelectionFormView("employee-selection-form-hidden")} className='btn btn-secondary' style={{ marginTop: "12px", marginLeft: "465px" }}>Отмена</button>
        </div>
      </div>
    </div>
  )
}