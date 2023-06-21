function getSumClaimsInGroup(group) {
  let groupLength = 0;
  for (const responsible in group.responsibles) {
    const respons = group.responsibles[responsible];
    for (const claims in respons) {
      const stages = respons[claims];
      groupLength += stages.length;
    }
  }
  return groupLength;
}

function getSumClaimsInGroupStagesRespons(group) {
  let groupLength = 0;
  for (const stage in group.stages) {
    const st = group.stages[stage];
    for (const claims in st) {
      const respons = st[claims];
      groupLength += respons.length;
    }
  }
  return groupLength;
}

function getSumClaimsFromTheFilingDays(group, period) {
  let getSumClaimsFromTheFilingDays = 0;
  for (const responsible in group.responsibles) {
    const respons = group.responsibles[responsible];
    for (const claims in respons) {
      const stages = respons[claims];
      stages.map(claim => {      //for of
        if (claim.filingDays === period) {
          getSumClaimsFromTheFilingDays += 1;
        }
        return getSumClaimsFromTheFilingDays;
      })
    }
  }
  return getSumClaimsFromTheFilingDays;
}

function getSumClaimsFromTheFilingDaysStages(group, period) {
  if (period < 21) {
    let sum = 0;
    for (const stage in group.stages) {
      const st = group.stages[stage];
      for (const claims in st) {
        for (const claim of st[claims]) {
          if (claim.filingDays === period) {
            sum += 1;
          }
        }
      }
    }
    return sum;
  }
  if (period === 21) {
    let sum21 = 0;
    for (const stage in group.stages) {
      const st = group.stages[stage];
      for (const claims in st) {
        for (const claim of st[claims]) {
          if (claim.filingDays >= period && claim.filingDays < 1095) {
            sum21 += 1;
          }
        }
      }
    }
    return sum21;
  } if (period === 1095) {
    let sum1095 = 0;
    for (const stage in group.stages) {
      const st = group.stages[stage];
      for (const claims in st) {
        for (const claim of st[claims]) {
          if (claim.filingDays > 1095) {
            sum1095 += 1;
          }
        }
      }
    }
    return sum1095;
  }
}

function getSumClaimsFromTheFilingDaysOver(group, period) {
  let getSumClaimsFromTheFilingDaysOver = 0;
  for (const responsible in group.responsibles) {
    const respons = group.responsibles[responsible];
    for (const claims in respons) {
      const stages = respons[claims];
      stages.map(claim => {
        if (claim.filingDays >= period && claim.filingDays < 1095) {
          getSumClaimsFromTheFilingDaysOver += 1;
        }
        return getSumClaimsFromTheFilingDaysOver;
      })
    }
  }
  return getSumClaimsFromTheFilingDaysOver;
}

function getSumClaimsFromTheFilingDaysOver1095(group) {
  let sumClaimsFromTheFilingDaysOver1095 = 0;
  for (const responsible in group.responsibles) {
    const respons = group.responsibles[responsible];
    for (const claims in respons) {
      const stages = respons[claims];
      stages.map(claim => {
        if (claim.filingDays > 1095) {
          sumClaimsFromTheFilingDaysOver1095 += 1;
        }
        return sumClaimsFromTheFilingDaysOver1095;
      })
    }
  }
  return sumClaimsFromTheFilingDaysOver1095;
}

function getSumClaimsResponsible(group, person) {
  let getSumClaimsFromTheFilingDaysFR = 0;
  for (const responsible in group.responsibles) {
    const respons = group.responsibles[responsible];
    for (const claims in respons) {
      const stages = respons[claims];
      stages.map(claim => {
        if (claim.stageResponsible === person) {
          getSumClaimsFromTheFilingDaysFR += 1;
        }
        return getSumClaimsFromTheFilingDaysFR;
      })
    }
  }
  return getSumClaimsFromTheFilingDaysFR;
}

function getSumClaimsStage(group, stageGr) {
  let getSumClaimsFromTheFilingDaysFR = 0;
  for (const stage in group.stages) {
    const st = group.stages[stage];
    for (const claims in st) {
      const respons = st[claims];
      for (const claim of respons)
        if (claim.reviewStage === stageGr) {
          getSumClaimsFromTheFilingDaysFR += 1;
        }
    }
  }
  return getSumClaimsFromTheFilingDaysFR;
}

