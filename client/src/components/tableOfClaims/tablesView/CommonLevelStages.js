import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSumClaimsFromTheFilingDaysCommon, getSumClaimsCommon, getSumClaimsFromTheFilingDaysCommonOver,
  getSumClaimsFromTheFilingDaysCommonOver1095, getSumClaimsResponsibleCommon, getSumClaimsResponsibleCommonOver,
  getSumClaimsResponsibleCommonOver1095
}
  from "../../../calculations/get-sum-claims";
import { periods } from "../../../imgs/period-icons";
import { TableHeaderGeneralList } from "../tableSkeleton/TableHeaderGeneralList";
import { TableFooterGeneral } from "../tableSkeleton/TableFooterGeneral";
import { StartPreloader } from "../../preloaders/StartPreloader";

export function CommonLevelStages(
  {
    claims,
    commonStages,
    setStateStage,
    setStateResponsible,
    setStatePeriod,
    nestingViewCommonLevStages,
    setNestingViewCommonLevStages
  }
) {

  const navigate = useNavigate();

  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const sortedClaims = commonStages !== null ? [...Object.keys(commonStages)] : null;

  function rowsAccordeon(string) {
    setNestingViewCommonLevStages(prev => {
      if (prev.includes(string)) {
        return prev.filter(str => str !== string)
      }
      return [...prev, string]
    })
  }

  function showCaimsStage(stage = null, responsible = null, period = null) {
    setStateStage(stage);
    setStatePeriod(period);
    setStateResponsible(responsible);
    navigate("/list-of-claims-common");
  }

  function toggleRowsAccordeon(event, entity) {
    event.stopPropagation();
    rowsAccordeon(entity);
  }
  if (sortedClaims !== null) {
    return (
      <table>
        <TableHeaderGeneralList
          setSelectedPeriod={setSelectedPeriod}
          nameOfTableHeader="Стадии или точки маршрута: "
        />
        <tbody>
          {sortedClaims.sort((a, b) => {
            if (selectedPeriod === null) {
              return getSumClaimsCommon(commonStages[b]) - getSumClaimsCommon(commonStages[a])
            } else if (selectedPeriod === 21) {
              return getSumClaimsFromTheFilingDaysCommonOver(commonStages[b]) - getSumClaimsFromTheFilingDaysCommonOver(commonStages[a])
            } else if (selectedPeriod === 1095) {
              return getSumClaimsFromTheFilingDaysCommonOver1095(commonStages[b]) - getSumClaimsFromTheFilingDaysCommonOver1095(commonStages[a])
            }
            return getSumClaimsFromTheFilingDaysCommon(commonStages[b], selectedPeriod) - getSumClaimsFromTheFilingDaysCommon(commonStages[a], selectedPeriod)
          }).map((stage) => {
            const sortedResponsibles = [...Object.keys(commonStages[stage])];
            return <>
              <tr
                key={stage}
                className="table-row-top-level-common"
              >
                <td onClick={(event) => { toggleRowsAccordeon(event, stage) }}>
                  &nbsp;&nbsp;&nbsp;{stage}
                </td>
                <td>
                  <span onClick={() => showCaimsStage(stage)}>
                    &nbsp;&nbsp;{getSumClaimsCommon(commonStages[stage])}
                  </span>
                </td>
                {periods.map((period) => {
                  return (
                    <td className="quantity-claims-in-table">
                      <span onClick={() => showCaimsStage(stage, null, period.num)}>
                        {getSumClaimsFromTheFilingDaysCommon(commonStages[stage], period.num)}
                      </span>
                    </td>
                  )
                })}
                <td className="quantity-claims-in-table">
                  <span onClick={() => showCaimsStage(stage, null, 21)}>
                    {getSumClaimsFromTheFilingDaysCommonOver(commonStages[stage])}
                  </span>
                </td>
                <td className="quantity-claims-in-table">
                  <span onClick={() => showCaimsStage(stage, null, 1095)}>
                    {getSumClaimsFromTheFilingDaysCommonOver1095(commonStages[stage])}
                  </span>
                </td>
              </tr>
              {nestingViewCommonLevStages.includes(stage)
                && sortedResponsibles
                  .sort((a, b) => {
                    if (selectedPeriod === null) {
                      return getSumClaimsResponsibleCommon(commonStages[stage][b], b) - getSumClaimsResponsibleCommon(commonStages[stage][a], a)
                    } else if (selectedPeriod === 21) {

                      return getSumClaimsResponsibleCommonOver(commonStages[stage][b], b, 21) - getSumClaimsResponsibleCommonOver(commonStages[stage][a], a, 21)
                    } else if (selectedPeriod === 1095) {
                      return getSumClaimsResponsibleCommonOver1095(commonStages[stage][b], b, selectedPeriod) - getSumClaimsResponsibleCommonOver1095(commonStages[stage][a], a, selectedPeriod)
                    }
                    return getSumClaimsResponsibleCommon(commonStages[stage][b], b, selectedPeriod) - getSumClaimsResponsibleCommon(commonStages[stage][a], a, selectedPeriod)
                  }).map((responsible) => {
                    return (
                      <tr className="table-row-sub-level">
                        <td onClick={(event) => { toggleRowsAccordeon(event, responsible) }} className="table-row-buttom-level">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{responsible}
                        </td>
                        <td>
                          <span onClick={() => showCaimsStage(stage, responsible)}>
                            &nbsp;&nbsp;{getSumClaimsResponsibleCommon(commonStages[stage][responsible], responsible)}
                          </span>
                        </td>
                        {periods.map((period) => <td className="quantity-claims-in-table">
                          <span onClick={() => showCaimsStage(stage, responsible, period.num)}>
                            {getSumClaimsResponsibleCommon(commonStages[stage][responsible], responsible, period.num)}
                          </span>
                        </td>
                        )}
                        <td className="quantity-claims-in-table">
                          <span onClick={() => showCaimsStage(stage, responsible, 21)}>
                            {getSumClaimsResponsibleCommonOver(commonStages[stage][responsible], responsible, 21)}
                          </span>
                        </td>
                        <td className="quantity-claims-in-table">
                          <span onClick={() => showCaimsStage(stage, responsible, 1095)}>
                            {getSumClaimsResponsibleCommonOver1095(commonStages[stage][responsible], responsible, 1095)}
                          </span>
                        </td>
                      </tr>
                    )
                  })
              }
            </>
          })}
        </tbody>
        <TableFooterGeneral claims={claims} setStatePeriod={setStatePeriod} />
      </table >
    )
  }
  return <StartPreloader />;
}
