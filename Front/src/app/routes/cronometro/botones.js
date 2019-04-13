import React from 'react'

const Botones = props => (
	<div className="actions">
		<button onClick={ props.empezar }>CONTRACIÓN</button>
		<button onClick={ props.parar }>FIN</button>
	</div>
)

export default Botones