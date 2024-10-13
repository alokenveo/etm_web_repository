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

    console.log("Guardando producto...");

    // Guardar el producto en localStorage
    let productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    productosGuardados.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productosGuardados));

    console.log("Producto guardado en localStorage:", nuevoProducto);

    // Guardar el producto en el archivo JSON
    fetch('/datos/productos.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ producto: nuevoProducto })
    })

    console.log("Producto guardado en el archivo JSON:", nuevoProducto);

    // Reiniciar el formulario
    formProducto.reset();
    imagePreviewDiv.style.display = 'none'; // Ocultar la vista previa
    alert('Producto añadido correctamente!');
});