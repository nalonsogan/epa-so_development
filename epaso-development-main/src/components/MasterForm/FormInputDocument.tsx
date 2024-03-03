import { Box, Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import FileUpload from "react-material-file-upload";
import { FormInputProps } from "./FormInputProps";

export const FormInputDocument = ({ name, control, label, defaultValue }: FormInputProps) => {

  return (
    <Box
      sx={{ paddingTop: 1 }}
    >
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <FileUpload
            value={value}
            onChange={onChange}
            title={label}
            buttonText="Select"
            buttonProps={{
              variant: "outlined"
            }}
            typographyProps={{
              variant: "body2",
              color: "textSecondary"
            }}
          />
        )}
      />
    </Box>
  );
};
