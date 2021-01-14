// Material UI components
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React, { Component } from 'react';
import { baseApiUrl } from '../../util/baseApiUrl';

const styles = (theme) => ({
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10,
  },
  progess: {
    position: 'absolute',
  },
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: [],
      loading: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post(`${baseApiUrl()}/login`, userData)
      .then((response) => {
        localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
        this.setState({
          loading: false,
        });
        this.props.history.push('/app/recipes');
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              helperText={errors.email}
              error={errors.email ? true : false}
              onChange={this.handleChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              helperText={errors.password}
              error={errors.password ? true : false}
              onChange={this.handleChange}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={this.handleSubmit}
              disabled={loading || !this.state.email || !this.state.password}
            >
              Sign In
              {loading && (
                <CircularProgress size={30} className={classes.progess} />
              )}
            </Button>
            <Grid container>
              <Grid item>
                <Link href='signup' variant='body2'>
                  {'No account? Sign Up'}
                </Link>
              </Grid>
            </Grid>
            {errors.general && (
              <Typography variant='body2' className={classes.customError}>
                {errors.general}
              </Typography>
            )}
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(Login);
