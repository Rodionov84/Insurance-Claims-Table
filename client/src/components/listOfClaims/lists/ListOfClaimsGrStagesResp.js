import { HeaderOfListsClaims } from "../ListSkeleton/HeaderOfListsClaims";
import { ListOfClaims } from "../ListSkeleton/ListOfClaims";

export function ListOfClaimsGrStagesResp({ groups, stateGroup, stateResponsible, statePeriod, stateStage, setStateView, stateView }) {
  if (!groups) {
    return null;
  } else {
    return <div>
      <h5>{stateGroup}</h5>
      <h5>{stateStage}{' '}{(stateStage !== null)
        && <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
          </svg>
          {' '}
          {stateResponsible}
        </span>}:
      </h5>
      <table style={{ width: "100%" }}>
        <tbody>
          <HeaderOfListsClaims setStateView={setStateView} />
          {groups.map(group => {
            if (group.groupName === stateGroup) {
              let result = [];
              let index = 1
              for (const stage in group.stages) {
                for (const responsible in group.stages[stage]) {
                  if (stage === stateStage) {
                    const sortedClaims = group.stages[stage][responsible];
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

                      if (stateResponsible === null && claim.filingDays === statePeriod) {
                        index++;
                        return <>{row}</>
                      } else if (claim.filingDays === statePeriod && claim.stageResponsible === stateResponsible) {
                        index++;
                        return <>{row}</>
                      } else if (statePeriod === 21 && claim.stageResponsible === stateResponsible && claim.filingDays > 20 && claim.filingDays < 1095) {
                        index++;
                        return <>{row}</>
                      } else if (statePeriod === 21 && statePeriod < 1095 && stateResponsible === null && claim.filingDays > 20 && claim.filingDays < 1095) {
                        index++;
                        return <>{row}</>
                      } else if (statePeriod === 1095 && claim.stageResponsible === stateResponsible && claim.filingDays > 1095) {
                        index++;
                        return <>{row}</>
                      } else if (statePeriod === 1095 && stateResponsible === null && claim.filingDays > 1095) {
                        index++;
                        return <>{row}</>
                      } else if (statePeriod === null && stateResponsible === null) {
                        index++;
                        return <>{row}</>
                      } else if (statePeriod === null && claim.stageResponsible === stateResponsible) {
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
      </table>
    </div>
  }
}
