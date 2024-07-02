import {
  Button,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  Container,
} from "@mui/material";
import { useContext } from "react";
import { SalaryAndTaxInfos } from "../../state/SalaryAndTaxInfos";
import {
  familyMembersInfo,
  saveFamilyMemberToStore,
  createNewFamilyMember
} from "../../storage/FamilyMembersStorage";

const FamilyMemberTabs = () => {
  const { id, name, reloadData, ...rest } = useContext(SalaryAndTaxInfos);
  const familyMember = null;
  const familyMemberList = familyMembersInfo.map((familyMember) => {
    return { name: familyMember.name, id: familyMember.id };
  });

  const handleTabChange = (e, newId) => {
    reloadData(newId);
  };

  const handleNewTab = () => {
    const newFamilyMember = createNewFamilyMember();
    saveFamilyMemberToStore(newFamilyMember);
    reloadData(newFamilyMember.id);
  };

  return (
    <Container
      sx={{
        padding: "8px",
        marginLeft: 2,
      }}
    >
      <Stack direction="row" spacing={2} sx={{ marginLeft: 2 }}>
        <ToggleButtonGroup
          value={familyMember}
          exclusive
          onChange={handleTabChange}
          aria-label="text alignment"
          sx={{backgroundColor: "rgb(230, 236, 241)"}}
        >
          {familyMemberList.map((familyMember) => (
            <ToggleButton key={familyMember.id} value={familyMember.id}>
              {familyMember.id == id ? name : familyMember.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Button variant="outlined" onClick={handleNewTab}>
          +
        </Button>
      </Stack>
    </Container>
  );
};

export default FamilyMemberTabs;
