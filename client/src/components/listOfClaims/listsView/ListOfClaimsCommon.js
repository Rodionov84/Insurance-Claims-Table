import { HeaderOfListsClaims } from "../listSkeleton/HeaderOfListsClaims";
import { ListOfClaims } from "../listSkeleton/ListOfClaims";
import { ArrowIcon } from "../../../imgs/ArrowIcon";

export function ListOfClaimsCommon({ statePeriod, stateResponsible, stateStage, claims, setStateView, stateView }) {
  let index = 1

  if (!claims) {
    return null;
  } else {
    const sortedClaims = [...claims];
    return <div>
      <h5>{stateStage}
        {' '}{(statePeriod !== null)
          && <span>
            <ArrowIcon />
            {' '}
            {statePeriod < 21
              && (statePeriod + "-й день урегулирования:")}
            {statePeriod === 21
              && ("Возможно, сроки урегулирования нарушены:")}
            {statePeriod === 1095
              && ("Возможно, истёк срок исковой давности:")}
          </span>}
      </h5>
      <table>
        <tbody>
          <HeaderOfListsClaims setStateView={setStateView} />
          {/* стейт для сортировки по дням со дня заявления, на стадии, по сотруднику */}

          {
            sortedClaims
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

                const row = <ListOfClaims claim={claim} index={index} />

                if (claim.reviewStage === stateStage) {

                  if (statePeriod === null && stateResponsible === null) {
                    index++;
                    return <>{row}</>
                  }
                  if (statePeriod === null && stateResponsible === null && stateStage === null) {
                    index++;
                    return <>{row}</>
                  }
                  else if (statePeriod === claim.filingDays && stateResponsible === null) {
                    index++;
                    return <>{row}</>
                  }
                  else if (statePeriod === 21 && claim.filingDays > 20 && claim.filingDays < 1095 && stateResponsible === null) {
                    index++;
                    return <>{row}</>
                  }
                  else if (statePeriod === 1095 && claim.filingDays >= 1095 && stateResponsible === null) {
                    index++;
                    return <>{row}</>
                  } else if (statePeriod === null && stateResponsible === claim.stageResponsible) {
                    index++;
                    return <>{row}</>
                  }
                  else if (statePeriod === claim.filingDays && stateResponsible === claim.stageResponsible) {
                    index++;
                    return <>{row}</>
                  }
                  else if (statePeriod === 21 && claim.filingDays > 20 && claim.filingDays < 1095 && stateResponsible === claim.stageResponsible) {
                    index++;
                    return <>{row}</>
                  }
                  else if (statePeriod === 1095 && claim.filingDays >= 1095 && stateResponsible === claim.stageResponsible) {
                    index++;
                    return <>{row}</>
                  }
                }
                return null;
              }
              )}
        </tbody>
      </table>
    </div>
  }
}
