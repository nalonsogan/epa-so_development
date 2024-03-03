import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { Alert, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Communication() {

  // Translation
  const { t } = useTranslation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const businessUnit = localStorage.getItem('businessUnit')
    const processData = JSON.parse(localStorage.getItem('process') || '{}')
    axios
    .get("https://alonsogan.sharepoint.com/sites/suppliers/_api/web/lists/GetByTitle('Process')/items("+processData.ID+")?$select=InternalAccountableID/Title&$expand=InternalAccountableID/Title",

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
      console.log("responsible: ", response.data.d.InternalAccountableID.Title)
      console.log("answer: " + answer + " longitud: " + answer.length)
      if(answer.length>0){      
        axios
        .post("https://alonsogan.sharepoint.com/sites/suppliers/_api/web/lists/GetByTitle('Process')/items("+processData.ID+")",
        { 
          "StatusProcess": 'Resolved', 
          "Responsible": response.data.d.InternalAccountableID.Title,
          "Message": answer
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
        .then((response1) => {
          navigate("/home");
        })
        .catch(function (error) {
            setErrorService(true)
        
        });
      } 
      else
        setErrorMessage(true)

    })
    .catch(function (error) {
        setErrorService(true)
    });
  };

  const [answer, setAnswer] = useState("");
  const [errorService, setErrorService] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

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
        }}
      >
        <Typography component="h1" variant="h5">{t("communication.title")}</Typography>
        {
            errorService && 
            <Stack sx={{ width: '100%', marginTop: 2 }} spacing={2}>
                <Alert severity="error">Error in the service, please try again later</Alert>
            </Stack>
        }
        {
           errorMessage && 
           <Stack sx={{ width: '100%', marginTop: 2 }} spacing={2}>
               <Alert severity="error">Please, fill out the message field</Alert>
           </Stack>
        }
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="outlined-multiline-static"
            label={t("communication.textarepasolaceholder")}
            name="multiline"
            autoFocus
            multiline
            rows={4}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t("communication.textareaButton")}
          </Button>
          <Button
            onClick={(e) => {navigate("/pending")}}
            variant="contained"
            sx={{ mt: 3, mb: 2, float: 'right' }}>
            Go Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
