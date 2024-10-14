document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
});




//FUNCIONES DE LOS EVENTOS
function abrirVentanaEmergente() {
    document.getElementById('ventana-emergente').style.display = 'block';
}

function cerrarVentanaEmergente() {
    document.getElementById('ventana-emergente').style.display = 'none';
}


// Función para cargar los productos en el contenedor
function cargarProductos() {
    const contenedor = document.querySelector('.productos');
    contenedor.innerHTML = '';

    // Cargar productos desde el archivo JSON
    fetch('/datos/productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            const productos = data.productos; // Acceder a la lista de productos

            productos.forEach(producto => {
                // Crear un div para cada producto
                const divProducto = document.createElement('div');
                divProducto.classList.add('mx-2');

                divProducto.classList.add('producto');
                divProducto.classList.add('col-md-3');
                divProducto.classList.add('col-sm-4');
                divProducto.classList.add('mx-sm-5');
                divProducto.classList.add('col-lg-3');

                // Crear el contenido HTML para el producto
                divProducto.innerHTML = `
                    <figure>
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                    </figure>
                    <div class="info-producto">
                        <h3>${producto.nombre}</h3>
                        <p class="price">${producto.precio}€</p>
                    </div>
                `;

                // Añadir el producto al contenedor
                contenedor.append(divProducto);

                divProducto.addEventListener('click', abrirVentanaEmergente);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
