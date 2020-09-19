const crearMsj = (nombre, mensaje) => {
    return {
        nombre,
        mensaje,
        fecha: new Date().getTime()
    }
}


module.exports = {
    crearMsj
}