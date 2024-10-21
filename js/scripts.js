document.addEventListener('DOMContentLoaded', () => {
    cargarProductos1();
    //cargarProductos2();
});

document.getElementById('boton-hamburguesa').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'block' ? 'none' : 'block';
});


//FUNCIONES DE LOS EVENTOS
function abrirVentanaEmergente() {
    document.getElementById('ventana-emergente').style.display = 'block';
}

function cerrarVentanaEmergente() {
    document.getElementById('ventana-emergente').style.display = 'none';
}



// Función para cargar los productos en el contenedor
function cargarProductos1() {
    fetch('/cargar_productos.php')
        .then(response => response.json())
        .then(data => {
            const productosContainer = document.querySelector('.productos');
            productosContainer.innerHTML = ''; // Limpiar el contenedor de productos

            data.forEach(producto => {
                // Crear el HTML de cada producto
                const productoHTML = `
                    <div class="producto">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                        <h3>${producto.nombre}</h3>
                        <p>${producto.descripcion}</p>
                        <p>Precio: ${producto.precio} €</p>
                    </div>
                `;
                productosContainer.innerHTML += productoHTML;
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
}



function cargarProductos2() {
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
                divProducto.classList.add('producto');

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

