import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Alert, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { useTranslation } from "react-i18next";

export default function Login() {
  // Translation
  const { t } = useTranslation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorService(false)
    const businessUnitLcal = localStorage.getItem('businessUnit');
    let comboOption = ''
    if(businessUnitLcal == null){
      comboOption = combo;
      localStorage.setItem('businessUnit', combo)
    } else {
      comboOption = businessUnitLcal
    }
   
    axios
    //"https://alonsogan.sharepoint.com/sites/" + comboOption + "...",
    .get("https://alonsogan.sharepoint.com/sites/suppliers/_api/web/lists/GetByTitle('User Suppliers')/items?$filter=Email eq '"+email+"' and Password eq '"+password+"'",

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
      // localStorage.setItem('data', JSON.stringify(response.data))
      // navigate("/home");
      
      if(response.data.d.results[0]===undefined)
        setErrorLogin(true)
      
      else{
        // console.log("response: ", response.data.d.results[0])
        console.log("response: ", response.data.d.results[0].SupplierIDId)
        localStorage.setItem('data', JSON.stringify(response.data.d.results[0]))
        // localStorage.setItem('data', JSON.stringify(response.data.d.results[0].SupplierIDId))
        navigate("/home");
      }
        
    })
    .catch(function (error) {
        setErrorService(true)
    });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showCombo, setShowCombo] = useState(false);
  const [combo, setCombo] = useState("");
  const [errorService, setErrorService] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  useEffect(() => {
    const businessUnitLcal = localStorage.getItem('businessUnit');
    if(businessUnitLcal == null){
      setShowCombo(true);
    }
  },[]);

  // Navigate
  const navigate = useNavigate();

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3,
            boxShadow: 1,
            borderRadius: 2,
            border: '1px solid grey',
            borderColor: 'grey.200'
          }}
        >
          <img src="../AltaProveedoresExternos-192x192.png" alt="Portal externo proveedores"></img>
          <Typography component="h1" variant="h5" sx={{ mt: 6 }}>{t('login.title')}</Typography>
          {
            errorService && 
            <Stack sx={{ width: '100%', marginTop: 2 }} spacing={2}>
                <Alert severity="error">Error in the service, please try again later</Alert>
            </Stack>
          }
          {
            errorLogin && 
            <Stack sx={{ width: '100%', marginTop: 2 }} spacing={2}>
                <Alert severity="error">Error in the login, the email or password don't match</Alert>
            </Stack>
          }
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("login.email")}
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("login.password")}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {
              showCombo &&
                <TextField
                  id="outlined-select-currency"
                  select
                  fullWidth
                  label="Business Unit"
                  sx={{marginTop: 2 }}
                  value={combo}
                  onChange={(e) => setCombo(e.target.value)}
                >
                  <MenuItem value={'suppliers'}>suppliers</MenuItem>
                  
                </TextField>
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t("login.button")}
            </Button>
          </Box>
        </Box>
      </Container>
  );
}
