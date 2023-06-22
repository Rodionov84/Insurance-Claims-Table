import { HeaderOfListsClaims } from "../listSkeleton/HeaderOfListsClaims";
import { ListOfClaims } from "../listSkeleton/ListOfClaims";

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
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
        </svg>&nbsp;
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
      <table style={{ width: "100%" }}>
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
