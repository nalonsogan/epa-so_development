import { DynamicFieldData } from "./dynamic-control-types";

export const fields: DynamicFieldData[] = [
  {
    fieldName: "name",
    inputType: "text",
    label: "Name",
    defaultValue: ""
  },
  {
    fieldName: "email",
    inputType: "email",
    label: "Email",
    defaultValue: ""
  },
  {
    fieldName: "radio",
    inputType: "checkbox",
    label: "Radio",
    defaultValue: ""
  },
  {
    fieldName: "Date",
    inputType: "date",
    label: "Date",
    defaultValue: ""
  },
  {
    fieldName: "Document",
    inputType: "document",
    label: "Date",
    defaultValue: ""
  }
];
