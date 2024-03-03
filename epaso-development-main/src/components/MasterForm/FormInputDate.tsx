import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns  } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, useFormContext } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
const DATE_FORMAT = "dd-MM-yy";

export const FormInputDate = ({ name, control, label, defaultValue }: FormInputProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState, formState }) => (
          <DemoContainer components={['DatePicker']}>
            <DatePicker 
                label={label}
                format={DATE_FORMAT}
                {...field}
                defaultValue={defaultValue!=='' && defaultValue!==null ?  new Date(defaultValue) : undefined}
                sx={{width: '100%'}}
            />
          </DemoContainer>
        )}
      />
    </LocalizationProvider>
  );
};