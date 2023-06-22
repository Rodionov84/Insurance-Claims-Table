import { HeaderOfListsClaims } from "../listSkeleton/HeaderOfListsClaims";
import { ListOfClaims } from "../listSkeleton/ListOfClaims";

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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
            </svg>
            {' '}
            {statePeriod < 21
              && (statePeriod + "-й день урегулирования:")}
            {statePeriod === 21
              && ("Возможно, сроки урегулирования нарушены:")}
            {statePeriod === 1095
              && ("Возможно, истёк срок исковой давности:")}
          </span>}
      </h5>
      <table style={{ width: "100%" }}>
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
