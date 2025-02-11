import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import Swal from "sweetalert2";
import logo from './Studio-Project.png';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3674B5', // Green color
    },
    background: {
      default: '#edf6f9', // White background
    },
  },
});

export default function Login() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const body = {
      emailAddress: data.get('email'),
      password: data.get('password')
    }

    if (!body.emailAddress || !body.password) {
      Swal.fire({
        title: "Unable to Proceed",
        text: "Please input your credentials",
        icon: "warning"
      });
      return;
    }

    try {
      const response = await axios.post('https://rc-ugc-attendance-backend.onrender.com/login-admin', body);
      const data = await response.data;

      if (data.status === 200) {
        Swal.fire({
          title: "Login Success!",
          icon: "success",
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            // Log the accountNameBranchManning before saving
            console.log("Branch Manning:", data.data.accountNameBranchManning);

            localStorage.setItem("isLoggedIn", "admin");
            localStorage.setItem("firstName", data.data.firstName); // Store firstName
            localStorage.setItem("lastName", data.data.lastName); // Store lastName
            localStorage.setItem("roleAccount", data.data.roleAccount); // Store roleAccount
            localStorage.setItem(
              "accountNameBranchManning",
              data.data.accountNameBranchManning
            ); // Store branch info

            // Redirect to the next page
            window.location.href = "/view-accounts";
          }
        });
      }
      else if (data.status === 401) {
        Swal.fire({
          title: "Login Failed!",
          text: data.data,
          icon: "error"
        });
      } else {
        Swal.fire({
          title: "Login Error!",
          text: data.data,
          icon: "error"
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Login Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error"
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
          <img src={logo} alt="Logo" style={{ width: '150px', marginBottom: '16px' }} />
          <Typography component="h1" variant="h5">
            LOGIN
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputProps={{
                style: { color: 'black' }
              }}
              InputLabelProps={{
                style: { color: 'black' }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputProps={{
                style: { color: 'black' }
              }}
              InputLabelProps={{
                style: { color: 'black' }
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgotpassword" variant="body2" style={{ color: 'black', fontWeight: "bold" }}>
                  FORGOT PASSWORD
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}