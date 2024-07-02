import {
  Button,
  FormControlLabel,
  Switch,
  Stack,
  Chip,
  Input,
} from "@mui/material";
import { SalaryAndTaxInfos } from "../../../state/SalaryAndTaxInfos";
import { useContext, useState } from "react";
//import MarriageDateModal from "./MarriageDateModal";

const JustMarriedReliefInput = () => {
  const {
    changeIsJustMarried,
    changeMarriageDate,
    justMarried,
    isEntitledToJustMarriedRelief,
    ...rest
  } = useContext(SalaryAndTaxInfos);

  /*const [isOpen, setIsOpen] = useState(false);
  const show = () => setIsOpen(true);
  const hide = () => setIsOpen(false);*/

  const today = new Date();
  const twoYearsBack = new Date(today.setFullYear(today.getFullYear() - 2));

  const setEntitled = () => {
    if (justMarried.dateOfMarriage) {
      return justMarried.dateOfMarriage > twoYearsBack;
    }
    return false;
  };

  const formatDate = () => {
    if (
      justMarried.dateOfMarriage &&
      Object.prototype.toString.call(justMarried.dateOfMarriage) ===
        "[object Date]" &&
      !isNaN(justMarried.dateOfMarriage)
    ) {
      return justMarried.dateOfMarriage.toISOString().split("T")[0];
    }
    return null;
  };

  const entitled = setEntitled();

  return (
    <>
      <Stack direction="row" spacing={0}>
        <FormControlLabel
          control={
            <Switch
              checked={justMarried.isJustMarried}
              onChange={() => changeIsJustMarried()}
            />
          }
          label="Friss házasok kedvezménye"
        />

        {/*justMarried.isJustMarried ? (
          <Button variant="contained" size="small" onClick={show}>
            {justMarried.dateOfMarriage
              ? "Dátum hozzáadása"
              : "Dátum módosítása"}
          </Button>
        ) : null*/}

        {justMarried.isJustMarried && justMarried.dateOfMarriage ? (
          <Chip
            variant="contained"
            size="small"
            color={isEntitledToJustMarriedRelief() ? "success" : "error"}
            label={isEntitledToJustMarriedRelief() ? "Jogosult" : "Nem jogosult"}
          />
        ) : null}

        {/*<MarriageDateModal
        isOpen={isOpen}
        handleClose={hide}
        ></MarriageDateModal>*/}
      </Stack>

      {justMarried.isJustMarried ? (
        <Input
          autoFocus={true}
          onChange={(e) => changeMarriageDate(e.target.value)}
          defaultValue={formatDate}
          type="date"
        ></Input>
      ) : null}
    </>
  );
};

export default JustMarriedReliefInput;
