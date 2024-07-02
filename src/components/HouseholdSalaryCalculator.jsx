import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";
import { Grid, Box } from "@mui/material";

const HouseholdSalaryCalculator = () => {
  return (
    <>
      <header>
        <FamilyMemberTabs />
      </header>
      <main>
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs={5.5}>
              <SalaryCalculator />
            </Grid>
            <Grid item xs={5.5}>
              <HouseholdSummary />
            </Grid>
          </Grid>
        </Box>
      </main>
    </>
  );
};

export default HouseholdSalaryCalculator;
