import { TextField } from "@mui/material";

export const CommonTextField = ({
  label = "",
  variant = "standard",
  fullWidth = true,
  disabled = false,
  name = "",
  type = "text",
  register = () => {},
  errors = "",
  required = false,
  minLength = null,
  pattern = null,
  helperText = "",
  value = undefined,
  onChange = () => {},
}) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      label={label}
      variant={variant}
      fullWidth={fullWidth}
      disabled={disabled}
      type={type}
      {...register(name, {
        required: required && `This field ${name} is required`,
        minLength: minLength && {
          value: minLength,
          message: `Must be at least ${minLength} characters long`,
        },
        pattern: pattern && {
          value: pattern.value,
          message: pattern.message,
        },
      })}
      error={!!errors[name]}
      helperText={helperText || (errors[name] && errors[name].message)}
      autoComplete={name === "password" ? "current-password" : "off"}
    />
  );
};
