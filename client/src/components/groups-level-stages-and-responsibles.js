import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSumClaimsInGroup, getSumClaimsInGroupStagesRespons, getSumClaimsFromTheFilingDays, getSumClaimsFromTheFilingDaysStages, getSumClaimsFromTheFilingDaysOver,
  getSumClaimsResponsible, getSumClaimsStage, getSumClaimsFromTheFilingDaysForResponsible,
  getSumClaimsFromTheFilingDaysForResponsibleOver, getSumClaimsFromTheFilingDaysForStageAndResponsibles,
  getSumClaimsResponsibleAndStage, getSumClaimsFromTheFilingDaysForStage, getSumClaimsStageAndResponsible, getSumClaimsFromTheFilingDaysForResponsibleAndStages,
  getSumClaimsFromTheFilingDaysForResponsibleAndStagesOver, getSumCommonAll, getSumClaimsFromTheFilingDaysOver1095,
  getSumClaimsFromTheFilingDaysForResponsibleOver1095, getSumClaimsFromTheFilingDaysForResponsibleAndStagesOver1095
} from "../calculations/get-sum-claims";

import { periods } from "../imgs/period-icons";
import { TableHeaderGeneralList } from "./tableOfClaims/TableHeaderGeneralList";
import { TableFooterGeneral } from "./tableOfClaims/TableFooterGeneral";
import { StartPreloader } from "./start-preloader";

