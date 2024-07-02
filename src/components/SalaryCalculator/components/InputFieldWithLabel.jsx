import { TextField } from "@mui/material";

const InputFieldWithLabel = ({
  label,
  helperText,
  value,
  handleChange,
  style,
}) => {
  return (
    <TextField
      sx={style}
      label={label}
      variant="outlined"
      helperText={helperText}
      required
      value={value}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};

export default InputFieldWithLabel;
