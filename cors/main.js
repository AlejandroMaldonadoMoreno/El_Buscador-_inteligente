const urlApi = "http://localhost:3000/api/productos";
let temporizador = null;

const campoBusqueda = document.getElementById("campoBusqueda");
const btnLimpiar = document.getElementById("btnLimpiar");
const tabla = document.getElementById("tablaProductos");
const listaProductos = document.getElementById("listaProductos");
const mensajeEstado = document.getElementById("mensajeEstado");

mostrarMensaje("Escribe algo para buscar productos...");

campoBusqueda.addEventListener("input", () => {
    const texto = campoBusqueda.value.trim();

    clearTimeout(temporizador);

    if (texto === "") {
        btnLimpiar.disabled = true;
        mensajeEstado.style.display = "block";
        mensajeEstado.textContent = "Escribe algo para buscar productos...";
        tabla.style.display = "none";
        return;
    }

    btnLimpiar.disabled = false;

    temporizador = setTimeout(() => {
        buscar(texto);
    }, 500);
});

btnLimpiar.addEventListener("click", () => {
    campoBusqueda.value = "";
    btnLimpiar.disabled = true;
    mensajeEstado.style.display = "block";
    mensajeEstado.textContent = "Escribe algo para buscar productos...";
    tabla.style.display = "none";
});

async function buscar(texto) {
    try {
        mostrarMensaje("Buscando...");
        const respuesta = await fetch(`${urlApi}/search?q=${encodeURIComponent(texto)}`);
        const datos = await respuesta.json();

        if (datos.length === 0) {
            mostrarMensaje(`No encontramos productos que coincidan con '${texto}'`);
            tabla.style.display = "none";
            return;
        }

        pintar(datos);
    } catch (error) {
        console.error("Error completo:", error);
        alert("Error al buscar");
    }
}

function pintar(productos) {
    mensajeEstado.style.display = "none";
    tabla.style.display = "table";
    listaProductos.innerHTML = "";

    productos.forEach(producto => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.descripcion || 'Sin descripción'}</td>
            <td>${producto.categoria}</td>
            <td>$${Number(producto.precio).toFixed(2)}</td>
            <td style="color: ${producto.stock < 5 ? 'red' : 'black'};">${producto.stock}</td>
        `;

        listaProductos.appendChild(fila);
    });
}

function mostrarMensaje(texto) {
    mensajeEstado.style.display = "block";
    mensajeEstado.textContent = texto;
    tabla.style.display = "none";
}