export function GroupsLevelStagesAndResponsibles(
  {
    claims,
    groups,
    setStateGroup,
    setStatePeriod,
    setStateResponsible,
    setStateStage,
    nestingViewGroupLevStages,
    setNestingViewGroupLevStages,
    statePeriod
  }
) {

  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const sortedGroups = groups !== null ? [...groups] : null;

  function rowsAccordeon(string) {
    setNestingViewGroupLevStages(prev => {
      if (prev.includes(string)) {
        return prev.filter(str => str !== string)
      }
      return [...prev, string]
    })
  }

  function showCaimsGroups(group = null, period = null) {
    setStateGroup(group);
    setStatePeriod(period);
    navigate("/list-of-claims-groups");
  }

  function showCaims(group = null, responsible = null, period = null, stage = null) {
    setStateGroup(group);
    setStateResponsible(responsible);
    setStatePeriod(period);
    setStateStage(stage);
    navigate("/list-of-claims-gr-stages-resp");
  }

  function toggleRowsAccordeon(event, entity) {
    event.stopPropagation();
    rowsAccordeon(entity);
  }

  if (sortedGroups !== null) {
    return (
      <table style={{ width: "100%" }}>
        <TableHeaderGeneralList
          setSelectedPeriod={setSelectedPeriod}
          nameOfTableHeader="Группы - стадии - сотрудники: " />
        {
          sortedGroups.sort((a, b) => {
            if (selectedPeriod === null) {
              return getSumClaimsInGroupStagesRespons(b) - getSumClaimsInGroupStagesRespons(a);
            }
            else if (selectedPeriod === 21) {
              return getSumClaimsFromTheFilingDaysStages(b, 21) - getSumClaimsFromTheFilingDaysStages(a, 21);
            }
            else if (selectedPeriod === 1095) {
              return getSumClaimsFromTheFilingDaysStages(b, 1095) - getSumClaimsFromTheFilingDaysStages(a, 1095);
            }
            return getSumClaimsFromTheFilingDaysStages(b, selectedPeriod) - getSumClaimsFromTheFilingDaysStages(a, selectedPeriod);
          }).map((group) => {
            return <tbody>
              <tr
                className="table-row-responsible-level"
                style={{
                  position: "sticky", top: "70px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                <td onClick={(event) => { toggleRowsAccordeon(event, group.groupName) }}>&nbsp;&nbsp;&nbsp;{group.groupName}</td>
                <td><span onClick={() => showCaimsGroups(group.groupName)}>&nbsp;&nbsp;{getSumClaimsInGroupStagesRespons(group)}</span></td>

                {periods.map(period => <td style={{ textAlign: "center" }}><span onClick={() => showCaimsGroups(group.groupName, period.num)}>{getSumClaimsFromTheFilingDaysStages(group, period.num)}</span></td>)}
                <td style={{ textAlign: "center" }}><span onClick={() => showCaimsGroups(group.groupName, 21)}>{getSumClaimsFromTheFilingDaysStages(group, 21)}</span></td>
                <td style={{ textAlign: "center" }}><span onClick={() => showCaimsGroups(group.groupName, 1095)}>{getSumClaimsFromTheFilingDaysStages(group, 1095)}</span></td>
              </tr>
              {
                nestingViewGroupLevStages.includes(group.groupName)
                && Object.keys(group.stages)
                  .sort((a, b) => {
                    if (selectedPeriod === null) {
                      return getSumClaimsStage(group, b) - getSumClaimsStage(group, a);
                    }
                    else if (selectedPeriod === 21) {
                      return getSumClaimsFromTheFilingDaysForStage(group, 21, b) - getSumClaimsFromTheFilingDaysForStage(group, 21, a);
                    }
                    else if (selectedPeriod === 1095) {
                      return getSumClaimsFromTheFilingDaysForStage(group, 1095, b) - getSumClaimsFromTheFilingDaysForStage(group, 1095, a);
                    }
                    return getSumClaimsFromTheFilingDaysForStage(group, selectedPeriod, b) - getSumClaimsFromTheFilingDaysForStage(group, selectedPeriod, a);
                  })
                  .map(stage => {
                    return <>
                      <tr className="table-row-responsible-level" style={{ cursor: "pointer" }}>
                        <td onClick={(event) => { toggleRowsAccordeon(event, stage) }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{stage}</td>
                        <td><span onClick={() => showCaims(group.groupName, null, null, stage)}>&nbsp;&nbsp;{getSumClaimsStage(group, stage)}</span></td>
                        {periods.map(period => <td style={{ textAlign: "center" }}><span onClick={() => showCaims(group.groupName, null, period.num, stage)}>{getSumClaimsFromTheFilingDaysForStage(group, period.num, stage)}</span></td>)}
                        <td style={{ textAlign: "center" }}><span onClick={() => showCaims(group.groupName, null, 21, stage)}>{getSumClaimsFromTheFilingDaysForStage(group, 21, stage)}</span></td>
                        <td style={{ textAlign: "center" }}><span onClick={() => showCaims(group.groupName, null, 1095, stage)}>{getSumClaimsFromTheFilingDaysForStage(group, 1095, stage)}</span></td>
                      </tr>
                      {
                        nestingViewGroupLevStages.includes(stage)
                        && Object.keys(group.stages[stage])
                          .sort((a, b) => {
                            if (selectedPeriod === null) {
                              return getSumClaimsStageAndResponsible(group, stage, b) - getSumClaimsStageAndResponsible(group, stage, a);
                            }
                            else if (selectedPeriod === 21) {
                              return getSumClaimsFromTheFilingDaysForStageAndResponsibles(group, 21, stage, b) - getSumClaimsFromTheFilingDaysForStageAndResponsibles(group, 21, stage, a);
                            }
                            else if (selectedPeriod === 1095) {
                              return getSumClaimsFromTheFilingDaysForStageAndResponsibles(group, 1095, stage, b) - getSumClaimsFromTheFilingDaysForStageAndResponsibles(group, 1095, stage, a);
                            }
                            return getSumClaimsFromTheFilingDaysForStageAndResponsibles(group, selectedPeriod, stage, b) - getSumClaimsFromTheFilingDaysForStageAndResponsibles(group, selectedPeriod, stage, a);
                          })
                          .map(responsible => {
                            return <tr
                              className="table-row-responsible-level"
                              style={{ cursor: "pointer" }}
                              onClick={(event) => {
                                event.stopPropagation();
                                rowsAccordeon(responsible);
                              }}
                            >
                              <td onClick={(event) => { toggleRowsAccordeon(event, responsible) }}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {responsible}
                              </td>
                              <td><span onClick={() => showCaims(group.groupName, responsible, null, stage)}>&nbsp;&nbsp;{getSumClaimsStageAndResponsible(group, stage, responsible)}</span></td>
                              {periods.map(period => <td style={{ textAlign: "center" }}><span onClick={() => showCaims(group.groupName, responsible, period.num, stage)}>{getSumClaimsFromTheFilingDaysForStageAndResponsibles(group, period.num, stage, responsible)}</span></td>)}
                              <td style={{ textAlign: "center" }}><span onClick={() => showCaims(group.groupName, responsible, 21, stage)}>{getSumClaimsFromTheFilingDaysForStageAndResponsibles(group, 21, stage, responsible)}</span></td>
                              <td style={{ textAlign: "center" }}><span onClick={() => showCaims(group.groupName, responsible, 1095, stage)}>{getSumClaimsFromTheFilingDaysForStageAndResponsibles(group, 1095, stage, responsible)}</span></td>
                            </tr>
                          })}
                    </>
                  })
              }
            </tbody>
          }
          )
        }
        <TableFooterGeneral claims={claims} setStatePeriod={setStatePeriod} />
        {/* <tfoot style={{ backgroundColor: "grey" }} >
          <tr style={{ fontWeight: "700" }}>
            <td>&nbsp;&nbsp;Итого:</td>
            <td style={{ fontFamily: "Times, serif" }}>{getSumCommonAll(claims, null)}</td>
            {
              periods.map(period => {
                return <td style={{ textAlign: "center", fontFamily: "Times, serif" }}>{getSumCommonAll(claims, period.num)}</td>
              })
            }
            <td style={{ textAlign: "center", fontFamily: "Times, serif" }}>{getSumCommonAll(claims, 21)}</td>
            <td style={{ textAlign: "center", fontFamily: "Times, serif" }}>{getSumCommonAll(claims, 1095)}</td>
          </tr>
        </tfoot> */}
      </table >
    )
  }
  return <StartPreloader />
}

