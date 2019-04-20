import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IntlMessages from 'util/IntlMessages';
import DatePickers from '../date/DatePickers';
import request from 'request';
import { Redirect } from 'react-router-dom';
import {
  showAuthLoader,
  userSignUp,
} from 'actions/Auth';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';

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
              label={<IntlMessages id="appModule.password" />}
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
      <h3 className="title text-primary">Terms and Conditions</h3>
      <p><strong>Lorem</strong> Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
        into electronic typesetting, remaining essentially unchanged.</p>
      <div className="d-flex align-items-center">
        <Checkbox color="primary" /> <span>I agree with the Terms and Conditions.</span>
      </div>
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
        console.log('Upload successful!  Server responded with:', httpResponse);
        self.props.showAuthLoader();
        //self.props.userSignUp(httpResponse.body);
        //self.props.authUser=httpResponse.body;
        let usr = JSON.parse(httpResponse.body);
        //console.log('usr',usr);
        //self.props.userSignUp(usr.username+'@'+'preg'+'.com', usr.password);
        console.log('usr', usr);

        self.setState({
          userLogged: usr
        });
      });

    console.log('acabo el submit');


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
    if (this.state.userLogged != null) {
      console.log('Mandamos token ', this.state.userLogged)
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
                All steps completed - you&quot;re finished
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


//export default FormSignUp;
export default connect(mapStateToProps, {
  userSignUp,
  showAuthLoader,
})(FormSignUp);