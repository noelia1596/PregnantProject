import React, { Component } from 'react';
import axios from 'axios';
import './css.css';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const BASE_URL = 'http://localhost:3000/';
const BACK_URL = 'http://localhost:5000/';
const USER_LOGGED_LOCAL_STORAGE = 'userLoggedLS';
var userLogged = JSON.parse(localStorage.getItem(USER_LOGGED_LOCAL_STORAGE));


class App extends Component {
  constructor(props) {
    super(props);

    userLogged = JSON.parse(localStorage.getItem(USER_LOGGED_LOCAL_STORAGE));
    this.state = {
      images: [],
      imageUrls: [],
      message: ''
    }
    this.imagenesImpresas();
  }

  selectFiles = (event) => {
    let images = [];
    for (var i = 0; i < event.target.files.length; i++) {
      images[i] = event.target.files.item(i);
    }
    images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
    let message = `${images.length} valid image(s) selected`
    this.setState({ images, message })
  }

  uploadImages = () => {
    const uploaders = this.state.images.map(image => {
      const data = new FormData();
      data.append("image", image, image.name);
      data.append('usuario', userLogged.usuario)
      console.log(image, 'image');
      // Make an AJAX upload request using Axios
      return axios.post(BASE_URL + 'uploadPictures', data)
        .then(response => {
          console.log('nos responde', response)
          this.setState({ imageUrls: [response.data.imageUrl, ...this.state.imageUrls] });
          console.log('state', this.state.imageUrls)
          //this.imagenesImpresas();
        })
    });
    axios.all(uploaders).then(() => {
      console.log('done');
    }).catch(err => alert(err.message));
  }



  imagenesImpresas = () => {
    const url = "http://localhost:3000/imprimirImagenes/";
    fetch(url, {
      method: 'GET',
      headers: { usuario: userLogged.usuario },
    })
      .then(response => response.json())
      .then((repos) => {
        console.log('respuesta', repos);
        this.setState({ imageUrls: [] })
        repos.map((e) => { this.setState({ imageUrls: [e.id, ...this.state.imageUrls] }); })

        console.log(repos.length);
      });
  }
  render() {
    return (
      <div>

        <br />
        <div className="col-sm-12">
          <div className="col-sm-4">
            <input className="form-control " type="file" onChange={this.selectFiles} multiple />
          </div>
          {this.state.message ? <p className="text-info">{this.state.message}</p> : ''}
          <br />
          <div className="col-sm-4">
            <CloudUploadIcon value="Submit" onClick={this.uploadImages} />
            {/*<button className="btn btn-primary" value="Submit" onClick={this.uploadImages}>Submit</button>*/}
          </div>
        </div>
        <br /><br />


        <div class="row">
          <div class="col-xs-12">
            <div className="container" class="float-left">
              {
                this.state.imageUrls.map((url, i) => (
                  <img class='contenedor' src={BACK_URL + 'images/uploads/' + url} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App; 			