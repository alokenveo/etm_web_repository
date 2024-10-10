// Clase Persona
class Persona {
    constructor(nombre, edad, sexo, continente) {
        this.nombre = nombre;
        this.edad = edad;
        this.sexo = sexo; // 'h' o 'm'
        this.continente = continente; // 'africa', 'europa', etc.
    }

    crearElemento() {
        const div = document.createElement('div');
        div.classList.add('persona');
        div.setAttribute('data-sexo', this.sexo);
        div.setAttribute('data-continente', this.continente);
        div.textContent = `${this.nombre} (${this.edad} años) - ${this.sexo === 'h' ? 'Hombre' : 'Mujer'} - ${this.continente}`;
        return div;
    }
}

// Crear un array de personas
const personas = [
    new Persona('Juan', 30, 'h', 'africa'),
    new Persona('Ana', 25, 'm', 'europa'),
    new Persona('Mike', 40, 'h', 'norteamerica'),
    new Persona('Laura', 35, 'm', 'suramerica'),
    new Persona('Yuki', 20, 'm', 'asia'),
    new Persona('Liam', 28, 'h', 'oceania'),
];

// Añadir personas al DOM
const contenedorPersonas = document.querySelector('.personas');
personas.forEach(persona => {
    contenedorPersonas.appendChild(persona.crearElemento());
});

// Función para filtrar personas
function filtrarPersonas() {
    const filtros = document.querySelectorAll('.filter');
    const personasDivs = document.querySelectorAll('.persona');

    const sexosSeleccionados = Array.from(filtros)
        .filter(filtro => filtro.checked && (filtro.value === 'h' || filtro.value === 'm'))
        .map(filtro => filtro.value);

    const continentesSeleccionados = Array.from(filtros)
        .filter(filtro => filtro.checked && !['h', 'm'].includes(filtro.value))
        .map(filtro => filtro.value);

    personasDivs.forEach(personaDiv => {
        const sexo = personaDiv.getAttribute('data-sexo');
        const continente = personaDiv.getAttribute('data-continente');

        if ((sexosSeleccionados.length === 0 || sexosSeleccionados.includes(sexo)) &&
            (continentesSeleccionados.length === 0 || continentesSeleccionados.includes(continente))) {
            personaDiv.style.display = ''; // Muestra la persona
        } else {
            personaDiv.style.display = 'none'; // Oculta la persona
        }
    });
}

// Añade evento de cambio a cada checkbox
document.querySelectorAll('.filter').forEach(filtro => {
    filtro.addEventListener('change', filtrarPersonas);
});
