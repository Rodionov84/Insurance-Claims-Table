const { setGroups } = require("./set-groups.js");
const { setEmbedResponsiblesAndStages } = require('./set-embed-responsibles-and-stages.js'); // ОТВЕТСТВЕННЫЕ СОТРУДНИКИ -> стадии

export function groupClaims(belongingToGroups, curatorsAndGroups, claims) {
    const resultByGroups = setGroups(belongingToGroups, curatorsAndGroups, claims);
    return setEmbedResponsiblesAndStages(resultByGroups);
}
