import React, { Component } from 'react'

import Pantalla from './pantalla'
import Botones from './botones'
import moment from 'moment'

import { extraerTiemposPartes } from './tiempos'

import './css.css'
import request from 'request';

const USER_LOGGED_LOCAL_STORAGE = 'userLoggedLS';
const userLogged = JSON.parse(localStorage.getItem(USER_LOGGED_LOCAL_STORAGE));

class App extends Component {
	constructor(...props) {
		super(...props)

		this.state = {
			estaCorriendo: false,
			inicio: 0,
			corriente: 0
		}

		this.handleEmpezar = this.handleEmpezar.bind(this)
		this.handleParar = this.handleParar.bind(this)
	}

	handleEmpezar() {
		if (this.state.estaCorriendo) {
			// no hagas nada
			return
		} else {
			// empezar el cronometro
			this.setState({
				estaCorriendo: true,
				inicio: Date.now(),
				corriente: Date.now()
			})

			this._interval = setInterval(() => {
				this.setState({
					corriente: Date.now()
				})
			}, 100)
		}
	}


	guardarContracion = () => {

		const url = "http://localhost:3000/apiGuardarTiempos";
		const momentInicio = moment(this.state.inicio).format('YYYY-MM-DD HH:mm:ss');
		const momentFinal = moment(this.state.corriente).format('YYYY-MM-DD HH:mm:ss');
		request.post(url, { form: { usuario: userLogged.usuario, inicio: momentInicio, final: momentFinal } },
			function optionalCallback(err, httpResponse, body) {
				if (err) {
					return console.error('upload failed:', err);
				}
			});
		console.log('acabo el submit');
		console.log(momentInicio, momentFinal);
	}


	handleParar() {
		if (this.state.estaCorriendo) {
			//si esta funcionando el cronometro ponerlo a cero
			clearInterval(this._interval)

			this.setState({
				estaCorriendo: false

			})
			this.guardarContracion();
			console.log(extraerTiemposPartes(this.state.corriente - this.state.inicio), 'clearIntervalllllllll');
		} else {
			// poner a cero el cronometro(si le damos de nuevo al boton, ya me lo poner a cero)
			this.setState({
				inicio: 0,
				corriente: 0
			})
		}
	}

	render() {

		const { inicio, corriente } = this.state,
			{
				horas,
				minutos,
				segundos,
				milisegundos
			} = extraerTiemposPartes(corriente - inicio)

		return (
			<div className="crono">

				<Pantalla
					horas={horas}
					minutos={minutos}
					segundos={segundos}
					milisegundos={milisegundos}
				/>
				<Botones
					empezar={this.handleEmpezar}
					parar={this.handleParar}

				/>
			</div>
		)
	}
}

App.propTypes = {}
App.defaultProps = {}

export default App
