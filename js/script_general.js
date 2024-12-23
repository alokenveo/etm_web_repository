//Cargar el header y el footer en todas las páginas
async function incluirHTML() {
    try {
      const header = await fetch('/html/header.html');
      const footer = await fetch('/html/footer.html');
      document.getElementById('header').innerHTML = await header.text();
      document.getElementById('footer').innerHTML = await footer.text();
    } catch (error) {
      console.error("Error cargando el contenido:", error);
    }
  }
  
  incluirHTML();