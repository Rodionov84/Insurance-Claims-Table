export function setGroupsForStagesAndResponsibles(belongingToGroups, curatorsAndGroups, claims) {
    if (claims !== null) {
        const resultByGroups = {};
        for (const claim of claims) {
            const key = belongingToGroups[claim.branch];
            if (key === undefined) {
                continue;
            }
            if (resultByGroups[key] === undefined) {       // resultByGroups[key] ??= [];    
                resultByGroups[key] = [];                    // для новых версий node
            };
            resultByGroups[key].push(claim);
        }
    
        return Object.entries(resultByGroups).map(([key, value]) => {
            return {
                groupName: curatorsAndGroups[key].groupName,
                supervisor: curatorsAndGroups[key].supervisor,
                stages: value,
            };
        });
    }
    return null;
}
