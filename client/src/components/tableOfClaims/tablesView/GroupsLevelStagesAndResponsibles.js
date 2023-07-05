import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSumClaimsInGroupStagesRespons, getSumClaimsFromTheFilingDaysStages, getSumClaimsStage,
  getSumClaimsFromTheFilingDaysForStageAndResponsibles, getSumClaimsFromTheFilingDaysForStage,
  getSumClaimsStageAndResponsible
} from "../../../calculations/get-sum-claims";

import { periods } from "../../../imgs/period-icons";
import { TableHeaderGeneralList } from "../tableSkeleton/TableHeaderGeneralList";
import { TableFooterGeneral } from "../tableSkeleton/TableFooterGeneral";
import { StartPreloader } from "../../preloaders/StartPreloader";

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
      <table>
        <TableHeaderGeneralList
          setSelectedPeriod={setSelectedPeriod}
          nameOfTableHeader="Группы - стадии - сотрудники: "
        />
        {sortedGroups.sort((a, b) => {
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
          return (
            <tbody>
              <tr key={group.groupName} className="table-row-top-level" >
                <td onClick={(event) => { toggleRowsAccordeon(event, group.groupName) }}>
                  &nbsp;&nbsp;&nbsp;{group.groupName}
                </td>
                <td className="cells-with-numbers">
                  <span onClick={() => showCaimsGroups(group.groupName)}>
                    {getSumClaimsInGroupStagesRespons(group)}
                  </span>
                </td>
                {periods.map(period => (
                  <td className="cells-with-numbers">
                    <span onClick={() => showCaimsGroups(group.groupName, period.num)}>
                      {getSumClaimsFromTheFilingDaysStages(group, period.num)}
                    </span>
                  </td>
                ))}
                <td className="cells-with-numbers">
                  <span onClick={() => showCaimsGroups(group.groupName, 21)}>
                    {getSumClaimsFromTheFilingDaysStages(group, 21)}
                  </span>
                </td>
                <td className="cells-with-numbers">
                  <span onClick={() => showCaimsGroups(group.groupName, 1095)}>
                    {getSumClaimsFromTheFilingDaysStages(group, 1095)}
                  </span>
                </td>
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
                      <tr className="table-row-sub-level">
                        <td onClick={(event) => toggleRowsAccordeon(event, stage)}>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{stage}
                        </td>
                        <td className="cells-with-numbers">
                          <span onClick={() => showCaims(group.groupName, null, null, stage)}>
                            {getSumClaimsStage(group, stage)}
                          </span>
                        </td>
                        {periods.map(period => (
                          <td className="cells-with-numbers">
                            <span onClick={() => showCaims(group.groupName, null, period.num, stage)}>
                              {getSumClaimsFromTheFilingDaysForStage(group, period.num, stage)}
                            </span>
                          </td>
                        ))}
                        <td className="cells-with-numbers">
                          <span onClick={() => showCaims(group.groupName, null, 21, stage)}>
                            {getSumClaimsFromTheFilingDaysForStage(group, 21, stage)}
                          </span>
                        </td>
                        <td className="cells-with-numbers">
                          <span onClick={() => showCaims(group.groupName, null, 1095, stage)}>
                            {getSumClaimsFromTheFilingDaysForStage(group, 1095, stage)}
                          </span>
                        </td>
                      </tr>
                      {nestingViewGroupLevStages.includes(stage)
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
                              className="table-row-sub-level"
                              onClick={(event) => {
                                event.stopPropagation();
                                rowsAccordeon(responsible);
                              }}
                            >
                              <td onClick={(event) => toggleRowsAccordeon(event, responsible)} className="table-row-buttom-level">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {responsible}
                              </td>
                              <td className="cells-with-numbers">
                                <span onClick={() => showCaims(group.groupName, responsible, null, stage)}>
                                  {getSumClaimsStageAndResponsible(group, stage, responsible)}
                                </span>
                              </td>
                              {periods.map(period => (
                                <td className="cells-with-numbers">
                                  <span onClick={() => showCaims(group.groupName, responsible, period.num, stage)}>
                                    {getSumClaimsFromTheFilingDaysForStageAndResponsibles(group, period.num, stage, responsible)}
                                  </span>
                                </td>
                              ))}
                              <td className="cells-with-numbers">
                                <span onClick={() => showCaims(group.groupName, responsible, 21, stage)}>
                                  {getSumClaimsFromTheFilingDaysForStageAndResponsibles(group, 21, stage, responsible)}
                                </span>
                              </td>
                              <td className="cells-with-numbers">
                                <span onClick={() => showCaims(group.groupName, responsible, 1095, stage)}>
                                  {getSumClaimsFromTheFilingDaysForStageAndResponsibles(group, 1095, stage, responsible)}
                                </span>
                              </td>
                            </tr>
                          })}
                    </>
                  })
              }
            </tbody>
          )
        })}
        <TableFooterGeneral claims={claims} setStatePeriod={setStatePeriod} />
      </table >
    )
  }
  return <StartPreloader />
}

