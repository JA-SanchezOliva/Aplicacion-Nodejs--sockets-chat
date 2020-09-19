class Usuarios {

    constructor() {
        // inicializo un arreglo el cual contendra información de personas conectadas
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {

        // Creo un objeto con la información de la persona pasada por parametro a la función
        let persona = { id, nombre, sala };

        // Agrego el objeto persona al arreglo personas
        this.personas.push(persona);

        // Retorno todas las personas que se encuentran en conectadas
        return this.personas;
    }

    getPersona(id) {

        // Busco y guardo dentro de la variable persona el registro obtenido del arreglo personas
        let persona = this.personas.filter(pers => {
            return pers.id === id
        })[0];

        // Retorno la información de la persona en caso de encontrarla dentro del arreglo, retorno undefined si no se encuentra
        return persona;
    }

    getPersonas() {
        // Retorno todas las personas que se encuentran en conectadas
        return this.personas;
    }

    getPersonasPorSala(sala) {
        let personaEnSala = this.personas.filter(persona => persona.sala === sala);
        return personaEnSala;
    }

    borrarPersona(id) {

        // Busco la información de la persona a borrar por id
        let personaBorrada = this.getPersona(id);

        // Si encuentra el id, lo elimina y se actualiza el arreglo de personas conectadas
        this.personas = this.personas.filter(persona => {
            return persona.id != id;
        });

        // Retorno información de persona borrada, en caso de lo encontrar la persona, personaBorrada sera igual a undefined
        return personaBorrada;
    }

}


module.exports = {
    Usuarios
}