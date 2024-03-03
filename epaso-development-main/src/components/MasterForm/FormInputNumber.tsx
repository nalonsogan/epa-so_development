import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { TextField } from "@mui/material";
export const FormNumberText = ({ name, control, label, defaultValue }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, ref },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          sx={{ mt: 1 }}
          id={name}
          onChange={onChange}
          value={value}
          fullWidth
          defaultValue={defaultValue}
          label={label}
          type="number"
          ref={ref}
        />
      )}
    />
  );
};