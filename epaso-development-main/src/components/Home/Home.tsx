import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Orders from './Orders';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  // Translation
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={2}>

            {/* Agreements card */}
            <Grid item xs={12} md={6}>
              <CardActionArea component="a" href="/agreements">
                <Card sx={{ display: 'flex' }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                      {t("agreements.title")}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                    {t("agreements.homeCardText")}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      {t("agreements.homeCardButton")}
                    </Typography>
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>

            {/* To-do list card */}
            <Grid item xs={12} md={6}>
              <CardActionArea component="a" href="/pending">
                <Card sx={{ display: 'flex' }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                      {t("todoList.title")}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                    {t("todoList.homeCardText")}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      {t("todoList.homeCardButton")}
                    </Typography>
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>

          </Grid>
        </Container>

        {/* Process Table */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}