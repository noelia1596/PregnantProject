import React from 'react'
import IntlMessages from 'util/IntlMessages';
const Botones = props => (
	<div className="actions">
		<button onClick={props.empezar} id='sidebar.components.contraccion'> {<IntlMessages id="sidebar.components.contracciones" />}</button>
		<button onClick={props.parar} >{<IntlMessages id="sidebar.components.fin" />}</button>
	</div>
)

export default Botones