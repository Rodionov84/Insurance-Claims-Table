import { HeaderOfListsClaims } from "../ListSkeleton/HeaderOfListsClaims";
import { ListOfClaims } from "../ListSkeleton/ListOfClaims";

export function ListOfClaimsGrRespStages({ groups, stateGroup, stateResponsible, statePeriod, stateStage, setStateView, stateView }) {
  if (!groups) {
    return null;
  } else {
    return <div>
      <h5>{stateGroup}</h5>
      <h5>{stateResponsible}{' '}{(stateStage !== null)
        && <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
          </svg>
          {' '}
          {stateStage}
        </span>}:
      </h5>
      <table style={{ width: "100%" }}>
        <tbody>
          <HeaderOfListsClaims setStateView={setStateView} />
          {groups.map(group => {
            if (group.groupName === stateGroup) {
              let result = [];
              let index = 1
              for (const responsible in group.responsibles) {
                for (const stage in group.responsibles[responsible]) {
                  if (responsible === stateResponsible) {
                    const sortedClaims = group.responsibles[responsible][stage];
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
                    result.push(sortedClaims.map(claim => {

                      const row = <ListOfClaims claim={claim} index={index} />

                      if (stateStage === null && claim.filingDays === statePeriod) {
                        index++;
                        return <>{row}</>
                      } else if (claim.filingDays === statePeriod && claim.reviewStage === stateStage) {
                        index++;
                        return <>{row}</>
                      } else if (statePeriod === 21 && claim.reviewStage === stateStage && claim.filingDays > 20 && claim.filingDays < 1095) {
                        index++;
                        return <>{row}</>
                      } else if (statePeriod === 21 && stateStage === null && claim.filingDays > 20 && claim.filingDays < 1095) {
                        index++;
                        return <>{row}</>
                      } else if (statePeriod === 1095 && claim.reviewStage === stateStage && claim.filingDays > 1095) {
                        index++;
                        return <>{row}</>
                      } else if (statePeriod === 1095 && stateStage === null && claim.filingDays > 1095) {
                        index++;
                        return <>{row}</>
                      } else if (statePeriod === null && stateStage === null) {
                        index++;
                        return <>{row}</>
                      } else if (statePeriod === null && claim.reviewStage === stateStage) {
                        index++;
                        return <>{row}</>
                      }
                    }))
                  }
                }
              }
              return result;
            }
          }
          )}
        </tbody>
      </table >
    </div>
  }
}
