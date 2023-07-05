import { useRoutes } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { GroupLevel } from "./tableOfClaims/tablesView/GroupLevel";
import { CommonLevelStages } from "./tableOfClaims/tablesView/CommonLevelStages";
import { GroupsLevelStagesAndResponsibles } from "./tableOfClaims/tablesView/GroupsLevelStagesAndResponsibles";
import { ListOfClaimsGrRespStages } from "./listOfClaims/listsView/ListOfClaimsGrRespStages";
import { ListOfClaimsGrStagesResp } from "./listOfClaims/listsView/ListOfClaimsGrStagesResp";
import { ListOfClaimsGroups } from "./listOfClaims/listsView/ListOfClaimsGroups";
import { ListOfClaimsCommon } from "./listOfClaims/listsView/ListOfClaimsCommon";
import { ListOfClaimsCommonAll } from "./listOfClaims/listsView/ListOfClaimsCommonAll";
import { ListOfClaimsPersonal } from "./listOfClaims/listsView/ListOfClaimsPersonal";
import { ListOfClaimsPersonalAll } from "./listOfClaims/listsView/ListOfClaimsPersonalAll";
import { Settings } from "./claimsSettings/Settings";
import { AssembleGroups } from "./claimsSettings/AssembleGroups";
import { ExcelDownloadPage } from "./claimsSettings/ExcelDownloadPage";
import { StatementsOnPersonalReview } from "./personalClaims/StatementsOnPersonalReview";

import { startViewState, startViewStateOptions } from "../data/start-view-state";
import { getCommonStages } from "../calculations/get-common-stages";
import { groupClaims } from "../calculations/group-claims";
import { groupClaimsByStagesAndResponsibles } from "../calculations/group-claims-by-stages-and-responsibles";
import { setFilters } from "../calculations/set-filters";
import { belongingToGroups } from "../data/belonging-to-groups-file.js";
import { curatorsAndGroups } from "../data/curators-and-groups.js";

