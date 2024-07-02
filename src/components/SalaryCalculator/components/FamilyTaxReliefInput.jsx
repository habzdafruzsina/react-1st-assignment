import { FormControlLabel, Switch, Stack } from "@mui/material";
import { SalaryAndTaxInfos } from "../../../state/SalaryAndTaxInfos";
import { useContext } from "react";
import IncreaseAndDecreaseInput from "./IncreaseAndDecreaseInput";

const FamilyTaxReliefInput = () => {
  const {
    familyTaxRelief,
    changeHasFamilyTaxRelief,
    changeNumberOfDependents,
    changeNumberOfTransferees,
    ...rest
  } = useContext(SalaryAndTaxInfos);

  const label = " Eltartott, ebből kedvezményezett: ";

  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={familyTaxRelief.hasFamilyTaxRelief}
            onChange={() => changeHasFamilyTaxRelief()}
          />
        }
        label="Családi kedvezmény"
      />

      {familyTaxRelief.hasFamilyTaxRelief ? (
        <Stack direction="row" spacing={0}>
          <IncreaseAndDecreaseInput
            counter={familyTaxRelief.numberOfDependents}
            increaseFunc={() =>
                changeNumberOfDependents(familyTaxRelief.numberOfDependents + 1)
            }
            decreaseFunc={() =>
                changeNumberOfDependents(familyTaxRelief.numberOfDependents - 1)
            }
          />
          {label}
          <IncreaseAndDecreaseInput
            counter={familyTaxRelief.numberOfTransferees}
            increaseFunc={() =>
                changeNumberOfTransferees(familyTaxRelief.numberOfTransferees + 1)
            }
            decreaseFunc={() =>
                changeNumberOfTransferees(familyTaxRelief.numberOfTransferees - 1)
            }
          />
        </Stack>
      ) : null}
    </>
  );
};

export default FamilyTaxReliefInput;
