//Cargar el header y el footer en todas las páginas
async function incluirHTML() {
  try {
    console.log("Cargando header y footer...");
    const header = await fetch("/html/header.html");
    const footer = await fetch("/html/footer.html");
    document.getElementById("header").innerHTML = await header.text();
    document.getElementById("footer").innerHTML = await footer.text();
    console.log("Header y footer cargados.");

    // Llamar a cargarCarrito después de cargar el contenido
    cargarCarrito();
  } catch (error) {
    console.error("Error cargando el contenido:", error);
  }
}

incluirHTML();

/* FILTRADO DE PRODUCTOS */
function aplicarCategorias() {
  // Obtener las categorías seleccionadas
  const categoriasSeleccionadas = [];
  const checkboxes = document.querySelectorAll(
    '#categoriasForm input[type="checkbox"]:checked'
  );
  checkboxes.forEach((checkbox) => {
    categoriasSeleccionadas.push(checkbox.value);
  });

  // Si no hay categorías seleccionadas, mostrar todos los productos
  if (categoriasSeleccionadas.length === 0) {
    mostrarProductos(window.productos);
  } else {
    // Filtrar los productos según las categorías seleccionadas
    const productosFiltrados = window.productos.filter((producto) =>
      categoriasSeleccionadas.includes(producto.categoria)
    );

    // Mostrar los productos filtrados
    mostrarProductos(productosFiltrados);
  }

  // Cerrar el modal
  const modal = new bootstrap.Modal(document.getElementById("categoriasModal"));
  modal.hide();
}

/* GESTIÓN DE COMPRA */
let carrito = [];

// Añadir productos al carrito
function anadirAlCarrito(producto, precio, cantidad) {
  const productoExistente = carrito.find((item) => item.producto === producto);
  if (productoExistente) {
    productoExistente.cantidad += cantidad;
  } else {
    carrito.push({ producto, precio, cantidad });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  actualizarCarrito();
}

// Actualizar el contenido del carrito
function actualizarCarrito() {
  const carritoContenido = document.getElementById("carritoContenido");
  const totalCarrito = document.getElementById("totalCarrito");
  carritoContenido.innerHTML = ""; // Limpiar contenido anterior

  let total = 0;

  if (carrito.length === 0) {
    carritoContenido.innerHTML =
      '<p class="text-muted text-center">El carrito está vacío</p>';
  } else {
    carrito.forEach((item, index) => {
      total += item.precio * item.cantidad; // Calcular el total considerando la cantidad

      const productoDiv = document.createElement("div");
      productoDiv.classList.add(
        "d-flex",
        "justify-content-between",
        "align-items-center",
        "mb-2"
      );
      productoDiv.innerHTML = `
                  <span>${item.producto} (x${item.cantidad})</span>
                  <span>€${(item.precio * item.cantidad).toFixed(2)}</span>
                  <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${index})">Eliminar</button>
              `;
      carritoContenido.appendChild(productoDiv);
    });
  }

  totalCarrito.textContent = `€${total.toFixed(2)}`;
}

// Eliminar productos del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Finalizar compra
function finalizarCompra() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  window.location.href = "/html/compra.html";
}

// Vaciar el carrito
function vaciarCarrito() {
  carrito = []; // Vaciar el array del carrito
  localStorage.removeItem("carrito"); // Opcional: vaciar el carrito en localStorage
  actualizarCarrito(); // Actualizar el contenido del carrito en la interfaz
}

// Recuperar el carrito desde localStorage
function cargarCarrito() {
  const carritoGuardado = localStorage.getItem("carrito");
  console.log("Recuperando carrito: " + carritoGuardado);
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }
  actualizarCarrito();
}
