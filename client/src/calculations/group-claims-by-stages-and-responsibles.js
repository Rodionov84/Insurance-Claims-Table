const { setGroupsForStagesAndResponsibles } = require("./set-groups-for-stages-and-responsibles");
const { setEmbedStagesAndResponsibles } = require("./set-embed-stages-and-responsibles.js"); // СТАДИИ -> ответственные сотрудники

export function groupClaimsByStagesAndResponsibles(belongingToGroups, curatorsAndGroups, claims) {
  const resultByGroups = setGroupsForStagesAndResponsibles(belongingToGroups, curatorsAndGroups, claims);
  return setEmbedStagesAndResponsibles(resultByGroups);
}
