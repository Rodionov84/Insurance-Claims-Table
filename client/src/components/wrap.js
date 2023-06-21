import { useRoutes } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { GroupLevel } from "./group-level";
import { CommonLevelStages } from "./tableOfClaims/CommonLevelStages";
import { GroupsLevelStagesAndResponsibles } from "./groups-level-stages-and-responsibles";
import { ListOfClaimsGrRespStages } from "./listOfClaims/lists/ListOfClaimsGrRespStages";
import { ListOfClaimsGrStagesResp } from "./listOfClaims/lists/ListOfClaimsGrStagesResp";
import { ListOfClaimsGroups } from "./listOfClaims/lists/ListOfClaimsGroups";
import { ListOfClaimsCommon } from "./listOfClaims/lists/ListOfClaimsCommon";
import { ListOfClaimsCommonAll } from "./listOfClaims/lists/ListOfClaimsCommonAll";
import { ListOfClaimsPersonal } from "./listOfClaims/lists/ListOfClaimsPersonal";
import { ListOfClaimsPersonalAll } from "./listOfClaims/lists/ListOfClaimsPersonalAll";
import { Settings } from "./settings";
import { AssembleGroups } from "./AssembleGroups";
import { ExcelDownloadPage } from "./excel-download-page";
import { StatementsOnPersonalReview } from "./statements-on-personal-review";

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
  const [stateCommonView, setStateCommonView] = useState(startViewState)            //стейт для фильтров стадий/типов возмещеня и тд.
  const [stateCommonViewOptions, setStateCommonViewOptions] = useState(startViewStateOptions)
  const [stateView, setStateView] = useState("filingDays");  //стейт для сортировки убытков в списке
  const [nestingViewCommonLevStages, setNestingViewCommonLevStages] = useState([]);
  const [nestingViewGroupLevRes, setNestingViewGroupLevRes] = useState([]);
  const [nestingViewGroupLevStages, setNestingViewGroupLevStages] = useState([]);
  const dragedBelongingTogroups = (localStorage.dragedBelongingTogroups === undefined)
    ? { ...belongingToGroups }
    : JSON.parse(localStorage.dragedBelongingTogroups)                               //localStorage для филиалов
  const [stateDragBranches, setStateDragBranches] = useState(dragedBelongingTogroups);
  localStorage.dragedBelongingTogroups = JSON.stringify(stateDragBranches);
  const [currentBranch, setCurrentBranch] = useState(null);
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
        nestingViewGroupLevRes={nestingViewGroupLevRes}
        setNestingViewGroupLevRes={setNestingViewGroupLevRes}
      />,
    },
    {
      path: "/",
      element: <CommonLevelStages
        claims={claims}
        commonStages={dataForCommonStages}
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
      />,
    },
    {
      path: "/stages-and-responsibles",
      element: <GroupsLevelStagesAndResponsibles
        claims={claims}
        groups={dataForStagesAndResponsibles}
        setCurrentBranch={setCurrentBranch}
        currentBranch={currentBranch}
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
      <header style={{ position: "sticky", top: "0", backgroundColor: "white" }}>
        <Link to='/settings' className='btn btn-secondary' title="Настройки" style={{ backgroundColor: "#006", color: "white" }}>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-list" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
          </div>
        </Link>
        <Link to='statements-on-personal-review' className='btn btn-secondary' style={{ backgroundColor: "#006", color: "white" }}>Сотрудники</Link>
        <Link to='/' className='btn btn-secondary' style={{ backgroundColor: "#006", color: "white" }} >Стадии и ТМ</Link>
        <Link to='/responsibles-and-stages' className='btn btn-secondary' style={{ backgroundColor: "#006", color: "white" }} > Группы - сотрудники - стадии</Link>
        <Link to='/stages-and-responsibles' className='btn btn-secondary' style={{ backgroundColor: "#006", color: "white" }} >Группы - стадии - сотрудники</Link>
        <Link to='/assemble-groups' className='btn btn-secondary' style={{ backgroundColor: "#006", color: "white" }}>Сформировать группы</Link>
        {/* <Link to='download-excel-file' className='btn btn-secondary' style={{ backgroundColor: "#096", color: "white" }}>Обновить данные</Link>
        <Link to="http://php-sql/" className='btn btn-secondary' title="Нужна помощь?" onClick={(event) => { event.preventDefault(); window.open("http://php-sql/"); }} style={{ backgroundColor: "#006", color: "white" }}>FAQ</Link> */}
        <div style={{ position: "fixed", top: "6px", left: "82%", width: "245px" }}>
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






























































































// import { useRoutes } from "react-router-dom";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// import { GroupLevel } from "./group-level";
// import { CommonLevelStages } from "./common-level-stages";
// import { GroupsLevelStagesAndResponsibles } from "./groups-level-stages-and-responsibles";
// import { ListOfClaimsGrRespStages } from "./list-of-claims-gr-resp-stages";
// import { ListOfClaimsGrStagesResp } from "./list-of-claims-gr-stages-resp";
// import { ListOfClaimsGroups } from "./list-of-claims-groups";
// import { ListOfClaimsCommon } from "./list-of-claims-common";
// import { ListOfClaimsCommonAll } from "./list-of-claims-common-all";
// import { ListOfClaimsPersonal } from "./list-of-claims-personal";
// import { ListOfClaimsPersonalAll } from "./list-of-claims-personal-all";
// import { Settings } from "./settings";
// import { AssembleGroups } from "./assemble-groups";
// import { ExcelDownloadPage } from "./excel-download-page";
// import { StatementsOnPersonalReview } from "./statements-on-personal-review";
// import { startViewState, startViewStateOptions } from "../data/start-view-state";
// const { getCommonStages } = require("../calculations/get-common-stages");
// const { groupClaims } = require("../calculations/group-claims");
// const { groupClaimsByStagesAndResponsibles } = require("../calculations/group-claims-by-stages-and-responsibles")
// const { setFilters } = require("../calculations/set-filters")
// const statementsFile = require('../data/statements.json');
// const { belongingToGroupsFile } = require("../data/belonging-to-groups-file.js");
// const { curatorsAndGroups } = require("../data/curators-and-groups.js");

// export function Wrap() {
//   const [statements, setStatements] = useState(statementsFile);
//   const [stateGroup, setStateGroup] = useState(null)
//   const [stateResponsible, setStateResponsible] = useState(null);
//   const [statePeriod, setStatePeriod] = useState(null);
//   const [stateStage, setStateStage] = useState(null);
//   const [stateCommonView, setStateCommonView] = useState(startViewState)            //стейт для фильтров стадий/типов возмещеня и тд.
//   const [stateCommonViewOptions, setStateCommonViewOptions] = useState(startViewStateOptions)
//   const [stateView, setStateView] = useState("filingDays");  //стейт для сортировки убытков в списке
//   const [nestingViewCommonLevStages, setNestingViewCommonLevStages] = useState([]);
//   const [nestingViewGroupLevRes, setNestingViewGroupLevRes] = useState([]);
//   const [nestingViewGroupLevStages, setNestingViewGroupLevStages] = useState([]);
//   const dragedBelongingTogroups = (localStorage.dragedBelongingTogroups === undefined)
//     ? { ...belongingToGroupsFile }
//     : JSON.parse(localStorage.dragedBelongingTogroups)                               //localStorage для филиалов
//   const [stateDragBranches, setStateDragBranches] = useState(dragedBelongingTogroups);
//   localStorage.dragedBelongingTogroups = JSON.stringify(stateDragBranches);
//   const [currentBranch, setCurrentBranch] = useState(null);
//   const [currentEmployee, setCurrentEmployee] = useState(null);
//   const [currentResponsible, setCurrentResponsible] = useState(null);
//   const [currentCurator, setCurrentCurator] = useState(null);

//   const claims = setFilters(statements, stateCommonView, stateCommonViewOptions,)
//   const data = groupClaims(stateDragBranches, curatorsAndGroups, claims);
//   const dataForStagesAndResponsibles = groupClaimsByStagesAndResponsibles(stateDragBranches, curatorsAndGroups, claims);
//   const dataForCommonStages = getCommonStages(claims);



//   const routes = useRoutes([
//     {
//       path: "/",
//       element: <GroupLevel
//         claims={claims}
//         groups={data}
//         stateCommonView={stateCommonView}
//         //stateCommonViewOptions={stateCommonViewOptions}
//         stateGroup={stateGroup}
//         stateResponsible={stateResponsible}
//         statePeriod={statePeriod}
//         stateStage={stateStage}
//         setStateGroup={setStateGroup}
//         setStateResponsible={setStateResponsible}
//         setStatePeriod={setStatePeriod}
//         setStateStage={setStateStage}
//         changerView={changerView}
//         nestingViewGroupLevRes={nestingViewGroupLevRes}
//         setNestingViewGroupLevRes={setNestingViewGroupLevRes}
//       />,
//     },
//     {
//       path: "common-level-stages",
//       element: <CommonLevelStages
//         claims={claims}
//         commonStages={dataForCommonStages}
//         stateCommonView={stateCommonView}
//         stateCommonViewOptions={stateCommonViewOptions}
//         stateGroup={stateGroup}
//         stateResponsible={stateResponsible}
//         statePeriod={statePeriod}
//         stateStage={stateStage}
//         setStateGroup={setStateGroup}
//         setStateResponsible={setStateResponsible}
//         setStatePeriod={setStatePeriod}
//         setStateStage={setStateStage}
//         changerView={changerView}
//         nestingViewCommonLevStages={nestingViewCommonLevStages}
//         setNestingViewCommonLevStages={setNestingViewCommonLevStages}
//       />,
//     },
//     {
//       path: "stages-and-responsibles",
//       element: <GroupsLevelStagesAndResponsibles
//         claims={claims}
//         groups={dataForStagesAndResponsibles}
//         setCurrentBranch={setCurrentBranch}
//         currentBranch={currentBranch}
//         stateCommonView={stateCommonView}
//         // stateCommonViewOptions={stateCommonViewOptions}
//         stateGroup={stateGroup}
//         stateResponsible={stateResponsible}
//         statePeriod={statePeriod}
//         stateStage={stateStage}
//         setStateGroup={setStateGroup}
//         setStateResponsible={setStateResponsible}
//         setStatePeriod={setStatePeriod}
//         setStateStage={setStateStage}
//         changerView={changerView}
//         nestingViewGroupLevStages={nestingViewGroupLevStages}
//         setNestingViewGroupLevStages={setNestingViewGroupLevStages}
//       />,
//     },
//     {
//       path: "list-of-claims-gr-resp-stages",
//       element: <ListOfClaimsGrRespStages
//         groups={data}
//         stateCommonView={stateCommonView}
//         //stateCommonViewOptions={stateCommonViewOptions}
//         stateGroup={stateGroup}
//         stateResponsible={stateResponsible}
//         statePeriod={statePeriod}
//         stateStage={stateStage}
//         setStateGroup={setStateGroup}
//         setStateResponsible={setStateResponsible}
//         setStatePeriod={setStatePeriod}
//         setStateStage={setStateStage}
//         changerView={changerView}
//         setStateView={setStateView}
//         stateView={stateView}
//       />,
//     },
//     {
//       path: "list-of-claims-gr-stages-resp",
//       element: <ListOfClaimsGrStagesResp
//         groups={dataForStagesAndResponsibles}
//         stateCommonView={stateCommonView}
//         //stateCommonViewOptions={stateCommonViewOptions}
//         stateGroup={stateGroup}
//         stateResponsible={stateResponsible}
//         statePeriod={statePeriod}
//         stateStage={stateStage}
//         setStateGroup={setStateGroup}
//         setStateResponsible={setStateResponsible}
//         setStatePeriod={setStatePeriod}
//         setStateStage={setStateStage}
//         changerView={changerView}
//         setStateView={setStateView}
//         stateView={stateView}
//       />,
//     },
//     {
//       path: "list-of-claims-groups",
//       element: <ListOfClaimsGroups
//         groups={data}
//         stateCommonView={stateCommonView}
//         //stateCommonViewOptions={stateCommonViewOptions}
//         stateGroup={stateGroup}
//         stateResponsible={stateResponsible}
//         statePeriod={statePeriod}
//         stateStage={stateStage}
//         setStateGroup={setStateGroup}
//         setStateResponsible={setStateResponsible}
//         setStatePeriod={setStatePeriod}
//         setStateStage={setStateStage}
//         changerView={changerView}
//         setStateView={setStateView}
//         stateView={stateView}
//       />,
//     },
//     {
//       path: "list-of-claims-common",
//       element: <ListOfClaimsCommon
//         claims={claims}
//         // commonStages={dataForCommonStages}
//         stateCommonView={stateCommonView}
//         //stateCommonViewOptions={stateCommonViewOptions}
//         stateResponsible={stateResponsible}
//         statePeriod={statePeriod}
//         stateStage={stateStage}
//         setStateResponsible={setStateResponsible}
//         setStatePeriod={setStatePeriod}
//         setStateStage={setStateStage}
//         changerView={changerView}
//         setStateView={setStateView}
//         stateView={stateView}
//       />,
//     },
//     {
//       path: "list-of-claims-common-all",
//       element: <ListOfClaimsCommonAll
//         claims={claims}
//         stateCommonView={stateCommonView}
//         stateCommonViewOptions={stateCommonViewOptions}
//         stateGroup={stateGroup}
//         stateResponsible={stateResponsible}
//         statePeriod={statePeriod}
//         stateStage={stateStage}
//         setStateGroup={setStateGroup}
//         setStateResponsible={setStateResponsible}
//         setStatePeriod={setStatePeriod}
//         setStateStage={setStateStage}
//         changerView={changerView}
//         nestingViewCommonLevStages={nestingViewCommonLevStages}
//         setNestingViewCommonLevStages={setNestingViewCommonLevStages}
//         setStateView={setStateView}
//         stateView={stateView}
//       />,
//     },
//     {
//       path: "list-of-claims-personal",
//       element: <ListOfClaimsPersonal
//         claims={claims}
//         setStateView={setStateView}
//         stateView={stateView}
//         currentEmployee={currentEmployee}
//         currentResponsible={currentResponsible}
//         currentCurator={currentCurator}
//         statePeriod={statePeriod}
//       />,
//     },
//     {
//       path: "list-of-claims-personal-all",
//       element: <ListOfClaimsPersonalAll
//         claims={claims}
//         setStateView={setStateView}
//         stateView={stateView}
//         currentEmployee={currentEmployee}
//         currentResponsible={currentResponsible}
//         currentCurator={currentCurator}
//         statePeriod={statePeriod}
//       />,
//     },
//     {
//       path: "/settings",
//       element: <Settings
//         stateCommonView={stateCommonView}
//         stateCommonViewOptions={stateCommonViewOptions}
//         changerViewOptions={changerViewOptions}
//         changerView={changerView}
//       />,
//     },
//     {
//       path: "assemble-groups",
//       element: <AssembleGroups
//         stateDragBranches={stateDragBranches}
//         setStateDragBranches={setStateDragBranches}
//       />,
//     },
//     {
//       path: "download-excel-file",
//       element: <ExcelDownloadPage
//         //statementsTest={statementsTest}
//         setStatements={setStatements}
//       />,
//     },
//     {
//       path: "statements-on-personal-review",
//       element: <StatementsOnPersonalReview
//         claims={claims}
//         currentEmployee={currentEmployee}
//         setCurrentEmployee={setCurrentEmployee}
//         currentCurator={currentCurator}
//         setCurrentCurator={setCurrentCurator}
//         setCurrentResponsible={setCurrentResponsible}
//         statePeriod={statePeriod}
//         setStatePeriod={setStatePeriod}
//       />,
//     },
//   ]);



//   function changerView(entity) {
//     setStateCommonView(prev => {
//       if (prev.includes(entity)) {
//         return prev.filter(el => el !== entity)
//       }
//       return [...prev, entity];
//     })
//   }

//   function changerViewOptions(entity) {
//     setStateCommonViewOptions(prev => {
//       if (prev.includes(entity)) {
//         return prev.filter(el => el !== entity)
//       }
//       return [...prev, entity];
//     })
//   }

//   return (
//     <div>
//       <header style={{ position: "sticky", top: "0", backgroundColor: "white" }}>
//         <Link to='/settings' className='btn btn-secondary' title="Настройки" style={{ backgroundColor: "#006", color: "white" }}>
//           <div>
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-list" viewBox="0 0 16 16">
//               <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
//             </svg>
//           </div>
//         </Link>
//         <Link to='common-level-stages' className='btn btn-secondary' style={{ backgroundColor: "#006", color: "white" }} >Стадии и ТМ</Link>
//         <Link to='/' className='btn btn-secondary' style={{ backgroundColor: "#006", color: "white" }} >Группы</Link>
//         <Link to='stages-and-responsibles' className='btn btn-secondary' style={{ backgroundColor: "#006", color: "white" }} >По филиалам</Link>
//         <Link to='assemble-groups' className='btn btn-secondary' style={{ backgroundColor: "#006", color: "white" }}>Сформировать группы</Link>
//         <Link to='statements-on-personal-review' className='btn btn-secondary' style={{ backgroundColor: "#006", color: "white" }}>Убытки по сотрудникам</Link>
//         <Link to='download-excel-file' className='btn btn-secondary' style={{ backgroundColor: "#096", color: "white" }}>Обновить данные</Link>
//         <Link to="http://php-sql/" className='btn btn-secondary' title="Нужна помощь?" onClick={(event) => { event.preventDefault(); window.open("http://php-sql/"); }} style={{ backgroundColor: "#006", color: "white" }}>FAQ</Link>
//         <div style={{ position: "fixed", top: "6px", left: "82%", width: "245px" }}>Дата среза: <strong>{String(statements[0].cutDate.slice(0, 16))}</strong></div>
//       </header>
//       {routes}
//     </div>
//   )
// }
