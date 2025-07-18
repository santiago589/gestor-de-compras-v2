document.addEventListener("DOMContentLoaded", () => {
  const productoInput = document.getElementById("producto");
  const cantidadInput = document.getElementById("cantidad");
  const precioInput = document.getElementById("precio");
  const agregarBtn = document.getElementById("agregar");
  const lista = document.getElementById("lista");
  const totalDisplay = document.getElementById("total");

  let total = 0;

  // Permitir "Enter" para saltar de un input a otro
  productoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      cantidadInput.focus();
    }
  });

  cantidadInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      precioInput.focus();
    }
  });

  precioInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      agregarItem();
    }
  });

  agregarBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Evita recargar la página
    agregarItem();
  });

  function agregarItem() {
    const producto = productoInput.value.trim();
    const cantidad = parseInt(cantidadInput.value) || 1;
    const precio = parseFloat(precioInput.value);

    if (!producto || isNaN(cantidad) || isNaN(precio)) return;

    const subtotal = precio * cantidad;
    total += subtotal;

    const item = document.createElement("div");
    item.className = "item";
    item.innerHTML = `
      <span><strong>${producto}</strong> × ${cantidad}</span>
      <span>$${subtotal.toLocaleString()}</span>
      <button class="eliminar" title="Eliminar">x</button>
    `;

    // Estilo para que la "x" sea pequeña
    item.querySelector(".eliminar").style.fontSize = "0.7rem";

    // Función para eliminar el producto
    item.querySelector(".eliminar").addEventListener("click", () => {
      total -= subtotal;
      item.remove();
      totalDisplay.textContent = `Total: $${total.toLocaleString()}`;
    });

    lista.appendChild(item);
    totalDisplay.textContent = `Total: $${total.toLocaleString()}`;

    // Limpiar los inputs
    productoInput.value = "";
    cantidadInput.value = "1";
    precioInput.value = "";
    productoInput.focus();
  }
});


