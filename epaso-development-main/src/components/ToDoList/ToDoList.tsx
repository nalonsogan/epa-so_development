import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTranslation } from "react-i18next";
import { Alert, Button, Container, Grid, IconButton, Stack, Typography, styled } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function ToDoList() {

  // Translation
  const { t } = useTranslation();

  useEffect(() => {
    setErrorService(false)
    const businessUnit = localStorage.getItem('businessUnit');
    const providerData = JSON.parse(localStorage.getItem('data') || '{}')
    // console.log("provider data ", providerData.SupplierIDId )

    setTimeout(() => {
      axios
    .get("https://alonsogan.sharepoint.com/sites/suppliers/_api/web/lists/GetByTitle('Process')/items?$filter=SupplierIDId eq "+providerData.SupplierIDId+" and (StatusProcess eq 'Email sent to supplier' or StatusProcess eq 'Draft' or StatusProcess eq 'Open' or StatusProcess eq 'Reopened')&$select=ProcessType,Created,Modified,StatusProcess,Responsible,ID&$orderby=Modified desc",
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
      console.log("response=> " , response.data.d.results)
      
      setProcessList(response.data.d.results)
  
      
    })
    .catch(function (error) {
      setErrorService(true)
    })
  
      
    }, 500);

  },[]);

  const [processList, setProcessList] = useState<any>([]);
  const [errorService, setErrorService] = useState(false);

  const handleRowClick = (row:any) => {
    localStorage.setItem('process', JSON.stringify(row))
    navigate("/detail");
  }

  const handleClickForm = (row:any) => {
    localStorage.setItem('process', JSON.stringify(row))
    navigate('/master-form')
  }

  const handleClickMessage = (row:any) => {
    console.log("row de generic task: ", row)
    localStorage.setItem('process', JSON.stringify(row))
    navigate('/communication')
  }

  // Navigate
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>My task</Typography>
            {
              errorService && 
              <Stack sx={{ width: '100%', marginTop: 2 }} spacing={2}>
                  <Alert severity="error">Error in the service, please try again later</Alert>
              </Stack>
            }
            {processList.length !== 0 &&
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Detail</StyledTableCell>
                    <StyledTableCell>Process Type</StyledTableCell>
                    <StyledTableCell>Process Start Date</StyledTableCell>
                    <StyledTableCell>Last Action</StyledTableCell>
                    <StyledTableCell>State</StyledTableCell>
                    <StyledTableCell>Next Action Responsible</StyledTableCell>
                    <StyledTableCell>Next Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {processList.map((row:any) => (
                    <StyledTableRow key={row.ID}>
                      <TableCell><IconButton style={{padding:8}}  onClick={() => handleRowClick(row)}><VisibilityIcon sx={{ color: "textSecondary"}} fontSize="small"/></IconButton></TableCell>
                      <TableCell>{row.ProcessType}</TableCell>
                      {/* <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleRowClick(row)}>{row.ProcessType}</TableCell> */}
                      <TableCell>{new Date(row.Created).toLocaleString()}</TableCell>
                      <TableCell>{new Date(row.Modified).toLocaleString()}</TableCell>
                      <TableCell>{row.StatusProcess}</TableCell>
                      <TableCell>{row.Responsible}</TableCell>
                      {/* <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleRowClick(row)}>{row.type}</TableCell>
                      <TableCell>{new Date(row.created).toLocaleString()}</TableCell>
                      <TableCell>{new Date(row.modified).toLocaleString()}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.responsible}</TableCell> */}
                      {
                        row.ProcessType == 'Onboarding Supplier' &&
                          <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleClickForm(row)}>Go to Form</TableCell>
                      }
                      {
                        row.ProcessType == 'Generic Task' &&
                          <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleClickMessage(row)}>Go to Response</TableCell>
                      }
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            }
            <Grid item xs={12}>
              <Button
                onClick={(e) => {navigate("/home")}}
                variant="contained"
                sx={{ mt: 3, mb: 2, mr: 2 }}>
                Go Back
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
