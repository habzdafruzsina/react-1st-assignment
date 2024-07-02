import { Chip, Stack } from "@mui/material";

const IncreaseAndDecreaseInput = ({decreaseFunc, increaseFunc, counter}) => {

  return (
    <Stack direction="row" spacing={0}>
        <Chip label="-" size="small" variant="outlined" onClick={() => decreaseFunc()} />
        {counter}
        <Chip label="+" size="small" variant="outlined" onClick={() => increaseFunc()} />
    </Stack>
  );
};

export default IncreaseAndDecreaseInput;
