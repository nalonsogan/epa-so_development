import { RegisterOptions } from "react-hook-form";

export type ControlType = "text" | "date" | "email" | "checkbox" | "document";

export interface SelectOption {
  label: string;
  value: string;
}

export interface DynamicFieldData {
  label: string;
  inputType: ControlType;
  fieldName: string;
  defaultValue: any;
  options?: SelectOption[];
  config?: RegisterOptions;
}
