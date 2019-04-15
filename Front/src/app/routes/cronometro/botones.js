import React from 'react'

const Botones = props => (
	<div className="actions">
		<button onClick={props.empezar} id='sidebar.components.contraccion'>CONTRACCIÓN</button>
		<button onClick={props.parar} >FIN</button>
	</div>
)

export default Botones