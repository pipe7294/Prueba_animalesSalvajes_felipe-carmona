class Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        this._nombre = nombre;
        this._edad = edad;
        this._imagen = img;
        this._comentarios = comentarios;
        this._sonido = sonido;
    }

    get nombre() {
        return this._nombre;
    } 
    set nombre(value) {
        this._nombre = value;
    } 
    get edad() {
        return this._edad;
    }
    set edad(value) {
        this._edad = value;
    }
    get imagen() {
        return this._imagen;
    }
    set imagen(value) {
        this._imagen = value;
    }
    get comentarios() {
        return this._comentarios;
    }
    set comentarios(value) {
        this._comentarios = value;
    }
    get sonido() {
        return this._sonido;
    }
    set sonido(value) {
        this._sonido = value;  
    } 
}   

export default Animal;