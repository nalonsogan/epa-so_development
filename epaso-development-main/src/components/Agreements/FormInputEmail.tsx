import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { TextField } from "@mui/material";
import { useState } from "react";
export const FormInputEmailText = ({ name, control, label, defaultValue }: FormInputProps) => {

  const [errorPasword, setErrorPasword] = useState(false);

  const checkValue = (e:any) => {
    const emailRegex = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/;
    if(emailRegex.test(e.target.value)){
        setErrorPasword(false);
    } else {
        setErrorPasword(true);
    }
  }
  
  return (
    <Controller
      name={name}
      control={control}
      rules={{pattern: /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/}}
      render={({
        field: { onChange, value, ref },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          disabled
          sx={{ mt: 1 }}
          id={name}
          onChange={(e) => {
            checkValue(e);
            onChange(e)
          }}
          value={value}
          fullWidth
          label={label}
          defaultValue={defaultValue}
          type="text"
          ref={ref}
          error={errorPasword}
          helperText={errorPasword && "Invalid format"}
        />
      )}
    />
  );
};