import React, {useState} from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm, Controller } from 'react-hook-form';
import { useUser } from '../../context/user';
import * as yup from 'yup';
import { history } from '../..';

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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: 'red'
  }
}));

const AddUser = () => {
  const { methods: { addUser, isAdmin } } = useUser();
  const { data: { currentUser } } = useUser();
  const [role, setRole] = useState('user');

  let validationAddUser = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
    role: yup.string().optional(),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }
  
  const { handleSubmit, control, errors } = useForm({
    validationSchema: validationAddUser,
    defaultValues
  });

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const submit = (values) => {
    if (isAdmin()) {
      values.role = role;
    }
    addUser(values);
  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add User
        </Typography>
        <form onSubmit={handleSubmit(submit)} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                id="firstName"
                control={control}
                as={
                  <TextField
                    type="text"
                    variant="outlined"
                    label="First Name"
                    fullWidth
                  />
                }>
              </Controller>
              <p className={classes.error}>{errors.firstName && errors.firstName.message}</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                id="lastName"
                control={control}
                as={
                  <TextField
                    type="text"
                    variant="outlined"
                    label="Last Name"
                    fullWidth
                  />
                }>
              </Controller>
              <p className={classes.error}>{errors.lastName && errors.lastName.message}</p>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                id="email"
                control={control}
                as={
                  <TextField
                    type="email"
                    variant="outlined"
                    fullWidth
                    label="Email Address"
                  />
                }
              ></Controller>
              <p className={classes.email}>{errors.email && errors.email.message}</p>  
            </Grid>
            {currentUser.info.role === 'admin' ?
              <Grid item xs={12}>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="role"
                  fullWidth
                  value={role}
                  onChange={handleRoleChange}
                >
                  <MenuItem value={'manager'}>Manager</MenuItem>
                  <MenuItem value={'user'}>Regular User</MenuItem>
                </Select>
              </FormControl>
              <p className={classes.error}>{errors.role && errors.role.message}</p>
            </Grid> : null }
            <Grid item xs={12}>
              <Controller
                name="password"
                id="password"
                control={control}
                as={
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Password"
                    type="password"
                  />
                }
              ></Controller>
              <p className={classes.password}>{errors.password && errors.password.message}</p>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add User
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link onClick={() => history.push('/user')} variant="body2">
                Back to User Page
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default AddUser;