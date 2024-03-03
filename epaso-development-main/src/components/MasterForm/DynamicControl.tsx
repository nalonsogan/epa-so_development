import { useForm, useFormContext } from "react-hook-form";
import { DynamicFieldData } from "./dynamic-control-types";
import { FormInputText } from "./FormInputText";

export const DynamicControl = ({
  inputType,
  fieldName,
  defaultValue,
  label,
  options = [],
  config = {}
}: DynamicFieldData) => {
  const { register } = useFormContext();

  const methods = useForm<any>();
  const { control } = methods;

  switch (inputType) {
    case "text":
      return (
        // <input
        //   type="text"
        //   {...register(fieldName, config)}
        //   defaultValue={defaultValue}
        // />
        // <TextField
        //     fullWidth
        //     id= {fieldName}
        //     label={label}
        //     type="text"
        //     defaultValue={defaultValue}
        // />
        <FormInputText name={fieldName} control={control} label={fieldName} defaultValue={defaultValue}/>
      );
    case "text": {
      return (
        <select
          {...register(fieldName, config)}
          defaultValue={defaultValue}
          name={fieldName}
          id={fieldName}
        >
          {options.map((o, index) => (
            <option key={index} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
    }
    case "text":
      return (
        <input
          type="number"
          {...register(fieldName, config)}
          defaultValue={defaultValue}
        />
      );
    default:
      return <input type="text" />;
  }
};
