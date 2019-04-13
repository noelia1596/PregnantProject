import React from 'react'

const Pantalla = props => (
	<div className="timer">
		<span className="timer-h">{ props.horas }</span>
		<span className="timer-m">:{ props.minutos }</span>
		<span className="timer-s">: { props.segundos }</span>
		<span className="timer-ms">: { props.milisegundos }</span>
	</div>
)

export default Pantalla