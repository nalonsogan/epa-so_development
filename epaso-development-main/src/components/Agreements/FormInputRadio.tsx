import React from "react";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

const options = [
  {
    label: "Yes",
    value: 'true',
  },
  {
    label: "No",
    value: 'false',
  },
];

export const FormInputRadio: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  defaultValue
}) => {
  const generateRadioOptions = () => {
    return options.map((singleOption) => (
      <FormControlLabel
        disabled
        value={singleOption.value}
        label={singleOption.label}
        control={<Radio />}
      />
    ));
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <RadioGroup defaultValue={defaultValue} value={value} onChange={onChange} sx={{gap: 2, flexDirection: 'row'}}>
            {generateRadioOptions()}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};