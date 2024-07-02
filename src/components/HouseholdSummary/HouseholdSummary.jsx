import {
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  Paper,
  TableRow,
  Stack,
} from "@mui/material";
import { SalaryAndTaxInfos } from "../../state/SalaryAndTaxInfos";
import { useContext } from "react";
import { familyMembersInfo } from "../../storage/FamilyMembersStorage";

const HouseholdSummary = () => {
  const { id, name, netSalary, ...rest } = useContext(SalaryAndTaxInfos);
  const salaries = familyMembersInfo.map((familyMember) => {
    return {
      name: familyMember.name,
      netSalary: Math.round(familyMember.netSalary),
      id: familyMember.id,
    };
  });

  const countNetSalarySum = () => {
    let sum = 0;
    salaries.forEach((familyMember) => {
      if (familyMember.id == id) {
        sum += netSalary;
      } else {
        sum += familyMember.netSalary;
      }
    });
    return (Math.round(sum) + " Ft");
  };

  return (
    <Container
      sx={{
        backgroundColor: "rgb(230, 236, 241)",
        borderRadius: "20px",
        padding: "8px",
        margin: 2,
        minHeight: 675
      }}
    >
      <Stack
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography
          variant="h6"
          component="h1"
          sx={{ marginTop: 3, marginBottom: 3 }}
        >
          Háztartás összesített jövedelme
        </Typography>
      </Stack>

      <Stack
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <TableContainer component={Paper} sx={{ maxWidth: 400 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Családtag</TableCell>
                <TableCell align="right">Nettó bér</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salaries.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id == id ? name : row.name}
                  </TableCell>
                  <TableCell align="right">
                    {row.id == id ? (Math.round(netSalary) + " Ft") : (row.netSalary + " Ft")}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow key={0}>
                <TableCell component="th" scope="row">
                  Összesen:
                </TableCell>
                <TableCell align="right">{countNetSalarySum()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
};

export default HouseholdSummary;
