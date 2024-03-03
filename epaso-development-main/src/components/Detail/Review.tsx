import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';

export default function Review({ processDetail }: any){

  useEffect(() => {
    const process = JSON.parse(localStorage.getItem('process') || '{}')
    setProcessDetailData(process)
  },[]);

  const [processDetailData, setProcessDetailData] = useState<any>();
  console.log("processDetail lasstatustask: ", processDetail[0].TaskDescription)
  
  // processDetail.allTasks.map((process:any) => (
  processDetail.map((process:any) => (
    console.log("actual task: ", process )
  ))
  // Translation
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Grid item direction="column" xs={12} sm={6} mt={3}>
          <Grid container>
            <Grid item xs={2}>
              <Typography gutterBottom>Registered Date</Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography gutterBottom>{new Date(processDetailData?.Created).toLocaleString()}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography gutterBottom>Responsible</Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography gutterBottom>{processDetailData?.Responsible}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography gutterBottom>Status</Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography gutterBottom>{processDetailData?.StatusProcess}</Typography>
            </Grid>
          </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
            Historical Data
          </Typography>
          <List disablePadding>
            {/* {processDetail.allTasks.map((process:any) => ( */}
            {processDetail.map((process:any) => (
              <ListItem key={process.id} sx={{ py: 1, px: 0 }}>
                <ListItemText primary={new Date(process.Created).toLocaleString()} secondary={process.TaskDescription} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
            Task Description
          </Typography>
          <Grid container>
              <React.Fragment>
                <Grid item xs={6} sx={{ mt: 2 }}>
                  <Typography gutterBottom>Name</Typography>
                </Grid>
                <Grid item xs={6} sx={{ mt: 2 }}>
                  {/* <Typography gutterBottom>{processDetail.lastStatusTask.title}</Typography> */}
                  <Typography gutterBottom>{processDetail[0].Title}</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom>Status</Typography>
                </Grid>
                <Grid item xs={6}>
                  {/* <Typography gutterBottom>{processDetail.lastStatusTask.taskType}</Typography> */}
                  <Typography gutterBottom>{processDetail[0].TaskType1}</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom>Date</Typography>
                </Grid>
                <Grid item xs={6}>
                  {/* <Typography gutterBottom>{new Date(processDetail.lastStatusTask.created).toLocaleString()}</Typography> */}
                  <Typography gutterBottom>{new Date(processDetail[0].Created).toLocaleString()}</Typography>
                </Grid>
              </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}