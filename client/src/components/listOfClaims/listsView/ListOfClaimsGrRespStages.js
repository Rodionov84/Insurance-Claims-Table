import { HeaderOfListsClaims } from "../listSkeleton/HeaderOfListsClaims";
import { ListOfClaims } from "../listSkeleton/ListOfClaims";
import { ArrowIcon } from "../../../imgs/ArrowIcon";

export function ListOfClaimsGrRespStages({ groups, stateGroup, stateResponsible, statePeriod, stateStage, setStateView, stateView }) {
  if (!groups) {
    return null;
  } else {
    return <div>
      <h5>{stateGroup}</h5>
      <h5>{stateResponsible}{' '}{(stateStage !== null)
        && <span>
          <ArrowIcon />
          {' '}
          {stateStage}
        </span>}:
      </h5>
      <table>
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
