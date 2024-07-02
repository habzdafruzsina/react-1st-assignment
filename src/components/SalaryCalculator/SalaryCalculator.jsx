import { useContext } from "react";
import { Typography } from "@mui/material";
import { Slider } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import { Chip, Container, Box } from "@mui/material";
import PercentButton from "./components/PercentButton";
import TaxReliefs from "./components/TaxReliefs";
import { SalaryAndTaxInfos } from "../../state/SalaryAndTaxInfos";
import InputFieldWithLabel from "./components/InputFieldWithLabel";

const SalaryCalculator = () => {
  const { setGrossSalary, grossSalary, netSalary, name, setName, ...rest } =
    useContext(SalaryAndTaxInfos);
  const maxGrossSalary = 3000000;

  const applyRateOnSalary = (percentage) => {
    const additionalSalary = grossSalary * percentage / 100;
    const newGrossSalary =  parseInt(grossSalary) + parseInt(additionalSalary);
    setGrossSalary(Math.round(newGrossSalary));
  };

  const netSalaryLabel = () => {
    return Math.round(netSalary) + " Ft"
  }

  return (
    <Container
      sx={{
        backgroundColor: "rgb(230, 236, 241)",
        borderRadius: "20px",
        padding: "8px",
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{ marginTop: 3, marginBottom: 3 }}
      >
        {name ? name : "Új családtag"} bérének
        kiszámítása
      </Typography>

      <InputFieldWithLabel
        style={{ width: 3 / 4, marginBottom: 2 }}
        label="Családtag neve"
        helperText="Add meg a családtag nevét!"
        value={name}
        handleChange={setName}
      />

      <InputFieldWithLabel
        style={{ width: 3 / 4}}
        label="Bruttó bér"
        helperText="Add meg a bruttó béredet!"
        value={grossSalary}
        handleChange={setGrossSalary}
      />

      <Slider
        value={grossSalary}
        aria-label="Default"
        valueLabelDisplay="auto"
        max={maxGrossSalary}
        min={0}
        onChange={(e) => setGrossSalary(e.target.value)}
      />

      <ButtonGroup variant="outlined" aria-label="Percent button group">
        <PercentButton
          percentage={-5}
          onBtnClick={applyRateOnSalary}
        ></PercentButton>
        <PercentButton
          percentage={-1}
          onBtnClick={applyRateOnSalary}
        ></PercentButton>
        <PercentButton
          percentage={1}
          onBtnClick={applyRateOnSalary}
        ></PercentButton>
        <PercentButton
          percentage={5}
          onBtnClick={applyRateOnSalary}
        ></PercentButton>
      </ButtonGroup>

      <TaxReliefs></TaxReliefs>

      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="subtitle1" gutterBottom>
          Számított nettó bér
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Chip label={netSalaryLabel()} color="primary" sx={{ width: '150px', height: '50px', fontSize: "18px" }}/>
      </Box>
    </Container>
  );
};

export default SalaryCalculator;
