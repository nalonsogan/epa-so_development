import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Review from './Review';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { Alert, Button, Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Detail() {
  
  // Translation
  const { t } = useTranslation();

  useEffect(() => {
    setErrorService(false)
    const process = JSON.parse(localStorage.getItem('process') || '{}')
    setProcessLocalS(process)
    const businessUnit = localStorage.getItem('businessUnit');

    setTimeout(() => {
      axios
    .get("https://alonsogan.sharepoint.com/sites/suppliers/_api/web/lists/GetByTitle('Tasks')/items?$filter=ProcessIDId eq "+process.ID+"&$orderby=ID desc",
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
      console.log("tasks: ", response.data.d.results)
      setProcessDetail(response.data.d.results)
      // setProcessDetail(response.data)
    })
    .catch(function (error) {
        setErrorService(true)
    });
    }, 500);
    
  },[]);

  const [processDetail, setProcessDetail] = useState<any>();
  const [processLocalS, setProcessLocalS] = useState<any>();
  const [errorService, setErrorService] = useState(false);
  
  // Navigate
  const navigate = useNavigate();
    
  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
          {processLocalS?.type}
          </Typography>
          {
              errorService && 
              <Stack sx={{ width: '100%', marginTop: 2 }} spacing={2}>
                  <Alert severity="error">Error in the service, please try again later</Alert>
              </Stack>
            }
            {processDetail != undefined && 
              <React.Fragment>
                <Review processDetail={processDetail} />
                <Grid item xs={12}>
                  <Button
                    onClick={(e) => {navigate("/pending")}}
                    variant="contained"
                    sx={{ mt: 3, mb: 2, mr: 2 }}>
                    Go Back
                  </Button>
                </Grid>
              </React.Fragment>
            }
        </Paper>
      </Container>
    </React.Fragment>
  );
}
