import { curatorsAndGroups } from '../../data/curators-and-groups';    //перенести в стейт для возможности правки
import { useState } from 'react';

export function AssembleGroups({ stateDragBranches, setStateDragBranches }) {
  const dragedCuratorsAndGroups = { ...curatorsAndGroups }
  const [currentBranch, setCurrentBranch] = useState(null);

  function dragStartHandler(e, branch) {
    e.target.style.background = "#006";
    e.target.style.color = "white";
    setCurrentBranch(branch);
    return
  }

  function dragEndHandler(e) {
    e.target.style.background = "white";
    e.target.style.color = "black";
    return
  }

  function dragOverHandler(e) {
    e.preventDefault();
    return
  }

  function dropHandler(e, branch) {
    e.preventDefault();
    let result = {}
    for (const b in stateDragBranches) {
      if (b === currentBranch) {
        result[b] = stateDragBranches[branch];
      } else {
        result[b] = stateDragBranches[b]
      }

    }
    setStateDragBranches(result)
  }

  function dropBranchHandler(e, group) {
    e.preventDefault();
    let result = { ...stateDragBranches }
    result[currentBranch] = "group" + (Number(group) + 1);
    setStateDragBranches(result)
  }

  const gr = Object.keys(dragedCuratorsAndGroups).map(group => {
    return Object.keys(stateDragBranches)
      .sort((a, b) => a.localeCompare(b))
      .filter(branchName => {
        return stateDragBranches[branchName] === group;
      })
  })
  let result = [];
  for (const keyGroup in dragedCuratorsAndGroups) {
    result.push({ ...dragedCuratorsAndGroups[keyGroup] })
  }
  for (let i = 0; i < gr.length; i++) {
    result[i].branches = gr[i]

  }
  return <>
    <div className="asseble-groups-box">
      {Object.keys(result).map(group => {
        return <>
          <div className="groups-wrap">
            <div className="groups-wrap-title">
              <h5>{result[group].groupName}</h5>
            </div>
            <div
              className="group-compound-wrap"
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropBranchHandler(e, group)}>
              <ol>
                {result[group].branches
                  .map(branch => {
                    return (
                      <li 
                        className="cursor-grab"
                        draggable={true}
                        onDragStart={(e) => dragStartHandler(e, branch)}
                        onDragLeave={(e) => dragEndHandler(e)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropHandler(e, branch)}
                      >{branch}</li>
                    )
                  })
                }
              </ol>
            </div>
          </div>
        </>
      })}
    </div>
  </>
}