function getSumClaimsFromTheFilingDaysForResponsible(group, period, person) {
  let getSumClaimsFromTheFilingDaysFR = 0;
  for (const responsible in group.responsibles) {
    const respons = group.responsibles[responsible];
    for (const claims in respons) {
      const stages = respons[claims];
      stages.map(claim => {
        if (claim.stageResponsible === person && claim.filingDays === period) {
          getSumClaimsFromTheFilingDaysFR += 1;
        }
        return getSumClaimsFromTheFilingDaysFR;
      })
    }
  }
  return getSumClaimsFromTheFilingDaysFR;
}

function getSumClaimsFromTheFilingDaysForStage(group, period, rewStage) {
  if (period < 21) {
    let sum = 0;
    for (const stage in group.stages) {
      const st = group.stages[stage];
      for (const claims in st) {
        for (const claim of st[claims]) {
          if (claim.reviewStage === rewStage && claim.filingDays === period) {
            sum += 1;
          }
        }
      }
    }
    return sum;
  }
  if (period === 21) {
    let sum21 = 0;
    for (const stage in group.stages) {
      const st = group.stages[stage];
      for (const claims in st) {
        for (const claim of st[claims])
          if (claim.reviewStage === rewStage && claim.filingDays >= period && claim.filingDays < 1095) {
            sum21 += 1;
          }
      }
    }
    return sum21;
  }
  if (period === 1095) {
    let sum1095 = 0;
    for (const stage in group.stages) {
      const st = group.stages[stage];
      for (const claims in st) {
        for (const claim of st[claims])
          if (claim.reviewStage === rewStage && claim.filingDays > period) {
            sum1095 += 1;
          }
      }
    }
    return sum1095;
  }
}

function getSumClaimsFromTheFilingDaysForResponsibleOver(group, period, person) {
  let getSumClaimsFromTheFilingDaysFR = 0;
  for (const responsible in group.responsibles) {
    const respons = group.responsibles[responsible];
    for (const claims in respons) {
      const stages = respons[claims];
      stages.map(claim => {
        if (claim.stageResponsible === person && claim.filingDays > period && claim.filingDays < 1095) {
          getSumClaimsFromTheFilingDaysFR += 1;
        }
        return getSumClaimsFromTheFilingDaysFR;
      })
    }
  }
  return getSumClaimsFromTheFilingDaysFR;
}

function getSumClaimsFromTheFilingDaysForResponsibleOver1095(group, person) {
  let getSumClaimsFromTheFilingDaysFR1095 = 0;
  for (const responsible in group.responsibles) {
    const respons = group.responsibles[responsible];
    for (const claims in respons) {
      const stages = respons[claims];
      stages.map(claim => {
        if (claim.stageResponsible === person && claim.filingDays > 1095) {
          getSumClaimsFromTheFilingDaysFR1095 += 1;
        }
        return getSumClaimsFromTheFilingDaysFR1095;
      })
    }
  }
  return getSumClaimsFromTheFilingDaysFR1095;
}

function getSumClaimsStageAndResponsible(group, rewStage, person) {
  let getSumClaimsFromTheFilingDaysFRAS = 0;
  for (const stage in group.stages) {
    const st = group.stages[stage];
    for (const claims in st) {
      for (const claim of st[claims]) {
        if (claim.stageResponsible === person && claim.reviewStage === rewStage) {
          getSumClaimsFromTheFilingDaysFRAS += 1;
        }
      }
    }
  }
  return getSumClaimsFromTheFilingDaysFRAS;
}

function getSumClaimsResponsibleAndStage(group, person, stage) {
  let getSumClaimsFromTheFilingDaysFRAS = 0;
  for (const responsible in group.responsibles) {
    const respons = group.responsibles[responsible];
    for (const claims in respons) {
      const stages = respons[claims];
      stages.map(claim => {
        if (claim.stageResponsible === person && claim.reviewStage === stage) {
          getSumClaimsFromTheFilingDaysFRAS += 1;
        }
        return getSumClaimsFromTheFilingDaysFRAS;
      })
    }
  }
  return getSumClaimsFromTheFilingDaysFRAS;
}

