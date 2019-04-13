import React, { Component } from 'react'

import Pantalla from './pantalla'
import Botones from './botones'

import { extraerTiemposPartes } from './tiempos'

import './css.css'

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
		if ( this.state.estaCorriendo ) {
			// no hagas nada
			return
		} else {
			// empezar el cronometro
			this.setState({
				estaCorriendo: true,
				inicio: Date.now(),
				corriente: Date.now()
			})

			this._interval = setInterval(() =>{
				this.setState({
					corriente: Date.now()
				})
			}, 100)
		}
    }
    
		handleParar() {
		if ( this.state.estaCorriendo ) {
			//si esta funcionando el cronometro ponerlo a cero
			clearInterval(this._interval)
		
			this.setState({
				estaCorriendo: false

			})

			console.log( extraerTiemposPartes(this.state.corriente - this.state.inicio), 'clearIntervalllllllll');
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
			} = extraerTiemposPartes( corriente - inicio )

		return(
			<div className="crono">
			
				<Pantalla
					horas = { horas }
					minutos = { minutos }
					segundos = { segundos }
					milisegundos = { milisegundos }
				/>
				<Botones
					empezar = { this.handleEmpezar }
         	parar = { this.handleParar }
                
				/>
			</div>
		)
	}
}

App.propTypes = {}
App.defaultProps = {}

export default App
