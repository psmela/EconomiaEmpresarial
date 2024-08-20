document.getElementById("botonAgregar").addEventListener("click", function() {
    const textoTarea = document.getElementById("textoTarea").value;
    const prioridadTarea = document.getElementById("prioridadTarea").value;
    const listaTareas = document.getElementById("listaTareas");

    if (!textoTarea) return;

    const fechaCreacion = new Date();
    const tarea = document.createElement('li');
    tarea.className = `list-group-item d-flex justify-content-between align-items-center`;
    tarea.dataset.prioridad = prioridadTarea;
    tarea.dataset.fechaModificacion = fechaCreacion.toISOString();
    
    tarea.innerHTML = `
        ${textoTarea} (Prioridad: ${prioridadTarea})
        <small class="text-muted">Modificado: ${fechaCreacion.toLocaleString()}</small>
        <div>
            <button class="btn btn-sm btn-light btnEditar">Editar</button>
            <button class="btn btn-sm btn-light btnEliminar">Eliminar</button>
        </div>
    `;

    listaTareas.appendChild(tarea);
    document.getElementById("textoTarea").value = "";

    tarea.querySelector(".btnEditar").addEventListener("click", function() {
        const nuevoTexto = prompt("Editar tarea:", textoTarea);
        if (nuevoTexto) {
            tarea.dataset.fechaModificacion = new Date().toISOString();
            tarea.firstChild.textContent = `${nuevoTexto} (Prioridad: ${prioridadTarea}) `;
            tarea.querySelector(".text-muted").textContent = `Modificado: ${new Date().toLocaleString()}`;
        }
    });

    tarea.querySelector(".btnEliminar").addEventListener("click", function() {
        tarea.remove();
    });
});

document.getElementById("ordenarBoton").addEventListener("click", function() {
    const listaTareas = document.getElementById("listaTareas");
    const tareas = Array.from(listaTareas.children);
    const criterio = document.getElementById("ordenarPor").value;

    tareas.sort((a, b) => {
        if (criterio === "prioridad") {
            return a.dataset.prioridad - b.dataset.prioridad;
        } else if (criterio === "fechaModificacion") {
            return new Date(b.dataset.fechaModificacion) - new Date(a.dataset.fechaModificacion);
        }
    });

    tareas.forEach(tarea => listaTareas.appendChild(tarea));
});


