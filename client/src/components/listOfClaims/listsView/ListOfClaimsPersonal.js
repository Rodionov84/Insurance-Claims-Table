import { HeaderOfListsClaims } from "../listSkeleton/HeaderOfListsClaims";
import { ListOfClaims } from "../listSkeleton/ListOfClaims";
import { ArrowIcon } from "../../../imgs/ArrowIcon";

export function ListOfClaimsPersonal({
  claims,
  currentEmployee,
  currentResponsible,
  currentCurator,
  statePeriod,
  setStateView,
  stateView,
}) {
  let index = 1
  if (!claims) {
    return null;
  } else {
    const sortedClaims = [...claims];
    return <div>
      <h5>{currentEmployee}&nbsp;
      <ArrowIcon />
        {currentResponsible && 'Ответственный по текущим стадиям следующих убытков:'}
        {currentCurator && 'Ответственный куратор по следующим убыткам:'}
        {<span>
          {' '}
          {statePeriod === null
            && ("")}
          {statePeriod < 21 && statePeriod !== null
            && (statePeriod + "-й день урегулирования:")}
          {statePeriod === 21
            && ("*Возможно, сроки урегулирования нарушены:")}
          {statePeriod === 1095
            && ("*Возможно, истёк срок исковой давности:")}
        </span>}
      </h5>
      <table>
        <tbody>
          <HeaderOfListsClaims setStateView={setStateView} />
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

              const row = <ListOfClaims claim={claim} index={index} />

              if (claim.stageResponsible === currentResponsible
                && currentCurator === null
                && statePeriod === null) {
                index++
                return <>{row}</>
              }
              if (claim.claimCurator === currentCurator
                && claim.claimCurator !== claim.stageResponsible
                && currentResponsible === null
                && statePeriod === null) {
                index++;
                return <>{row}</>
              }
              if (claim.stageResponsible === currentResponsible
                && currentCurator === null
                && statePeriod === claim.filingDays) {
                index++;
                return <>{row}</>
              }
              if (claim.claimCurator === currentCurator
                && claim.claimCurator !== claim.stageResponsible
                && currentResponsible === null
                && statePeriod === claim.filingDays) {
                index++;
                return <>{row}</>
              }
              if (claim.stageResponsible === currentResponsible
                && currentCurator === null
                && statePeriod === 21
                && claim.filingDays > 20
                && claim.filingDays < 1095) {
                index++;
                return <>{row}</>
              }
              if (claim.claimCurator === currentCurator
                && claim.claimCurator !== claim.stageResponsible
                && currentResponsible === null
                && statePeriod === 21
                && claim.filingDays > 20
                && claim.filingDays < 1095) {
                index++;
                return <>{row}</>
              }
              if (claim.stageResponsible === currentResponsible
                && currentCurator === null
                && statePeriod === 1095
                && claim.filingDays >= 1095) {
                index++;
                return <>{row}</>
              }
              if (claim.claimCurator === currentCurator
                && claim.claimCurator !== claim.stageResponsible
                && currentResponsible === null
                && statePeriod === 1095
                && claim.filingDays >= 1095) {
                index++;
                return <>{row}</>
              }
              return null;
            }
            )}
        </tbody>
      </table >
    </div>
  }
}
