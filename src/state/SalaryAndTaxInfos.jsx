import { createContext, useEffect, useState } from "react";
import {
  saveFamilyMemberToStore,
  convertToFamilyMemberObj,
  getFamilyMember,
  familyMembersInfo,
} from "../storage/FamilyMembersStorage";

export const SalaryAndTaxInfos = createContext();

function SalaryAndTaxInfosProvider({ children }) {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [grossSalary, setGrossSalary] = useState(0);
  const [isBelowTwentyFive, setIsBelowTwentyFive] = useState(false);
  const [hasPersonalTaxRelief, setHasPersonalTaxRelief] = useState(false);
  const [justMarried, setJustMarried] = useState({
    isJustMarried: false,
    dateOfMarriage: null,
  });
  const [familyTaxRelief, setFamilyTaxRelief] = useState({
    hasFamilyTaxRelief: false,
    numberOfDependents: 0,
    numberOfTransferees: 0,
  });
  const maxAmountOfTransferees = 3;

  function changeIsJustMarried() {
    setJustMarried({
      ...justMarried,
      isJustMarried: !justMarried.isJustMarried,
    });
  }

  function changeMarriageDate(dateOfMarriage = null) {
    setJustMarried({
      ...justMarried,
      dateOfMarriage: new Date(dateOfMarriage),
    });
  }

  function changeHasFamilyTaxRelief() {
    setFamilyTaxRelief({
      ...familyTaxRelief,
      hasFamilyTaxRelief: !familyTaxRelief.hasFamilyTaxRelief,
    });
  }

  function changeNumberOfDependents(numberOfDependents = 0) {
    if (numberOfDependents >= 0) {
      let newFamilyTaxRelief = { ...familyTaxRelief };
      newFamilyTaxRelief.numberOfDependents = numberOfDependents;
      if (numberOfDependents < familyTaxRelief.numberOfTransferees) {
        newFamilyTaxRelief.numberOfTransferees = numberOfDependents;
      }
      setFamilyTaxRelief(newFamilyTaxRelief);
    }
  }

  function changeNumberOfTransferees(numberOfTransferees = 0) {
    if (
      numberOfTransferees >= 0 &&
      numberOfTransferees <= maxAmountOfTransferees &&
      numberOfTransferees <= familyTaxRelief.numberOfDependents
    ) {
      setFamilyTaxRelief({
        ...familyTaxRelief,
        numberOfTransferees: numberOfTransferees,
      });
    }
  }

  const isEntitledToJustMarriedRelief = () => {
    const today = new Date();
    const twoYearsBack = new Date(new Date().setFullYear(today.getFullYear() - 2));
    if (justMarried.dateOfMarriage && justMarried.dateOfMarriage < today) {
      if (justMarried.dateOfMarriage > twoYearsBack) {
        if (
          justMarried.dateOfMarriage.getFullYear == today.getFullYear &&
          justMarried.dateOfMarriage.getMonth() == today.getMonth()
        ) {
          return false;
        }
        return true;
      }
    }
    return false;
  };

  const countNetSalary = () => {
    let szja = grossSalary * 0.15;
    const tb = grossSalary * 0.185;
    let additionalSalary = 0;

    if (isBelowTwentyFive) {
      const maxSalary = 499952;
      if (grossSalary > maxSalary) {
        const reliefOfMax = maxSalary * 0.15;
        szja -= reliefOfMax;
      } else {
        szja = 0;
      }
    }

    if (hasPersonalTaxRelief) {
      const oneThirrdOfMinSalary = 77300;
      szja -= oneThirrdOfMinSalary;
    }

    if (szja < 0) {
      szja = 0;
    }

    if (justMarried.isJustMarried && isEntitledToJustMarriedRelief()) {
      additionalSalary += 5000;
    }

    if (familyTaxRelief.hasFamilyTaxRelief) {
      let multiplier = 0;
      if (familyTaxRelief.numberOfTransferees == 1) {
        multiplier = 10000;
      } else if (familyTaxRelief.numberOfTransferees == 2) {
        multiplier = 20000;
      } else if (familyTaxRelief.numberOfTransferees >= 3) {
        multiplier = 33000;
      }
      additionalSalary += multiplier * familyTaxRelief.numberOfDependents;
    }

    return grossSalary - szja - tb + additionalSalary;
  };

  const reloadData = (newId) => {
    saveFamilyMemberToStore(
      convertToFamilyMemberObj(
        id,
        name,
        grossSalary,
        netSalary,
        isBelowTwentyFive,
        hasPersonalTaxRelief,
        justMarried,
        familyTaxRelief
      )
    );
    const familyMember = getFamilyMember(newId);
    loadFamilyMember(familyMember);
  };

  const loadFamilyMember = (familyMember) => {
    setId(familyMember.id);
    setName(familyMember.name);
    setGrossSalary(familyMember.grossSalary);
    setIsBelowTwentyFive(familyMember.isBelowTwentyFive);
    setHasPersonalTaxRelief(familyMember.hasPersonalTaxRelief);
    setJustMarried({ ...familyMember.justMarried });
    setFamilyTaxRelief({ ...familyMember.familyTaxRelief });
  };

  useEffect(() => {
    loadFamilyMember(familyMembersInfo[0]);
  }, []);

  let netSalary = countNetSalary();

  const context = {
    grossSalary,
    isBelowTwentyFive,
    hasPersonalTaxRelief,
    justMarried,
    familyTaxRelief,
    changeIsJustMarried,
    changeMarriageDate,
    changeHasFamilyTaxRelief,
    changeNumberOfDependents,
    changeNumberOfTransferees,
    setGrossSalary,
    setIsBelowTwentyFive,
    setHasPersonalTaxRelief,
    netSalary,
    name,
    setName,
    id,
    setId,
    reloadData,
    isEntitledToJustMarriedRelief,
  };

  return (
    <SalaryAndTaxInfos.Provider value={context}>
      {children}
    </SalaryAndTaxInfos.Provider>
  );
}

export default SalaryAndTaxInfosProvider;
