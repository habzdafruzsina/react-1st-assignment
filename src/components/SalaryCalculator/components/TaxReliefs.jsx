import { Typography } from "@mui/material";
import { FormGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Switch, Box } from "@mui/material";
import { useContext } from "react";
import { SalaryAndTaxInfos } from "./../../../state/SalaryAndTaxInfos";
import JustMarriedReliefInput from "./JustMarriedReliefInput";
import FamilyTaxReliefInput from "./FamilyTaxReliefInput";

const TaxReliefs = () => {
  const {
    isBelowTwentyFive,
    hasPersonalTaxRelief,
    setIsBelowTwentyFive,
    setHasPersonalTaxRelief,
    ...rest
  } = useContext(SalaryAndTaxInfos);

  return (
    <Box sx={{ marginTop: 4, marginBottom: 4 }}>
      <Typography variant="h6">Kedvezmények</Typography>

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={isBelowTwentyFive}
              onChange={() => setIsBelowTwentyFive(!isBelowTwentyFive)}
            />
          }
          label="25 év alattiak SZJA mentessége"
        />

        <JustMarriedReliefInput></JustMarriedReliefInput>

        <FormControlLabel
          control={
            <Switch
              checked={hasPersonalTaxRelief}
              onChange={() => setHasPersonalTaxRelief(!hasPersonalTaxRelief)}
            />
          }
          label="Személyi adókedvezmény"
        />

        <FamilyTaxReliefInput></FamilyTaxReliefInput>
      </FormGroup>
    </Box>
  );
};

export default TaxReliefs;
