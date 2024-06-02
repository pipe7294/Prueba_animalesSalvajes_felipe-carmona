import { Leon, Perro, Lobo, Serpiente, Oso, Aguila } from "./clases/Tipos.js";


//modulo Animales
let Animales = (function () {
    const url = "http://localhost:5501/animales.json";

    // Funcion que consume la API
    const getAnimales = async function () {
        const res = await fetch(url);
        const { animales } = await res.json();
        return animales;
    };

    // El modulo retorna la funcion para que quede expuesta para se use
    return { getAnimales };
})();


// Variables globales
let imagenSrc;
let sonido;
let animales = [];

// funcion que muestra la imagen del animal seleecionado
async function mostrarAnimal(e) {
    const animalSelected = e.target.value;

    // usar modulo Animales para obtener lista de objetos 
    const animales = await Animales.getAnimales();
    console.log(animales);

    // con el metodo find, se busca el objeto que coincide con el animal seleccionado
    const animalObject = animales.find((a) => a.name == animalSelected);
    console.log(animalObject);

    // se asigna la imagen y soniudo del animal seleccionado
    imagenSrc = `/assets/imgs/${animalObject.imagen}`;
    sonido = animalObject.sonido;

    const preview = document.getElementById("preview");
    preview.parentElement.classList.remove("p-5");
    preview.style.backgroundImage = `url(${imagenSrc})`;
}

// Asociar la funcion MostraAnimal al evento change del combobox
// Es decir, cuando se seleccione un animal del comobobox se ejecutara la funcion MostrarAnimal
document.getElementById("animal").addEventListener("change", mostrarAnimal);


// Funcion resgistraAnimal
async function resgistraAnimal(e) {

    const nombreElement = document.getElementById("animal");
    const edadElement = document.getElementById("edad");
    const comentariosElement = document.getElementById("comentarios");

    const nombre = nombreElement.value;
    const edad = edadElement.value;
    const comentarios = comentariosElement.value;

    if (nombre && edad && comentarios) {
        let animal;
        switch (nombre) {
            case "Leon":
                animal = new Leon(nombre, edad, imagenSrc, comentarios, sonido);
                break;
            case "Perro":
                animal = new Perro(nombre, edad, imagenSrc, comentarios, sonido);
                break;
            case "Lobo":
                animal = new Lobo(nombre, edad, imagenSrc, comentarios, sonido);
                break;
            case "Oso":
                animal = new Oso(nombre, edad, imagenSrc, comentarios, sonido);
                break;
            case "Serpiente":
                animal = new Serpiente(nombre, edad, imagenSrc, comentarios, sonido);
                break;
            case "Aguila":
                animal = new Aguila(nombre, edad, imagenSrc, comentarios, sonido);
                break;

            default:
                animal = undefined;
                break;
        }

        nombreElement.selectedIndex = 0;
        edadElement.selectedIndex = 0;
        comentariosElement.value = "";

        document.getElementById("preview").style.backgroundImage = "url(assets/imgs/lion.svg)";
        animales.push(animal);
        console.log(animales);
        agregarAnimal();

    } else {
        alert("Debe llenar todos los datos del formulario");
    }
}

// Asociar al evento click del boton btnRegistrar la funcion  resgistraAnimal
document.getElementById("btnRegistrar").addEventListener("click", resgistraAnimal);



function agregarAnimal() {
    const animalesTemplate = document.getElementById("Animales");
    animalesTemplate.innerHTML = "";

    console.log(animales);
    animales.forEach((p, i) => {
        console.log(p);
        animalesTemplate.innerHTML += `
            <div class="px-3 pb-2">
              <div class="bg-dark text-white">
                <img
                  height="200"
                  src="${p.img}"
                  data-toggle="modal" data-target="#exampleModal"
                  onclick="modalDetails('${i}')"
                />
                <div>
                  <button onclick="playSound('${p.nombre}')" class="btn btn-secondary w-100"> <img height="30" src="assets/imgs/audio.svg" /> </button>
                </div>
              </div>
            </div>
      `;
    });
    document
        .querySelectorAll(".card-body button")
        .forEach((b) => b.addEventListener("click", activarHabiblidad));
};


// funcion global playSound()
// al usar el objeto window la funcion playSound() puede ser accedida desde  cualquier parte del sitio   
window.playSound = function (nombre) {
    const animal = animales.find((a) => a.nombre == nombre);
    console.log(animal);
    switch (nombre) {
        case "Leon":
            animal.Rugir();
            break;
        case "Perro":
            animal.Ladrar();
            break;
        case "Lobo":
            animal.Aullar();
            break;
        case "Oso":
            animal.Gruñir();
            break;
        case "Serpiente":
            animal.Sisear();
            break;
        case "Aguila":
            animal.Chillar();
            break;
        default:
            // Manejar el caso por defecto si el nombre no coincide con ningún animal conocido
            console.log(`Acción no definida para el animal ${nombre}`);
    }
};






