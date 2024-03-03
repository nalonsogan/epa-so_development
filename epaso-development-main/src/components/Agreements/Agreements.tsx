import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Form } from './Form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Agreements() {

  const [dataForm, setDataForm] = useState<any[]>([]);
  const [dataFiles, setDataFiles] = useState<any[]>([]);
  const [dataProvider, setDataProvider] = useState<any>();
  const [dataCode, setDataCode] = useState<any>();
  const [errorService, setErrorService] = useState(false);
  const [errorServiceAuth, setErrorServiceAuth] = useState(false);
  const [respuesta, setRespuesta] = useState<any[]>([]);
  const [fields, setFields] = useState<any[]>([]);
  const [finalFields, setFinalFields] = useState<any[]>([]);
  
  useEffect(() => {
    //coger provider de localStorage
    const providerData = JSON.parse(localStorage.getItem('data') || '{}')
    const businessUnit = localStorage.getItem('businessUnit');
    setDataProvider(providerData)
    setErrorService(false)
    setErrorServiceAuth(false)

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
      Object.keys(response.data.d.results).map((k,v)=>(
               
        fields[v]=response.data.d.results[k]
        
      ))
      
    })
    .catch(function (error) {
      if(error.response.status == 401){
        setErrorServiceAuth(true)
        setErrorService(false)
      } else {
        setErrorService(true)
        setErrorServiceAuth(false)
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
    
      setDataCode(response.data.d['OData__x0031__000_SupplierCode'])
      
      if(response.data.d['OData__x0031__000_Status']==="Authorized"){
      for(var i=0; i<fields.length; i++){
        // if(!fields[i].EntityPropertyName.includes("1_")){
          if(!fields[i].EntityPropertyName.includes("1_") && (fields[i].EntityPropertyName.includes(dataCode) || fields[i].EntityPropertyName.includes("000"))){
            console.log("dataCode en for: " + dataCode + " y fields["+i+"] = " + fields[i].EntityPropertyName)
            
            console.log("Entra en condicion: ")
            finalFields.push({type: fields[i].TypeAsString, name:fields[i].Title, internalName:fields[i].EntityPropertyName, value:response.data.d[fields[i].EntityPropertyName]})
            // finalFields[i] = {type: fields[i].TypeAsString, name:fields[i].Title, internalName:fields[i].EntityPropertyName, value:response.data.d[fields[i].EntityPropertyName]}
            console.log("internalName: " + fields[i].EntityPropertyName + " type: " + fields[i].TypeAsString)
          }
      }

      console.log("R: ",respuesta)
      console.log("finalFields: ", finalFields)
      setDataForm(finalFields)

    }
      else{
        setErrorServiceAuth(true)
      }
      // setDataForm(response.data.formFields)
    })
    .catch(function (error) {
      if(error.response.status == 401){
        setErrorServiceAuth(true)
        setErrorService(false)
      } else {
        setErrorService(true)
        setErrorServiceAuth(false)
      }
      
    });
    }, 1000);
  }, []);
    
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
            alignItems: 'center',
          }}
        >
          {
            errorService && 
            <Stack sx={{ width: '100%', marginTop: 2 }} spacing={2}>
                <Alert severity="error">Error in the service, please try again later</Alert>
            </Stack>
          }
          {
            errorServiceAuth && 
            <Box>
              <Stack sx={{ width: '100%', marginTop: 2 }} spacing={2}>
                  <Alert severity="error">Not authorized</Alert>
              </Stack>
              <Button
                onClick={(e) => {navigate("/home")}}
                variant="contained"
                sx={{ mt: 3, mb: 2, mr: 2 }}>
                Go Back
              </Button>
            </Box>

          }
          
          {/* {dataForm.length !== 0 && dataFiles.length !== 0 &&  */}
          {dataForm.length !== 0 &&  

            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                {/* <Form fields={dataForm} dataFiles={dataFiles} dataProvider={dataProvider} /> */}
                <Form fields={dataForm} dataCode={dataCode} />
              </Grid>
            </Box>
          }
        </Box>
      </Container>
  );
}
