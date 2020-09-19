const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMsj } = require('../utilities/utilities');


let usuarios = new Usuarios();

io.on('connection', (client) => {


    client.on('entrarChart', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                err: true,
                mensaje: 'El nombre/sala son necesarios'
            });
        }

        client.join(data.sala);

        usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));

        callback(usuarios.getPersonasPorSala(data.sala));
    });

    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);
        let msj = crearMsj(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', msj);
    });


    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMsj('Administrador', `${personaBorrada.nombre } salió`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));

    });

    client.on('mensajePrivado', data => {

        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMsj(persona.nombre, data.mensaje));

    });

});