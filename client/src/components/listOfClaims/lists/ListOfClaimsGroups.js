import { HeaderOfListsClaims } from "../ListSkeleton/HeaderOfListsClaims";
import { ListOfClaims } from "../ListSkeleton/ListOfClaims";

export function ListOfClaimsGroups({ groups, stateGroup, statePeriod, setStateView, stateView }) {
  if (!groups) {
    return null;
  } else {
    return <div>
      <h5>{stateGroup}</h5>
      <table style={{ width: "100%" }}>
        <tbody>
          <HeaderOfListsClaims setStateView={setStateView} />
          {groups
            .map(group => {
              if (group.groupName === stateGroup) {
                let result = [];
                let index = 1
                for (const responsible in group.responsibles) {
                  for (const stage in group.responsibles[responsible]) {
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

                      if (claim.filingDays === statePeriod) {
                        index++;
                        return <>{row}</>
                      } else if (statePeriod === 21 && claim.filingDays < 1095 && claim.filingDays > 20) {
                        index++;
                        return <>{row}</>
                      } else if (statePeriod === 1095 && claim.filingDays >= 1095) {
                        index++;
                        return <>{row}</>
                      } else if (statePeriod === null) {
                        index++;
                        return <>{row}</>
                      }
                    }))
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
