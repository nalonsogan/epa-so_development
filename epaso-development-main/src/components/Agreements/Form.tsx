import { FormProvider, useForm } from "react-hook-form";
import { Alert, Box, Button, Container, CssBaseline, Grid, Link, Stack, Typography } from "@mui/material";
import { FormInputText } from "./FormInputText";
import { FormInputDate } from "./FormInputDate";
import { FormInputEmailText } from "./FormInputEmail";
import { FormInputRadio } from "./FormInputRadio";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { FormNumberText } from "./FormInputNumber";
import axios from "axios";
import fileDownload from 'js-file-download';
import { useNavigate } from "react-router-dom";

export const Form = ({ fields, dataFiles, dataProvider, dataCode }: any) => {


  console.log("fields: ", fields)
  fields.map((d:any, i:any) => (
    console.log("cuanto vale i => " + i)
    // console.log(d.internalName.includes(dataCode) && "d.name=> "+ d.name + " d.value=> " + d.value + " d.internalName=> " + d.internalName + " d.type=> " + d.type)
    // console.log(d.internalName.includes(dataCode))
  ))

  console.log("dataCode: ", dataCode)
  const [files, setFiles] = useState<File[]>([]);

  // Translation
  const { t } = useTranslation();

  const formMethods = useForm();
  const methods = useForm<any>();
  const { handleSubmit, control } = methods
  const [errorService, setErrorService] = useState(false);
  const [sucessService, setSuccessService] = useState(false);
  const [businessUnit, setBusinessUnit] = useState("");

  useEffect(() => {
    const businessUnit = localStorage.getItem('businessUnit');
    if(businessUnit !== null){
      setBusinessUnit(businessUnit)
    }
  },[]);

  const handleGetDocument = (data: any) => {
    setErrorService(false)
  }

  // Navigate
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
          }}
      >
        <Typography component="h1" variant="h5">
          Agreement
        </Typography>
        {
            errorService && 
            <Stack sx={{ width: '100%', marginTop: 2 }} spacing={2}>
                <Alert severity="error">Error in the service, please try again later</Alert>
            </Stack>
          }
          {
            sucessService && 
            <Stack sx={{ width: '100%', marginTop: 2 }} spacing={2}>
                <Alert severity="success">Your form has been succesfully updated!</Alert>
            </Stack>
          }
        {fields.lenght !== 0 && <Box component="form" noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
              <FormProvider {...formMethods}>
                  {fields.map((d:any, i:any) => (
                    <Grid item xs={12} md={6} key={i}>
                      {d.type === "Text" &&<FormInputText name={d.name} control={control} label={d.name} defaultValue={d.value} />}
                      {d.type === "Boolean" && <FormInputRadio name={d.name} control={control} label={d.name} defaultValue={d.value} />}
                      {d.type === "Number" && <FormNumberText name={d.name} control={control} label={d.name} defaultValue={d.value} />}
                      {d.type === "Currency" && <FormNumberText name={d.name} control={control} label={d.name} defaultValue={d.value} />}
                      {d.type === "DateTime" && <FormInputDate name={d.name} control={control} label={d.name} defaultValue={d.value} />}
                      
                      {
                      /* {d.type === "Text" &&d.internalName.includes(dataCode) && <FormInputText name={d.name} control={control} label={d.name} defaultValue={d.value} />} */}
                      {/* {<FormNumberText name={d.k} control={control} label={d.v} defaultValue={d.v} />}
                      {<FormInputEmailText name={d.k} control={control} label={d.v} defaultValue={d.v} />}
                      {<FormInputRadio name={d.k} control={control} label={d.v} defaultValue={d.v} />} */}
                      
                      {/* {d.type === "text" && <FormInputText name={d.name} control={control} label={d.name} defaultValue={d.value} />}
                      {d.type === "number" && <FormNumberText name={d.name} control={control} label={d.name} defaultValue={d.value} />}
                      {d.type === "email" && <FormInputEmailText name={d.name} control={control} label={d.name} defaultValue={d.value} />}
                      {d.type === "checkbox" && <FormInputRadio name={d.name} control={control} label={d.name} defaultValue={d.value} />}
                      {d.type === "date" && <FormInputDate name={d.name} control={control} label={d.name} defaultValue={d.value} />} */}
                    </Grid>
                  ))}
              </FormProvider>
              {/* <Grid item xs={12} md={12}>
                <ul>
                  {dataFiles.documents.map((e:any) => (
                    <li>
                      <Link
                        onClick={(f) => handleGetDocument(e)}
                        sx={{ cursor:'pointer'}}
                        >
                        {e.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Grid> */}
              <Grid item xs={12}>
                <Button
                  onClick={(e) => {navigate("/home")}}
                  variant="contained"
                  sx={{ mt: 3, mb: 2, mr: 2 }}>
                  Go Back
                </Button>
              </Grid>
          </Grid>
        </Box>}
      </Box>
    </Container>
  );
};
