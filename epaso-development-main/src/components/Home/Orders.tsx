import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Alert, Stack, Typography, styled } from '@mui/material';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import axios from 'axios';

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

export default function Orders() {
  // Translation
  const { t } = useTranslation();

  useEffect(() => {
    setErrorService(false)
    const providerData = JSON.parse(localStorage.getItem('data') || '{}')
    const businessUnit = localStorage.getItem('businessUnit');
  
     setTimeout(() => {
      axios
    //"https://alonsogan.sharepoint.com/sites/" + comboOption + "...",
    .get("https://alonsogan.sharepoint.com/sites/suppliers/_api/web/lists/GetByTitle('Process')/items?$filter=SupplierIDId eq "+providerData.ID+"&$select=ProcessType,Created,Modified,StatusProcess,Responsible,ID&$orderby=Modified desc",
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

  return (
    <React.Fragment>
      <Typography variant="h5" component="p" sx={{ mb: 2 }}>{t("process.homeCardTitle")}</Typography>
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
              <StyledTableCell>Process Type</StyledTableCell>
              <StyledTableCell>Process Start Date</StyledTableCell>
              <StyledTableCell>Last Action</StyledTableCell>
              <StyledTableCell>State</StyledTableCell>
              <StyledTableCell>Next Action Responsible</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {processList.map((row:any) => (
              <StyledTableRow key={row.ID}>
                <TableCell>{row.ProcessType}</TableCell>
                <TableCell>{new Date(row.Created).toLocaleString()}</TableCell>
                <TableCell>{new Date(row.Modified).toLocaleString()}</TableCell>
                <TableCell>{row.StatusProcess}</TableCell>
                <TableCell>{row.Responsible}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      }
      
    </React.Fragment>
  );
}
