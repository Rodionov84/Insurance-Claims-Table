import { HeaderOfListsClaims } from "../listSkeleton/HeaderOfListsClaims";
import { ListOfClaims } from "../listSkeleton/ListOfClaims";
import { ArrowIcon } from "../../../imgs/ArrowIcon";

export function ListOfClaimsGrStagesResp({ groups, stateGroup, stateResponsible, statePeriod, stateStage, setStateView, stateView }) {
  if (!groups) {
    return null;
  } else {
    return <div>
      <h5>{stateGroup}</h5>
      <h5>{stateStage}{' '}{(stateStage !== null)
        && <span>
          <ArrowIcon />
          {' '}
          {stateResponsible}
        </span>}:
      </h5>
      <table>
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