export function Wrap() {
  const [statements, setStatements] = useState(null);

  const getStatements = async () => {
    try {
      const response = await fetch("http://localhost:3001/statements", {
        method: 'GET',
      });
      await response.json().then(res => setStatements(res.statements_json));
    } catch (err) {
      console.error(err.message);
    }
  }

  const [stateGroup, setStateGroup] = useState(null)
  const [stateResponsible, setStateResponsible] = useState(null);
  const [statePeriod, setStatePeriod] = useState(null);
  const [stateStage, setStateStage] = useState(null);
  const [stateCommonView, setStateCommonView] = useState(startViewState)         //стейт для фильтров стадий/типов возмещеня и тд.
  const [stateCommonViewOptions, setStateCommonViewOptions] = useState(startViewStateOptions)
  const [stateView, setStateView] = useState("filingDays");  //стейт для сортировки убытков в списке
  const [nestingViewCommonLevStages, setNestingViewCommonLevStages] = useState([]);
  const [nestingViewGroupLevRes, setNestingViewGroupLevRes] = useState([]);
  const [nestingViewGroupLevStages, setNestingViewGroupLevStages] = useState([]);
  const dragedBelongingTogroups = (localStorage.dragedBelongingTogroups === undefined)
    ? { ...belongingToGroups }
    : JSON.parse(localStorage.dragedBelongingTogroups)                          //localStorage для распределения филиалов по группам
  const [stateDragBranches, setStateDragBranches] = useState(dragedBelongingTogroups);
  localStorage.dragedBelongingTogroups = JSON.stringify(stateDragBranches);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [currentResponsible, setCurrentResponsible] = useState(null);
  const [currentCurator, setCurrentCurator] = useState(null);
  const [preloaderCssClass, setPreloaderCssClass] = useState("preloader-off");

  const claims = setFilters(statements, stateCommonView, stateCommonViewOptions,)
  const data = groupClaims(stateDragBranches, curatorsAndGroups, claims);
  const dataForStagesAndResponsibles = groupClaimsByStagesAndResponsibles(stateDragBranches, curatorsAndGroups, claims);
  const dataForCommonStages = getCommonStages(claims);

  useEffect(() => {
    getStatements();
  }, [preloaderCssClass]);

  const routes = useRoutes([
    {
      path: "/responsibles-and-stages",
      element: <GroupLevel
        claims={claims}
        groups={data}
        setStateGroup={setStateGroup}
        setStatePeriod={setStatePeriod}
        setStateResponsible={setStateResponsible}
        setStateStage={setStateStage}
        nestingViewGroupLevRes={nestingViewGroupLevRes}
        setNestingViewGroupLevRes={setNestingViewGroupLevRes}
      />,
    },
    {
      path: "/",
      element: <CommonLevelStages
        claims={claims}
        commonStages={dataForCommonStages}
        setStateStage={setStateStage}
        setStateResponsible={setStateResponsible}
        setStatePeriod={setStatePeriod}
        nestingViewCommonLevStages={nestingViewCommonLevStages}
        setNestingViewCommonLevStages={setNestingViewCommonLevStages}
      />,
    },
    {
      path: "/stages-and-responsibles",
      element: <GroupsLevelStagesAndResponsibles
        claims={claims}
        groups={dataForStagesAndResponsibles}
        setStateGroup={setStateGroup}
        setStateResponsible={setStateResponsible}
        setStatePeriod={setStatePeriod}
        setStateStage={setStateStage}
        nestingViewGroupLevStages={nestingViewGroupLevStages}
        setNestingViewGroupLevStages={setNestingViewGroupLevStages}
      />,
    },
    {
      path: "/list-of-claims-gr-resp-stages",
      element: <ListOfClaimsGrRespStages
        groups={data}
        stateCommonView={stateCommonView}
        stateGroup={stateGroup}
        stateResponsible={stateResponsible}
        statePeriod={statePeriod}
        stateStage={stateStage}
        setStateGroup={setStateGroup}
        setStateResponsible={setStateResponsible}
        setStatePeriod={setStatePeriod}
        setStateStage={setStateStage}
        changerView={changerView}
        setStateView={setStateView}
        stateView={stateView}
      />,
    },
    {
      path: "/list-of-claims-gr-stages-resp",
      element: <ListOfClaimsGrStagesResp
        groups={dataForStagesAndResponsibles}
        stateCommonView={stateCommonView}
        stateGroup={stateGroup}
        stateResponsible={stateResponsible}
        statePeriod={statePeriod}
        stateStage={stateStage}
        setStateGroup={setStateGroup}
        setStateResponsible={setStateResponsible}
        setStatePeriod={setStatePeriod}
        setStateStage={setStateStage}
        changerView={changerView}
        setStateView={setStateView}
        stateView={stateView}
      />,
    },
    {
      path: "/list-of-claims-groups",
      element: <ListOfClaimsGroups
        groups={data}
        stateCommonView={stateCommonView}
        stateGroup={stateGroup}
        stateResponsible={stateResponsible}
        statePeriod={statePeriod}
        stateStage={stateStage}
        setStateGroup={setStateGroup}
        setStateResponsible={setStateResponsible}
        setStatePeriod={setStatePeriod}
        setStateStage={setStateStage}
        changerView={changerView}
        setStateView={setStateView}
        stateView={stateView}
      />,
    },
    {
      path: "/list-of-claims-common",
      element: <ListOfClaimsCommon
        claims={claims}
        stateCommonView={stateCommonView}
        stateResponsible={stateResponsible}
        statePeriod={statePeriod}
        stateStage={stateStage}
        setStateResponsible={setStateResponsible}
        setStatePeriod={setStatePeriod}
        setStateStage={setStateStage}
        changerView={changerView}
        setStateView={setStateView}
        stateView={stateView}
      />,
    },
    {
      path: "/list-of-claims-common-all",
      element: <ListOfClaimsCommonAll
        claims={claims}
        stateCommonView={stateCommonView}
        stateCommonViewOptions={stateCommonViewOptions}
        stateGroup={stateGroup}
        stateResponsible={stateResponsible}
        statePeriod={statePeriod}
        stateStage={stateStage}
        setStateGroup={setStateGroup}
        setStateResponsible={setStateResponsible}
        setStatePeriod={setStatePeriod}
        setStateStage={setStateStage}
        changerView={changerView}
        nestingViewCommonLevStages={nestingViewCommonLevStages}
        setNestingViewCommonLevStages={setNestingViewCommonLevStages}
        setStateView={setStateView}
        stateView={stateView}
      />,
    },
    {
      path: "/list-of-claims-personal",
      element: <ListOfClaimsPersonal
        claims={claims}
        setStateView={setStateView}
        stateView={stateView}
        currentEmployee={currentEmployee}
        currentResponsible={currentResponsible}
        currentCurator={currentCurator}
        statePeriod={statePeriod}
      />,
    },
    {
      path: "/list-of-claims-personal-all",
      element: <ListOfClaimsPersonalAll
        claims={claims}
        setStateView={setStateView}
        stateView={stateView}
        currentEmployee={currentEmployee}
        currentResponsible={currentResponsible}
        currentCurator={currentCurator}
        statePeriod={statePeriod}
      />,
    },
    {
      path: "/settings",
      element: <Settings
        stateCommonView={stateCommonView}
        stateCommonViewOptions={stateCommonViewOptions}
        changerViewOptions={changerViewOptions}
        changerView={changerView}
      />,
    },
    {
      path: "/assemble-groups",
      element: <AssembleGroups
        stateDragBranches={stateDragBranches}
        setStateDragBranches={setStateDragBranches}
      />,
    },
    {
      path: "/download-excel-file",
      element: <ExcelDownloadPage
        setStatements={setStatements}
        preloaderCssClass={preloaderCssClass}
        setPreloaderCssClass={setPreloaderCssClass}
      />,
    },
    {
      path: "/statements-on-personal-review",
      element: <StatementsOnPersonalReview
        claims={claims}
        currentEmployee={currentEmployee}
        setCurrentEmployee={setCurrentEmployee}
        currentCurator={currentCurator}
        setCurrentCurator={setCurrentCurator}
        setCurrentResponsible={setCurrentResponsible}
        statePeriod={statePeriod}
        setStatePeriod={setStatePeriod}
      />,
    },
  ]);

  function changerView(entity) {
    setStateCommonView(prev => {
      if (prev.includes(entity)) {
        return prev.filter(el => el !== entity)
      }
      return [...prev, entity];
    })
  }

  function changerViewOptions(entity) {
    setStateCommonViewOptions(prev => {
      if (prev.includes(entity)) {
        return prev.filter(el => el !== entity)
      }
      return [...prev, entity];
    })
  }

  return (
    <div>
      <header className="wrap-header">
        <Link to='/settings' className='btn btn-secondary top-btn' title="Настройки">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-list" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
          </div>
        </Link>
        <Link to='statements-on-personal-review' className='btn btn-secondary top-btn'>Сотрудники</Link>
        <Link to='/' className='btn btn-secondary top-btn'>Стадии и ТМ</Link>
        <Link to='/responsibles-and-stages' className='btn btn-secondary top-btn'> Группы - сотрудники - стадии</Link>
        <Link to='/stages-and-responsibles' className='btn btn-secondary top-btn'>Группы - стадии - сотрудники</Link>
        <Link to='/assemble-groups' className='btn btn-secondary top-btn'>Сформировать группы</Link>
        <Link to="http://php-sql/" className='btn btn-secondary top-btn' title="Нужна помощь?" onClick={(event) => { event.preventDefault(); window.open("http://www.php-sql.site/"); }}>Help?</Link>
        <div className="cut-data">
          {
            <div>
              <span>Дата среза: </span>
              <Link to='download-excel-file' className='reload-data-link' title="Обновить данные">
                <strong>{statements ? String(statements[0].cutDate.slice(0, 16)) : "Загрузка..."}</strong>
              </Link>
            </div>
          }
        </div>
      </header >
      {routes}
    </div >
  )
}
