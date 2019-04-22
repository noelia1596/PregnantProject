import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DatePickers from '../date/DatePickers';
import request from 'request';
import { Redirect } from 'react-router-dom';
import {
  showAuthLoader,
  userSignUp,
} from 'actions/Auth';
import { connect } from 'react-redux';


class FormSignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      activeStep: 0,
      heAcabado: false,
      datos: null

    };
    this.handleChange = this.handleChange.bind(this)

  }

  getSteps() {
    return ['Account Information', 'Mom Information', 'Dad Information', 'Confirm and Finish'];
  }


  getAccountInformation() {

    return <div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <TextField
              onChange={this.handleChange}
              id="userName"
              name='usuario'
              label="UserName"
              margin="normal"
              fullWidth
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <TextField
              onChange={this.handleChange}
              id="password"
              name='password'
              label="Password"
              type="password"
              autoComplete="current-password"
              margin="normal"
              fullWidth
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <TextField
              onChange={this.handleChange}
              id="confirmPassword"
              name='confirmPassword'
              label="Confirm Password"
              type="password"
              autoComplete="current-password"
              margin="normal"
              fullWidth
            />
          </div>
        </div>
      </div>
    </div>
  }

  getMomInformation() {
    return <div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <TextField
              onChange={this.handleChange}
              id="NameMom"
              name='Nombre'
              label="Name"
              margin="normal"
              fullWidth
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <TextField
              onChange={this.handleChange}
              id="SurnameMom"
              name='Apellidos'
              label="Surname"
              margin="normal"
              fullWidth
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <span>Fecha Nacimiento</span>
            <DatePickers
              onBlur={this.handleChange}
              name='FechaNacimientoMama'
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <span>Fecha Embarazo</span>
            <DatePickers
              name='FechaEmbarazo'
              onBlur={this.handleChange}

            />
          </div>
        </div>
      </div>
    </div>

  }

  getDadInformation() {
    return <div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <TextField
              onChange={this.handleChange}
              name='NombrePadre'
              id="NameDad"
              label="Name"
              margin="normal"
              fullWidth
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <TextField
              onChange={this.handleChange}
              name='ApellidosPadre'
              id="SurnameDad"
              label="Surname"
              margin="normal"
              fullWidth
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <span>Fecha Nacimiento</span>
            <DatePickers
              onBlur={this.handleChange}
              name="FechaNacimientoPadre"
            />
          </div>
        </div>
      </div>
    </div>
  }

  getConfirmation() {
    return <div className="tab-pane" id="tab2-4">
      <h3 className="title text-primary">Form completed successfully</h3>
    </div>
  }
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return this.getAccountInformation();
      case 1:
        return this.getMomInformation();
      case 2:
        return this.getDadInformation();
      case 3:
        return this.getConfirmation();

      default:
        return 'Uknown stepIndex';
    }
  }


  handleNext = () => {
    const { activeStep } = this.state;
    const nextStep = activeStep + 1;
    if (nextStep === this.getSteps().length) {
      this.handleSubmit();
    }
    this.setState({
      activeStep: nextStep,
    });
  };

  handleChange(e) {
    const n = e.target.name; //en n me guardas el contenido que tiene name
    const valor = e.target.value;
    this.setState({
      [n]: valor //en n me pones el valor
    })
  };


  handleSubmit = e => {
    const url = "http://localhost:3000/apiRegistrarse";
    const self = this;
    const body = this.getSteps()
    request.post(url, { form: self.state },
      function optionalCallback(err, httpResponse, body) {
        if (err) {
          return console.error('upload failed:', err);
        }
        self.props.showAuthLoader();
        let usr = JSON.parse(httpResponse.body);
        self.setState({
          userLogged: usr
        });
      });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const steps = this.getSteps();
    const { activeStep } = this.state;
    if (this.state.heAcabado) {
      return <div> Holaa</div>
    }
    if (this.state.userLogged) {
      return <Redirect to={{ pathname: '/app/home', userLogged: this.state.userLogged }} />;
    }
    return (
      <div className="w-100">
        <Stepper activeStep={activeStep} alternativeLabel className="horizontal-stepper-linear">
          {steps.map((label, index) => {
            return (
              <Step key={label} className={`horizontal-stepper ${index === activeStep ? 'active' : ''}`}>
                <StepLabel className="stepperlabel">{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className="my-2">
                All steps completed
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
              <div>
                {this.getStepContent(activeStep)}
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className="mr-2"
                  >
                    Back
                </Button>
                  <Button variant="contained" color="primary" onClick={this.handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { loader, alertMessage, showMessage, authUser } = auth;
  return { loader, alertMessage, showMessage, authUser }
};

export default connect(mapStateToProps, {
  userSignUp,
  showAuthLoader,
})(FormSignUp);