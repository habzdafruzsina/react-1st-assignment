import { Button } from "@mui/material";

const PercentButton = ({ percentage, onBtnClick }) => {
  return (
    <Button variant="outlined" onClick={() => onBtnClick(percentage)}>
      {percentage}%
    </Button>
  );
};

export default PercentButton;