function getSumClaimsFromTheFilingDaysForResponsibleAndStages(group, period, person, stage) {
  let getSumClaimsFromTheFilingDaysFRAS = 0;
  for (const responsible in group.responsibles) {
    const respons = group.responsibles[responsible];
    for (const claims in respons) {
      const stages = respons[claims];
      stages.map(claim => {
        if (claim.stageResponsible === person
          && claim.filingDays === period
          && claim.reviewStage === stage) {
          getSumClaimsFromTheFilingDaysFRAS += 1;
        }
        return getSumClaimsFromTheFilingDaysFRAS;
      })
    }
  }
  return getSumClaimsFromTheFilingDaysFRAS;
}

function getSumClaimsFromTheFilingDaysForStageAndResponsibles(group, period, stageGr, person) {
  if (period < 21) {
    let sum = 0;
    for (const stage in group.stages) {
      const st = group.stages[stage];
      for (const claims in st) {
        for (const claim of st[claims]) {
          if (claim.stageResponsible === person
            && claim.filingDays === period
            && claim.reviewStage === stageGr) {
            sum += 1;
          }
        }
      }
    }
    return sum;
  }
  if (period === 21) {
    let sum21 = 0;
    for (const stage in group.stages) {
      const st = group.stages[stage];
      for (const claims in st) {
        for (const claim of st[claims]) {
          if (claim.stageResponsible === person
            && claim.filingDays > period
            && claim.filingDays < 1095
            && claim.reviewStage === stageGr) {
            sum21 += 1;
          }
        }
      }
    }
    return sum21;
  }
  if (period === 1095) {
    let sum1095 = 0;
    for (const stage in group.stages) {
      const st = group.stages[stage];
      for (const claims in st) {
        for (const claim of st[claims]) {
          if (claim.stageResponsible === person
            && claim.filingDays > period
            && claim.reviewStage === stageGr) {
            sum1095 += 1;
          }
        }
      }
    }
    return sum1095;
  }
}

function getSumClaimsFromTheFilingDaysForResponsibleAndStagesOver(group, period, person, stage) {
  let getSumClaimsFromTheFilingDaysFRAS = 0;
  for (const responsible in group.responsibles) {
    const respons = group.responsibles[responsible];
    for (const claims in respons) {
      const stages = respons[claims];
      stages.map(claim => {
        if (claim.stageResponsible === person
          && claim.filingDays > period
          && claim.filingDays < 1095
          && claim.reviewStage === stage) {
          getSumClaimsFromTheFilingDaysFRAS += 1;
        }
        return getSumClaimsFromTheFilingDaysFRAS;
      })
    }
  }
  return getSumClaimsFromTheFilingDaysFRAS;
}

function getSumClaimsFromTheFilingDaysForStagesAndResponsibleOver(group, period, person, stageGr) {
  if (period === 21) {
    let sum21 = 0;
    for (const stage in group.stages) {
      const st = group.stages[stage];
      for (const claims in st) {
        for (const claim of st[claims]) {
          if (claim.stageResponsible === person
            && claim.filingDays > period
            && claim.filingDays < 1095
            && claim.reviewStage === stageGr) {
            sum21 += 1;
          }
        }
      }
      return sum21;
    }
  }
  if (period === 1095) {
    let sum1095 = 0;
    for (const stage in group.stages) {
      const st = group.stages[stage];
      for (const claims in st) {
        for (const claim of st[claims]) {
          if (claim.stageResponsible === person
            && claim.filingDays > period
            && claim.reviewStage === stageGr) {
            sum1095 += 1;
          }
        }
      }
      return sum1095;
    }
  }
}

