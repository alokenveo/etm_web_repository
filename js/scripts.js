document.querySelectorAll('.producto').forEach(producto => {
    producto.addEventListener('click', abrirVentanaEmergente);
});



//FUNCIONES DE LOS EVENTOS
function abrirVentanaEmergente() {
    document.getElementById('ventana-emergente').style.display = 'block';
}

function cerrarVentanaEmergente() {
    document.getElementById('ventana-emergente').style.display = 'none';
}
