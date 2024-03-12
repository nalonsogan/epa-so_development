import { FormProvider, useForm } from "react-hook-form";
import { Alert, Box, Button, Container, CssBaseline, Grid, Link, Stack, Typography } from "@mui/material";
import { FormInputText } from "./FormInputText";
import { FormInputDate } from "./FormInputDate";
import { FormInputEmailText } from "./FormInputEmail";
import { FormInputRadio } from "./FormInputRadio";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import FileUpload from "react-material-file-upload";
import { FormNumberText } from "./FormInputNumber";
import axios from "axios";
import fileDownload from 'js-file-download';
import { useNavigate } from "react-router-dom";

export const Form = ({ fields, dataFiles, dataProvider, dataProcess }: any) => {

  const [files, setFiles] = useState<File[]>([]);

  // Translation
  const { t } = useTranslation();
  const [answer, setAnswer] = useState("");

  const formMethods = useForm();
  const methods = useForm<any>();
  const { handleSubmit, control } = methods
  const [errorService, setErrorService] = useState(false);
  const [sucessService, setSuccessService] = useState(false);
  const [businessUnit, setBusinessUnit] = useState("");
  const [magnoliaIntro, setMagnoliaIntro] = useState("");
  const [magnoliaExpla, setMagnoliaExpla] = useState("");
  const [magnoliaDes, setMagnoliaDes] = useState("");

  useEffect(() => {
    const processData = JSON.parse(localStorage.getItem('data') || '{}')
    const businessUnit = localStorage.getItem('businessUnit');
    if(businessUnit !== null){
      setBusinessUnit(businessUnit)
    }
    console.log("fields en supplier form ", fields)
   
  },[]);

  const onSubmit = (data: any) => {
    const businessUnit = localStorage.getItem('businessUnit');
    const [objectToSend, objetCounter] = setObjectToSend(data)
    const checkTypesData = checkType(objectToSend)
    setSuccessService(false)
    setErrorService(false)
    //GetVendorData
    axios
    .get("https://alonsogan.sharepoint.com/sites/suppliers/_api/web/lists/GetByTitle('Process')/items("+dataProcess.ID+")?$select=SupplierIDId,InternalAccountableID/Title&$expand=InternalAccountableID/Title",
    {
        headers: { 
          'Accept':'application/json;odata=verbose',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + globalThis.accessToken,
          'If-Match':'*',
          'X-HTTP-Method':'MERGE'
        }
      }
    )
    .then((response) => {
      //Con el vendor Ok, hacemos un update del formulario
      axios
      .post("https://alonsogan.sharepoint.com/sites/suppliers/_api/web/lists/GetByTitle('Suppliers')/items("+response.data.d.SupplierIDId+")",

      checkTypesData,{
          headers: { 
            'Accept':'application/json;odata=verbose',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + globalThis.accessToken,
            'If-Match':'*',
            'X-HTTP-Method':'MERGE'
          }
      }
      )
      .then((response1) => {
        //comprobamos si se tienen que enviar documentos o no
        saveDocuments(objetCounter, response.data)
      })
      .catch(function (error) {
          setErrorService(true)
      });
    })
    .catch(function (error) {
      setErrorService(true)
    });
  }

  const saveDocuments = (objetCounter:any, vendor:any) => {
    if(files.length !== 0){
      files.map(
        (file) => {
          const dataAux = new FormData();
          dataAux.append('file', file)
          dataAux.append('name', file.name)
          axios
          .post("http://20.254.101.28:20100/providers/saveDocument/" + businessUnit + "/" + dataProvider.SupplierIDId, dataAux,
          {
              headers: { 
                'Content-Type': 'multipart/form-data'
              }
          }
          )
          .then((response) => {
            //hacemos un update al estado del formulario
            updateStatus(objetCounter, vendor)
          })
          .catch(function (error) {
          })
        }
      )
    } else {
      //hacemos un update al estado del formulario
      updateStatus(objetCounter, vendor)
    }
  }

  const updateStatus = (objetCounter:any, vendor:any) => {
    let draftOrSave = ''
    let responsibleAux = ''
    if(objetCounter === 0){
      draftOrSave = 'Pending data review'
      responsibleAux = vendor.d.InternalAccountableID.Title
    } else {
      draftOrSave = 'Draft'
      responsibleAux = 'supplier'
    }
    //hacemos un update del proceso
    axios
    
    .post("https://alonsogan.sharepoint.com/sites/suppliers/_api/web/lists/GetByTitle('Process')/items("+dataProcess.ID+")",
    { 
        "StatusProcess": draftOrSave, 
        "Responsible": responsibleAux,
        "Message": ""
    },{
        headers: { 
          'Accept':'application/json;odata=verbose',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + globalThis.accessToken,
          'If-Match':'*',
          'X-HTTP-Method':'MERGE'
        }
    }
    )
    .then((response) => {
      setSuccessService(true)
      navigate('/home')
    })
    .catch(function (error) {
        setErrorService(true)
    });
  }

  const setObjectToSend = (data:any) => {
    let objectAux:any = {}
    let counter : number = 0;
    fields.map((field:any) => {
      // console.log("field en Form Supplier -> ", field)
      Object.keys(data).map((key:any) => {
        // console.log("data en FORM: ", data)
        // console.log("key en FORM: ", key)
        // const nameFull = field.fullName;
        const nameFull = field.internalName;
        // console.log("nameFull en FORM: ", nameFull)
        // console.log("field.name en FORM: ", field.name)
        // console.log("data[key] -> ", data[key])
        if(key === field.name && data[key] === undefined){
          if(field.value == null){
            objectAux[nameFull] = ''
            counter = counter + 1;
          } else {
            objectAux[nameFull] = field.value;
          }
        } else if (key === field.name) {
          objectAux[nameFull] = data[key];
        }
      })
    })
    return [objectAux, counter];
  }

  const checkType = (dataP:any) => {
    fields.map((field:any) => {
      console.log("field en checkType: ", field)
      Object.keys(dataP).map((keyP:any) => {
        // console.log("dataP: ", dataP)
        // console.log("KeyP: ", keyP)

        if(field.fullName == keyP){
          switch (field.type) {
            case 'Number':
              dataP[keyP] === '' ? dataP[keyP] = 0 : dataP[keyP] = dataP[keyP]
              dataP[keyP] !== '' ? dataP[keyP] = Number(dataP[keyP]) : dataP[keyP] = dataP[keyP]
              break;
            case 'Boolean':
              dataP[keyP] === '' ? dataP[keyP] = null : dataP[keyP] = dataP[keyP]
              dataP[keyP] === 'true' ? dataP[keyP] = true : dataP[keyP] = dataP[keyP]
              dataP[keyP] === 'false' ? dataP[keyP] = false : dataP[keyP] = dataP[keyP]
              break;
            case 'DateTime':
              dataP[keyP] === '' ? dataP[keyP] = null : dataP[keyP] = dataP[keyP]
              break;
            default:
              break;
          }
        }
      })
    })
    return dataP;
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
          Onboarding Form
        </Typography>
        <div dangerouslySetInnerHTML={{__html: magnoliaIntro}}></div>
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
                      {d.type === "Text" && <FormInputText name={d.name} control={control} label={d.name} defaultValue={d.value} />}
                      {d.type === "Number" && <FormNumberText name={d.name} control={control} label={d.name} defaultValue={d.value} />}
                      {d.type === "email" && <FormInputEmailText name={d.name} control={control} label={d.name} defaultValue={d.value} />}
                      {d.type === "Boolean" && <FormInputRadio name={d.name} control={control} label={d.name} defaultValue={d.value} />}
                      {d.type === "DateTime" && <FormInputDate name={d.name} control={control} label={d.name} defaultValue={d.value} />}
                      {/* {d.inputType == "document" && <FormInputDocument name={d.fieldName} control={control} label={d.fieldName} defaultValue={d.defaultValue} />} */}
                    </Grid>
                  ))}
              </FormProvider>
              <Grid item xs={12} md={12}>
                {/* <div dangerouslySetInnerHTML={{__html: magnoliaExpla}}></div> */}
                { dataFiles.length>0 &&
                  <ul>
                    {dataFiles.documents.map((e:any) => (
                      <li>
                        <Link
                          // onClick={(f) => handleGetDocument(e)}
                          sx={{ cursor:'pointer'}}
                          >
                          {e.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                }
                <FileUpload 
                  value={files}
                  title="Upload Documents"
                  onChange={setFiles} 
                  buttonText="Select"
                  buttonProps={{
                    variant: "outlined"
                  }}
                  typographyProps={{
                    variant: "body2",
                    color: "textSecondary"
                  }}
                  multiple={true}/>
              </Grid>
              <Grid item xs={12}>
                <div dangerouslySetInnerHTML={{__html: magnoliaDes}}></div>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  variant="contained"
                  sx={{ mt: 3, mb: 2, mr: 2 }}>
                  Submit/Save Form
                </Button>
                <Button
                  onClick={(e) => {navigate("/pending")}}
                  variant="contained"
                  sx={{ mt: 3, mb: 2, float: 'right' }}>
                  Go Back
                </Button>
              </Grid>
          </Grid>
        </Box>}
      </Box>
    </Container>
  );
};