function getSumClaimsFromTheFilingDaysForResponsibleAndStagesOver1095(group, person, stage) {
  let getSumClaimsFromTheFilingDaysFRAS1095 = 0;
  for (const responsible in group.responsibles) {
    const respons = group.responsibles[responsible];
    for (const claims in respons) {
      const stages = respons[claims];
      stages.map(claim => {
        if (claim.stageResponsible === person
          && claim.filingDays > 1095
          && claim.reviewStage === stage) {
          getSumClaimsFromTheFilingDaysFRAS1095 += 1;
        }
        return getSumClaimsFromTheFilingDaysFRAS1095;
      })
    }
  }
  return getSumClaimsFromTheFilingDaysFRAS1095;
}

function getSumCommonAll(statements, period) {
  if (period === null) {
    return statements.length;
  } else if (period < 21) {
    return statements.filter(claim => claim.filingDays === period).length;
  } else if (period > 20 && period < 1095) {
    return statements.filter(claim => claim.filingDays > 20 && claim.filingDays < 1095).length;
  } else {
    return statements.filter(claim => claim.filingDays > 1095).length;
  }
}

function getSumClaimsCommon(stage) {
  let stagesLength = 0;
  for (const responsible in stage) {
    stagesLength += stage[responsible].length;
  }
  return stagesLength;
}

function getSumClaimsFromTheFilingDaysCommon(stage, period) {
  let sumClaimsFromTheFilingDaysCommon = 0;
  for (const responsible in stage) {
    const respons = stage[responsible];
    for (const claim of respons) {
      if (claim.filingDays === period) {
        sumClaimsFromTheFilingDaysCommon += 1;
      }
    }
  }
  return sumClaimsFromTheFilingDaysCommon;
}

function getSumClaimsFromTheFilingDaysCommonOver(stage) {
  let sumClaimsFromTheFilingDaysCommonOver = 0;
  for (const responsible in stage) {
    const respons = stage[responsible];
    for (const claim of respons) {
      if (claim.filingDays > 20 && claim.filingDays < 1095) {
        sumClaimsFromTheFilingDaysCommonOver += 1;
      }
    }
  }
  return sumClaimsFromTheFilingDaysCommonOver;
}

function getSumClaimsFromTheFilingDaysCommonOver1095(stage) {
  let sumClaimsFromTheFilingDaysCommonOver = 0;
  for (const responsible in stage) {
    const respons = stage[responsible];
    for (const claim of respons) {
      if (claim.filingDays > 1095) {
        sumClaimsFromTheFilingDaysCommonOver += 1;
      }
    }
  }
  return sumClaimsFromTheFilingDaysCommonOver;
}

function getSumClaimsResponsibleCommon(claims, person, period) {
  let getSumClaimsFromTheFilingDaysFRCommon = 0;
  for (const claim of claims) {
    if (period === undefined && person === claim.stageResponsible) {
      getSumClaimsFromTheFilingDaysFRCommon += 1;
    }
    if (period === claim.filingDays && person === claim.stageResponsible) {
      getSumClaimsFromTheFilingDaysFRCommon += 1;
    }
  }
  return getSumClaimsFromTheFilingDaysFRCommon;
}

function getSumClaimsResponsibleCommonOver(claims, person, period) {
  let getSumClaimsFromTheFilingDaysFRCommon = 0;
  for (const claim of claims) {
    if (period > 20
      && claim.filingDays > 20
      && claim.filingDays < 1095
      && person === claim.stageResponsible) {
      getSumClaimsFromTheFilingDaysFRCommon += 1;
    }
  }
  return getSumClaimsFromTheFilingDaysFRCommon;
}

function getSumClaimsResponsibleCommonOver1095(claims, person) {
  let getSumClaimsFromTheFilingDaysFRCommon = 0;
  for (const claim of claims) {
    if (claim.filingDays > 1095 && person === claim.stageResponsible) {
      getSumClaimsFromTheFilingDaysFRCommon += 1;
    }
  }
  return getSumClaimsFromTheFilingDaysFRCommon;
}

