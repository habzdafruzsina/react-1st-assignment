const newId = () => {
  return Number(new Date()).toString(36) + (Math.random() * 100).toString(32);
};

export const familyMemberObj = {
  id: newId(),
  name: "",
  grossSalary: 0,
  netSalary: 0,
  isBelowTwentyFive: false,
  hasPersonalTaxRelief: false,
  justMarried: {
    isJustMarried: false,
    dateOfMarriage: null,
  },
  familyTaxRelief: {
    hasFamilyTaxRelief: false,
    numberOfDependents: 0,
    numberOfTransferees: 0,
  },
};

export let familyMembersInfo = [{ ...familyMemberObj }];

export const getFamilyMember = (id) => {
  return familyMembersInfo.find((familyMember) => familyMember.id === id);
};

export const saveFamilyMemberToStore = (familyMemberData) => {
  let familyMember = familyMembersInfo.find(
    (familyMember) => familyMember.id === familyMemberData.id
  );
  if (familyMember != undefined) {
    familyMember.name = familyMemberData.name;
    familyMember.grossSalary = familyMemberData.grossSalary;
    familyMember.netSalary = familyMemberData.netSalary;
    familyMember.isBelowTwentyFive = familyMemberData.isBelowTwentyFive;
    familyMember.hasPersonalTaxRelief = familyMemberData.hasPersonalTaxRelief;
    familyMember.justMarried = { ...familyMemberData.justMarried };
    familyMember.familyTaxRelief = { ...familyMemberData.familyTaxRelief };
  } else {
    familyMembersInfo.push(familyMemberData);
  }
};

export const createNewFamilyMember = () => {
  return { ...familyMemberObj, id: newId() };
};

export const convertToFamilyMemberObj = (
  id,
  name,
  grossSalary,
  netSalary,
  isBelowTwentyFive,
  hasPersonalTaxRelief,
  justMarried,
  familyTaxRelief
) => {
  return {
    ...familyMemberObj,
    id: id,
    name: name,
    grossSalary: grossSalary,
    netSalary: netSalary,
    isBelowTwentyFive: isBelowTwentyFive,
    hasPersonalTaxRelief: hasPersonalTaxRelief,
    justMarried: { ...justMarried },
    familyTaxRelief: { ...familyTaxRelief },
  };
};
