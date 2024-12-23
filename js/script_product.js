document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/objetos/productos.json"); // Ruta al JSON
    const productos = await response.json();

    // Obtener el parámetro del producto desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productoId = urlParams.get("producto");

    if (!productoId) {
      mostrarError("Producto no especificado.");
      return;
    }

    // Buscar el producto en el JSON usando el ID
    const producto = productos.find((prod) => {
      const idProducto = prod.titulo
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      return idProducto === productoId;
    });

    if (!producto) {
      mostrarError("Producto no encontrado.");
      return;
    }

    // Rellenar los datos en la página
    document.getElementById("producto-imagen").src = producto.imagen;
    document.getElementById("producto-imagen").alt = producto.titulo;
    document.getElementById("producto-titulo").textContent = producto.titulo;
    document.getElementById("producto-descripcion").textContent =
      producto.descripcion;
    document.getElementById("producto-precio").textContent = producto.precio;
  } catch (error) {
    console.error("Error cargando el producto:", error);
    mostrarError("Error cargando los datos del producto.");
  }
});

// Función para mostrar errores
function mostrarError(mensaje) {
  const detalleSeccion = document.getElementById("producto-detalle");
  detalleSeccion.innerHTML = `
      <div class="text-center">
        <h3>${mensaje}</h3>
        <a href="/index.html" class="btn btn-primary">Volver al inicio</a>
      </div>
    `;
}

// Referencias a los elementos
const cantidadEl = document.getElementById("cantidad");
const quitarBtn = document.getElementById("quitar-btn");
const añadirBtn = document.getElementById("añadir-btn");
const añadirCompraBtn = document.getElementById("añadir-compra-btn");

// Variable para la cantidad
let cantidad = 0;

// Event listeners
añadirBtn.addEventListener("click", () => {
  cantidad++;
  actualizarCantidad();
});

quitarBtn.addEventListener("click", () => {
  if (cantidad > 0) {
    cantidad--;
    actualizarCantidad();
  }
});

añadirCompraBtn.addEventListener("click", () => {
  var cantidad = parseInt(document.getElementById("cantidad").innerText, 10);
  if (cantidad > 0) {
    var productoTitulo = document.getElementById("producto-titulo").innerText;
    var productoPrecio = parseFloat(
      document
        .getElementById("producto-precio")
        .innerText.replace("€", "")
        .replace(",", ".")
    );

    anadirAlCarrito(productoTitulo, productoPrecio, cantidad);

    window.location.href = "/index.html";
  } else {
    alert("Por favor, selecciona al menos un producto.");
  }
});

// Actualizar la cantidad mostrada
function actualizarCantidad() {
  cantidadEl.textContent = cantidad;
}
