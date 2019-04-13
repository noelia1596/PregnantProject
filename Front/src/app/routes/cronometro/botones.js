import React from 'react'

const Botones = props => (
	<div className="actions">
		<button onClick={ props.empezar }>INICIO CONTRACIÓN</button>
		<button onClick={ props.parar }>TERMINA CONTRACIÓN</button>
	</div>
)

export default Botones