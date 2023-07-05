import { HeaderOfListsClaims } from "../listSkeleton/HeaderOfListsClaims";
import { ListOfClaims } from "../listSkeleton/ListOfClaims";
import { ArrowIcon } from "../../../imgs/ArrowIcon";

export function ListOfClaimsCommonAll({ statePeriod, claims, setStateView, stateView }) {
  let index = 1

  if (statePeriod === null) {
    return null;
  } else {
    const sortedClaims = [...claims];
    return <div>
      <h5>
        {(statePeriod !== null)
          && <span>
            <ArrowIcon />
            {' '}
            {statePeriod === true
              && ("Всего убытков: ")}
            {(statePeriod < 21 && statePeriod !== true)
              && (statePeriod + "-й день урегулирования:")}
            {statePeriod === 21
              && ("Возможно, сроки урегулирования нарушены:")}
            {statePeriod === 1095
              && ("Возможно, истёк срок исковой давности:")}
          </span>}
      </h5>
      <table>
        <tbody>
          <HeaderOfListsClaims setStateView={setStateView} stateView={stateView} />
          {/* стейт для сортировки по дням со дня заявления, на стадии, по сотруднику */}
          {sortedClaims
            .sort((a, b) => {
              if (stateView === "taskStartDays") {

                return b.taskStartDays - a.taskStartDays;
              }
              if (stateView === "stageResponsible") {
                return a.stageResponsible.localeCompare(b.stageResponsible);
              }
              return b.filingDays - a.filingDays;
            })
            .map(claim => {
              const row = <ListOfClaims claim={claim} index={index}/>
              if (statePeriod === true) {
                index++;
                return <>{row}</>
              }
              else if (statePeriod === claim.filingDays) {
                index++;
                return <>{row}</>
              }
              else if (statePeriod === 21 && claim.filingDays > 20 && claim.filingDays < 1095) {
                index++;
                return <>{row}</>
              }
              else if (statePeriod === 1095 && claim.filingDays >= 1095) {
                index++;
                return <>{row}</>
              }
              else if (statePeriod === claim.filingDays) {
                index++;
                return <>{row}</>
              }
              return null;
            }
            )}
        </tbody>
      </table>
    </div>
  }
}
