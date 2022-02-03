import React, { useState } from 'react';
import { foo } from '/pages/globals';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RouteLink from 'next/link';
import router, {useRouter} from 'next/router';
import * as RADFX_API from '@radfx-api'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {

  console.log(foo);
  const classes = useStyles();

  const [user, setUser] = useState({ username: '', password: '' });
  const [is_valid, setIsValid] = useState({
    username: false,
    password: {
      contains_number: false,
      min_length: false,
      contains_special_character: false,
      contains_upper_character: false,
    },
  });

  

  async function loginUser(e) {
    //console.log(user)
    e.preventDefault();
    const params = user;
    const result = await RADFX_API.login(params);
    //console.log(result)
    if(result.status == 200 && result.data[0] == "admin"){
      //localStorage.setItem('token', result.data.access_token)
      
      router.push("integrator");
    } else {
      alert('Login Failed.')
    }
  }

  const onChangeHandler = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setUser({ ...user, [name]: value });
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="username"
            autoComplete="email"
            value = {user.username}
            onChange={(e) => onChangeHandler(e)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value = {user.password}
            onChange={(e) => onChangeHandler(e)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={loginUser}
            >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
            <RouteLink as={`/sign-up`} href="sign-up">
              <Link href="" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
              </RouteLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}