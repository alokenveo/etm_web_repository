// Función para cargar productos desde el JSON
async function cargarProductos() {
  try {
    const response = await fetch("objetos/productos.json"); // Ruta al JSON
    const productos = await response.json();

    // Almacenar los productos globalmente para que puedan ser usados al aplicar filtros
    window.productos = productos;

    // Mostrar todos los productos inicialmente
    mostrarProductos(productos);
  } catch (error) {
    console.error("Error cargando los productos:", error);
  }
}

// Función para mostrar los productos filtrados en la página
function mostrarProductos(productos) {
  const contenedor = document.getElementById("productos-container");
  contenedor.innerHTML = ""; // Limpiar el contenido previo

  if (productos.length === 0) {
    contenedor.innerHTML =
      '<p class="text-muted text-center w-100">No hay productos disponibles para esta categoría.</p>';
    return;
  }

  productos.forEach((producto) => {
    // Crear un identificador único para el producto (basado en el título, sin espacios ni caracteres especiales)
    const idProducto = producto.titulo
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    // Crear estructura de producto con Bootstrap
    const productoHTML = `
      <div class="col">
        <div class="card h-100">
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
          <div class="card-body text-center">
            <h4 class="card-title fs-5">${producto.titulo}</h4>
            <p class="card-text text-muted">${producto.descripcion}</p>
            <a href="/html/producto.html?producto=${idProducto}" class="btn btn-sm btn-primary">Ver más</a>
          </div>
        </div>
      </div>
    `;

    // Añadir producto al contenedor
    contenedor.innerHTML += productoHTML;
  });
}

// Llamar a la función cuando se cargue la página
document.addEventListener("DOMContentLoaded", cargarProductos);
