// Función para cargar productos desde el JSON
async function cargarProductos() {
  try {
    const response = await fetch("objetos/productos.json"); // Ruta al JSON
    const productos = await response.json();

    const contenedor = document.getElementById("productos-container");

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
  } catch (error) {
    console.error("Error cargando los productos:", error);
  }
}

// Llamar a la función cuando se cargue la página
document.addEventListener("DOMContentLoaded", cargarProductos);
