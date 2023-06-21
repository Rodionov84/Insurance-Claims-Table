// const { readFileSync, writeFileSync } = require('fs');
//const readFileGroups = readFileSync('./files/belonging-by-groups.json', 'utf8');
// const groupsJSON = JSON.parse(readFileGroups);

export function setEmbedResponsiblesAndStages(groups) {
 if (groups !== null) {
   let result = [];
   for (const group of groups) {
     let objGroup = {
       groupName: group.groupName,
       supervisor: group.supervisor,
       responsibles: fillListStages(group),
     };
     result.push(objGroup);
   }
 
   // writeFileSync('./files/belonging-by-responsibles-and-stages.json',
   //   JSON.stringify(result, null, 2),
   //   { encoding: "utf-8" });
 
   return result;
 } 
 return null;

}

function fillListResponsibles(group) {
  listValidation(group);
  const resultByResponsibles = {};
  for (const claim of group.responsibles) {
    const key = claim.stageResponsible;
    if (resultByResponsibles[key] === undefined) {
      resultByResponsibles[key] = [];
    };
    resultByResponsibles[key].push(claim);
  }
  return resultByResponsibles;
}

function fillListStages(group) {
  const responsibles = fillListResponsibles(group);
  const resultByStages = {};
  for (const responsible in responsibles) {
    resultByStages[responsible] = {};
    for (const claim of responsibles[responsible]) {
      const key = claim.reviewStage;
      if (resultByStages[responsible][key] === undefined) {
        resultByStages[responsible][key] = [];
      };
      resultByStages[responsible][key].push(claim);
    }
  }
  return resultByStages;
}

function listValidation(group) {
  for (const claim of group.responsibles) {
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
