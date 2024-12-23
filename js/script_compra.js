// Obtener los datos del carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Mostrar el resumen del carrito
function mostrarResumenCarrito() {
  const carritoResumen = document.getElementById("carritoResumen");
  if (carrito.length === 0) {
    carritoResumen.innerHTML = "<p class='text-muted'>El carrito está vacío.</p>";
    return;
  }

  let total = 0;
  carrito.forEach(item => {
    total += item.precio * item.cantidad;
    carritoResumen.innerHTML += `
      <div class="d-flex justify-content-between">
        <span>${item.producto} (x${item.cantidad})</span>
        <span>€${(item.precio * item.cantidad).toFixed(2)}</span>
      </div>
    `;
  });

  carritoResumen.innerHTML += `
    <hr>
    <div class="d-flex justify-content-between">
      <span><strong>Total:</strong></span>
      <span><strong>€${total.toFixed(2)}</strong></span>
    </div>
  `;
}

// Llamamos a la función para mostrar el resumen
mostrarResumenCarrito();

// Manejar la confirmación de la compra
const formulario = document.getElementById("datosCliente");
formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  // Obtener los datos del formulario
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const direccion = document.getElementById("direccion").value;
  const modoPago = document.getElementById("modoPago").value;
  const tarjeta = modoPago === "tarjeta" ? document.getElementById("tarjeta").value : "";

  // Verificar que todos los campos estén completos
  if (!nombre || !email || !direccion || !modoPago || (modoPago === "tarjeta" && !tarjeta)) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Mostrar el modal de confirmación
  const modal = new bootstrap.Modal(document.getElementById("modalConfirmacion"));
  modal.show();

  // Esperar 5 segundos antes de redirigir al usuario
  setTimeout(function () {
    // Limpiar el carrito y localStorage
    localStorage.removeItem("carrito");
    carrito = [];

    // Redirigir al index
    window.location.href = "/index.html";
  }, 5000);
});
