// Vista previa de la imagen
const imagenInput = document.getElementById('imagen');
const previewImg = document.getElementById('preview-img');
const imagePreviewDiv = document.getElementById('image-preview');

imagenInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            previewImg.setAttribute('src', event.target.result);
            imagePreviewDiv.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
});

// Manejo del envío del formulario
const formProducto = document.getElementById('form-producto');
formProducto.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario

    const nuevoProducto = {
        nombre: document.getElementById('nombre').value,
        categoria: document.getElementById('categoria').value,
        precio: document.getElementById('precio').value,
        marca: document.getElementById('marca').value,
        descripcion: document.getElementById('descripcion').value,
        imagen: previewImg.src // Obtener la imagen en base64
    };

    // Guardar el producto en localStorage
    let productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    productosGuardados.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productosGuardados));

    // Reiniciar el formulario
    formProducto.reset();
    imagePreviewDiv.style.display = 'none'; // Ocultar la vista previa
    alert('Producto añadido correctamente!');
});