export function setEmbedStagesAndResponsibles(groups) {
  if (groups !== null) {
    let result = [];
    for (const group of groups) {
      let objGroup = {
        groupName: group.groupName,
        supervisor: group.supervisor,
        stages: fillListResponsibles(group),
      };
      result.push(objGroup);
    }
    return result;
  }
  return null;
}

function fillListStages(group) {            
  listValidation(group);
  const resultByStages = {};
  for (const claim of group.stages) {       
    const key = claim.reviewStage;            
    if (resultByStages[key] === undefined) { 
      resultByStages[key] = [];              
    };
    resultByStages[key].push(claim);        
  }
  return resultByStages;                    
}

function fillListResponsibles(group) {                   
  const stages = fillListStages(group);
  const resultByResponsibles = {};                       
  for (const stage in stages) {        
    resultByResponsibles[stage] = {};              
    for (const claim of stages[stage]) {
      const key = claim.stageResponsible;
      if (resultByResponsibles[stage][key] === undefined) {
        resultByResponsibles[stage][key] = [];
      };
      resultByResponsibles[stage][key].push(claim);
    }
  }
  return resultByResponsibles;
}

function listValidation(group) {
  for (const claim of group.stages) {
    const regex = new RegExp('D');
    if (regex.test(claim.claimNumber)) {
      claim.typeOfAppeal = 'ОСАГО';
    } else {
      claim.typeOfAppeal = 'ПВУ';
    }
    if (claim.stageResponsible === '#ERROR_undefined') {
      claim.stageResponsible = '_Ответственный не назначен';
    }
    if (claim.methodOfReceiving === '#ERROR_undefined') {
      claim.methodOfReceiving = '_Способ получения Заявления не указан';
    }
    claim.id = claim.claimNumber + claim.taskNumber;
  }
}
