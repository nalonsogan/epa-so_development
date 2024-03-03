import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Alert, Stack } from '@mui/material';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import Functions  from '../Functions/Functions'


export default function CreatePasswordPage() {

  // const access_token = Functions();
  // declare var access_token: any;
  console.log("access token: ", globalThis.accessToken);


  // Translation
  const { t } = useTranslation();
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(password === password1){
        setErrorPasword(false)
      
        axios
        .post("https://alonsogan.sharepoint.com/sites/suppliers/_api/web/lists/GetByTitle('User Suppliers')/items("+idUser+")",

        { 
          "Password": password 
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
        localStorage.setItem('businessUnit', businessUnit)
        navigate("/login");
      })
      .catch(function (error) {
          setErrorService(true)
      });
    } else {
        setErrorPasword(true)
    }
  };

  const [email, setEmail] = useState("");
  const [idUser, setIdUser] = useState("");
  const [businessUnit, setBusinessUnit] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [errorPasword, setErrorPasword] = useState(false);
  const [errorService, setErrorService] = useState(false);
  const [searchParams] = useSearchParams();

  // Navigate
  const navigate = useNavigate();

  useEffect(() => {
    const emailParams = searchParams.get('email');
    if(emailParams !== null){
      setEmail(emailParams);
    }
    const emailIdUsuario = searchParams.get('idUser');
    if(emailIdUsuario !== null){
      setIdUser(emailIdUsuario);
    }
    const emailBusinessUnit = searchParams.get('businessUnit');
    if(emailBusinessUnit !== null){
      setBusinessUnit(emailBusinessUnit);
    }
  },[]);

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
          <Typography component="h1" variant="h5" sx={{ mt: 6 }}>{t('createAccount.title')}</Typography>
          {
            errorService && 
            <Stack sx={{ width: '100%', marginTop: 2 }} spacing={2}>
                <Alert severity="error">Error in the service, please try again later</Alert>
            </Stack>
          }
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={t('createAccount.email')}
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={t('createAccount.password')}
                  type="password"
                  id="password"
                  error={errorPasword}
                  helperText={errorPasword ? 'Passwords must be the same' : ''}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password1"
                  label={t('createAccount.passwordRepeat')}
                  type="password"
                  id="password1"
                  error={errorPasword}
                  helperText={errorPasword ? 'Passwords must be the same' : ''}
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t('createAccount.button')}
            </Button>
          </Box>
        </Box>
      </Container>
  );
}
