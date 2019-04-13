/* Funciones auxiliares ejercicio Cronometro */

//Devuelve una cadena de 2 dígitos a partir de un valor
const dosDigitos = d => (d < 10) ? '0'+ d : d

//Devuelve una cadena de 3 dígitos a parter de un valor
const tresDigitos = (d) => (d < 100) ? '0' + dosDigitos(d) : d

//Dado un timestamp, extrae las horas, minutos, segundos, ms
//como cadenas bien formadas (rellenadas con 0s)
const extraerTiemposPartes = time => {
	let date = new Date(time), //add milliseconds
		h = date.getUTCHours(),
		m = date.getUTCMinutes(),
		s = date.getUTCSeconds(),
		ms = date.getUTCMilliseconds()
	
	return {
		horas: dosDigitos(h),
		minutos: dosDigitos(m),
		segundos: dosDigitos(s),
		milisegundos: tresDigitos(ms)
	}
}

export {
	dosDigitos,
	tresDigitos,
	extraerTiemposPartes
}