function getSumPersonal(claims, period, personResposnsible, personCurator) {
  let result = 0
  for (const claim of claims) {
    if (period === null && personResposnsible === claim.stageResponsible && personCurator === null) {
      result++;
    } 
    if (period === 21 
      && personResposnsible === claim.stageResponsible 
      && personCurator === null
      && claim.filingDays > 20 && claim.filingDays < 1095) {
      result++;
    } 
    if (period === 1095 && personResposnsible === claim.stageResponsible && personCurator === null && claim.filingDays > 1095) {
      result++;
    } 
    if (period === null && personResposnsible === null && personCurator === claim.claimCurator && claim.claimCurator !== claim.stageResponsible) {
      result++;
    } 
    if (period === 21 
      && personResposnsible === null 
      && personCurator === claim.claimCurator 
      && claim.claimCurator !== claim.stageResponsible
      && claim.filingDays > 20 && claim.filingDays < 1095) {
      result++;
    } 
    if (period === 1095 && personResposnsible === null && personCurator === claim.claimCurator && claim.claimCurator !== claim.stageResponsible && claim.filingDays > 1095) {
      result++;
   } 
    if (period === claim.filingDays && personResposnsible === claim.stageResponsible && personCurator === null) {
      result++;
    } 
    if (period === claim.filingDays && personResposnsible === null && personCurator === claim.claimCurator && claim.claimCurator !== claim.stageResponsible) {
      result++;
    } 
    if ((personCurator !== null
      && personResposnsible !== null)
      && period === claim.filingDays
      && (personResposnsible === claim.claimCurator || personResposnsible === claim.stageResponsible
      || personCurator === claim.claimCurator || personCurator === claim.stageResponsible)) {
      result++;
    } 
    if ((personCurator !== null
      && personResposnsible !== null)
      && period === null
      && (personResposnsible === claim.claimCurator || personResposnsible === claim.stageResponsible
      || personCurator === claim.claimCurator || personCurator === claim.stageResponsible)) {
      result++;
    } 
    if ((personCurator !== null
      && personResposnsible !== null)
      && period === 21
      && claim.filingDays > 20 && claim.filingDays < 1095
      && (personResposnsible === claim.claimCurator || personResposnsible === claim.stageResponsible
      || personCurator === claim.claimCurator || personCurator === claim.stageResponsible)) {
      result++;
    } 
    if ((personCurator !== null
      && personResposnsible !== null)
      && period === 1095
      && claim.filingDays > 1095
      && (personResposnsible === claim.claimCurator || personResposnsible === claim.stageResponsible
      || personCurator === claim.claimCurator || personCurator === claim.stageResponsible)) {
      result++;
    } 
  }
  return result;

  // if (period === null) {
  //   return statements.length;
  // } else if (period < 21) {
  //   return statements.filter(claim => claim.filingDays === period).length;
  // } else if (period > 20 && period < 1095) {
  //   return statements.filter(claim => claim.filingDays > 20 && claim.filingDays < 1095).length;
  // } else {
  //   return statements.filter(claim => claim.filingDays > 1095).length;
  // }
}


export {
  getSumClaimsInGroup, getSumClaimsInGroupStagesRespons, getSumClaimsFromTheFilingDays, getSumClaimsFromTheFilingDaysStages, getSumClaimsFromTheFilingDaysOver,
  getSumClaimsResponsible, getSumClaimsStage, getSumClaimsFromTheFilingDaysForResponsible, getSumClaimsFromTheFilingDaysForStage,
  getSumClaimsFromTheFilingDaysForResponsibleOver, getSumClaimsFromTheFilingDaysForStageAndResponsibles,
  getSumClaimsResponsibleAndStage, getSumClaimsStageAndResponsible, getSumClaimsFromTheFilingDaysForResponsibleAndStages,
  getSumClaimsFromTheFilingDaysForResponsibleAndStagesOver, getSumCommonAll, getSumClaimsFromTheFilingDaysOver1095,
  getSumClaimsFromTheFilingDaysForResponsibleOver1095, getSumClaimsFromTheFilingDaysForResponsibleAndStagesOver1095,
  getSumClaimsFromTheFilingDaysCommon, getSumClaimsCommon, getSumClaimsFromTheFilingDaysCommonOver, getSumClaimsFromTheFilingDaysCommonOver1095,
  getSumClaimsResponsibleCommon, getSumClaimsResponsibleCommonOver, getSumClaimsResponsibleCommonOver1095, getSumPersonal
}