import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Form } from './Form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Stack } from '@mui/material';

export default function MasterForm() {

  const [dataForm, setDataForm] = useState<any[]>([]);
  const [dataFiles, setDataFiles] = useState<any[]>([]);
  const [dataProvider, setDataProvider] = useState<any>();
  const [dataProcess, setDataProcess] = useState<any>();
  const [dataCode, setDataCode] = useState<any>();
  const [errorService, setErrorService] = useState(false);
  const [fields, setFields] = useState<any[]>([]);
  const [finalFields, setFinalFields] = useState<any[]>([]);

  useEffect(() => {
    //coger provider de localStorage
    const processData = JSON.parse(localStorage.getItem('process') || '{}')
    const providerData = JSON.parse(localStorage.getItem('data') || '{}')
    const businessUnit = localStorage.getItem('businessUnit');
    setDataProvider(providerData)
    setDataProcess(processData)
    setErrorService(false)

    console.log("provider data en master for,", providerData.ID )
    console.log("process en master for,", processData.ID )

    

    setTimeout(() => {
      axios
    //"https://alonsogan.sharepoint.com/sites/" + comboOption + "...",
    .get("https://alonsogan.sharepoint.com/sites/suppliers/_api/web/lists/GetByTitle('Suppliers')/fields?$select=Title,TypeAsString,Choices,EntityPropertyName",
    {
        headers: { 
          'Accept':'application/json;odata=verbose',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + globalThis.accessToken,
          'If-Match':'*',
          'X-HTTP-Method':'MERGE'
        }
    })
    .then((response) => {
      // console.log("response en fields: ", response.data.d.results)
      // console.log("response en agreements: ", response.data.d['OData__x0030__000_Name'])

      Object.keys(response.data.d.results).map((k,v)=>(
        // console.log("key: " + k + " value: " + response.data.d[k] )
        // console.log("key: " + k + " value: " + response.data.d[k] + " type: " + response.data.d[k].type)
        // console.log("fields: " + k)
        
        fields[v]=response.data.d.results[k]
        
      ))
      console.log("fields en agreements: ",fields)
      // setDataForm(respuesta)
      // setDataForm(response.data.formFields)
    })
    .catch(function (error) {
      if(error.response.status == 401){
        
        setErrorService(false)
      } else {
        setErrorService(true)
        
      }
    })



      
    }, 500);

    

    setTimeout(() => {
      axios
    //"https://alonsogan.sharepoint.com/sites/" + comboOption + "...",
    .get("https://alonsogan.sharepoint.com/sites/suppliers/_api/web/lists/GetByTitle('Suppliers')/items("+providerData.ID+")",

    {
        headers: { 
          'Accept':'application/json;odata=verbose',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + globalThis.accessToken,
          'If-Match':'*',
          'X-HTTP-Method':'MERGE'
        }
    })
    .then((response) => {
      console.log("response en agreements: ", response.data.d.OData__x0030__000_Name)
      console.log("response en agreements: ", response.data.d['OData__x0030__000_Name'])
      setDataCode(response.data.d['OData__x0031__000_SupplierCode'])
  
      console.log("longitud fields: " + fields.length)
      console.log("authorized? " + response.data.d['OData__x0031__000_Status'])
      if(response.data.d['OData__x0031__000_Status']==="Not Authorized"){
      for(var i=0; i<fields.length; i++){
        // if(!fields[i].EntityPropertyName.includes("1_")){
          if(!fields[i].EntityPropertyName.includes("1_") && (fields[i].EntityPropertyName.includes(dataCode) || fields[i].EntityPropertyName.includes("000"))){
            console.log("dataCode en for: " + dataCode + " y fields["+i+"] = " + fields[i].EntityPropertyName)
            
            console.log("Entra en condicion: ")
            finalFields.push({type: fields[i].TypeAsString, name:fields[i].Title, internalName:fields[i].EntityPropertyName, value:response.data.d[fields[i].EntityPropertyName]})
            // finalFields[i] = {type: fields[i].TypeAsString, name:fields[i].Title, internalName:fields[i].EntityPropertyName, value:response.data.d[fields[i].EntityPropertyName]}
            console.log("internalName: " + fields[i].EntityPropertyName + " type: " + fields[i].TypeAsString)
          }
        // }
      }
      // Object.keys(fields).map((k,v)=>(
      //   // console.log("key: " + k + " value: " + response.data.d[k] )
      //   // console.log("key: " + k + " value: " + response.data.d[k] + " type: " + response.data.d[k].type)
        
        // respuesta[v]={k:k,v:response.data.d[k]}
        
      // ))

      console.log("finalFields: ", finalFields)
      setDataForm(finalFields)

    }
      // setDataForm(response.data.formFields)
    })
    .catch(function (error) {
      if(error.response.status == 401){
        setErrorService(false)
      } else {
        setErrorService(true)
      }
      
    });
    }, 1000);




  }, []);

  console.log("fields en master form: ", dataForm)
  console.log("dataProvider en master form: ", dataProvider)
  console.log("dataProcess en master form: ", dataProcess)
  return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {
            errorService && 
            <Stack sx={{ width: '100%', marginTop: 2 }} spacing={2}>
                <Alert severity="error">Error in the service, please try again later</Alert>
            </Stack>
          }
          {/* {dataForm.length !== 0 && dataFiles.length !== 0 &&  */}
          {dataForm.length !== 0 && 
              <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                {/* <Form fields={dataForm} dataFiles={dataFiles} dataProvider={dataProvider} dataProcess={dataProcess} /> */}
                {/* <Form fields={dataForm} dataFiles={dataFiles} dataProvider={dataProvider} dataProcess={dataProcess} /> */}
                <Form fields={dataForm}  dataFiles={dataFiles} dataProvider={dataProvider} dataProcess={dataProcess} />
              </Grid>
            </Box>
          }
        </Box>
      </Container>
  );
}
