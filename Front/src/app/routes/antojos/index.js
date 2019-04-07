import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IntlMessages from 'util/IntlMessages';
import DatePickers from '../components/routes/date/DatePickers';
import request from 'request';
import { Redirect } from 'react-router-dom';
import {
  showAuthLoader,
  userSignUp,
} from 'actions/Auth';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import {Route} from 'react-router-dom';
import Table from './tabla';

const USER_LOGGED_LOCAL_STORAGE = 'userLoggedLS';
const userLogged = JSON.parse(localStorage.getItem(USER_LOGGED_LOCAL_STORAGE));


class FormSignUp extends React.Component {
  constructor(){

    super();
    this.state = {
      activeStep: 0,
      usuario: userLogged.usuario,
      todos :[],
      value : ""
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleGetAntojos();
  }

  getSteps() {
    return ['NameofCravings', 'TypeofCraving', 'DateofCraving', 'TimesofCraving', 'WhoGavetheWhim'];
  }
  
  
  NameofCravings() {
    return <div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <TextField
              onChange={this.handleChange}
              name='NombreAntojo'
              id="NameofCravings"
              label="Name of Cravings"
              margin="normal"
              fullWidth
            />
          </div>
        </div> 
      </div>
    </div>
  }
  
  TypeofCraving() {
    return <div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <TextField
              onChange={this.handleChange}
              name='TipoDeAntojo'
              id="TypeofCraving"
              label="Type of Cravings"
              margin="normal"
              fullWidth
            />
          </div>
        </div> 
      </div>
    </div>    
  }

  DateofCraving() {
    return <div>
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
        <span>Fecha </span>
          <DatePickers
            onBlur={this.handleChange}
            name='FechaAntojo'
          />
        </div>
      </div> 
    </div>
  </div>   
  }

  TimesofCraving() {
    return <div>
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <TextField
            onChange={this.handleChange}
            name='VecesAntojo'
            id="TimesofCraving"
            label="Times of Craving"
            margin="normal"
            fullWidth
          />
        </div>
      </div> 
    </div>
  </div>  
  }
  
  WhoGavetheWhim() {
    return <div>
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <TextField
            onChange={this.handleChange}
            name='aQuienDio'
            id="WhoGavetheWhim"
            label="Who Gave the Whim"
            margin="normal"
            fullWidth
    
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
        <Checkbox color="primary"/> <span>I agree with the Terms and Conditions.</span>
      </div>
    </div>
  }
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return this.NameofCravings();
      case 1:
        return this.TypeofCraving();
      case 2:
        return this.DateofCraving();
      case 3:
        return this.TimesofCraving();
      case 4:
        return this.WhoGavetheWhim();
      default:
        return 'Uknown stepIndex';
    }
  }


    
  handleSubmit = () => {
    const url = "http://localhost:3000/apiInsertarAntojo";
    const self = this;
    //const body = this.getSteps()
    console.log(self.state);
    request.post(url,{form:self.state},
      function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      self.handleGetAntojos();
      self.handleReset();
    });    
    console.log('acabo el submit'); 
    
  };


  handleGetAntojos = () => {
    const url = "http://localhost:3000/api-verAntojos/";
    const {antojos} = this.state
    fetch(url, {
      method : 'GET',
      headers : {username: userLogged.usuario},
    }
    )
    .then(response => response.json())
    .then((repos) => {
        console.log(repos);
        console.log(repos.length);
        var obSubmitEditing = this.onAddTodo
        //const {repos} =this.state;
        if (!repos) return;
        obSubmitEditing(repos);
        this.setState({repos : ""});
      }); 
  };

  onAddTodo = (text) => {
    const {todos} = this.state

    this.setState({
      todos: text,
    })
  }

  
  handleDeleteCraving = (arraySelected) => {
    console.log(arraySelected, 'arraySelected');
    const url = "http://localhost:3000/apiBorrarAntojo";
    const self = this;
    const arraySelectedString = JSON.stringify(arraySelected);
    request.post(url,{form:{arraySelect: arraySelectedString}},
      function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('handleDeleteCraving:err', err);
      }
      self.handleGetAntojos();
      console.log('DeleteCraving',httpResponse);
    });    
  };


  handleNext = () => {
    const {activeStep} = this.state;
    const nextStep = activeStep + 1;
    if (nextStep === this.getSteps().length) {
      this.handleSubmit();
    }
    this.setState({
      activeStep: nextStep,
    });
  };

  handleChange (e) {
    const n = e.target.name; //en n me guardas el contenido que tiene name
    const valor = e.target.value;
    this.setState({
      [n]: valor //en n me pones el valor
    })
  };

  
    
  handleBack = () => {
    const {activeStep} = this.state;
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
    const {activeStep} = this.state;
    const {todos} = this.state;
    const {value} = this.state;
    //const {antojos} = this.state
    return (
      <div className="w-100">
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
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
        <Table 
        list = {todos}
        onClickItem = {this.handleGetAntojos}
        deleteCraving = {this.handleDeleteCraving}
        />


        { /*<Table antojos={this.state.antojos}/>*/ }
      </div>
    );
  }
}




export default FormSignUp;

