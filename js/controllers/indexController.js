import { getEvento, getEventos, createEvento, actualizarEvento, deleteEvento } from "../services/eventosService.js";
import { getClientes } from "../services/clientesService.js";
import { getSalones } from "../services/salonesService.js";

const tablaEventos = document.getElementById("tablaEventos");

const idEvento = document.getElementById("idEvento");

const Cliente = document.getElementById("txtCliente");

const Salon = document.getElementById("txtSalon");

const Nombre = document.getElementById("txtNombre");

const Fecha = document.getElementById("txtFecha");

const Personas = document.getElementById("txtNumber");

const Horas = document.getElementById("txtHoras");

const Estado = document.getElementById("txtEstado");
const grupoEstado = document.getElementById("grupoEstado");

const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");
const formEventos = document.getElementById("formEventos");

async function cargarClientes() {
    try {
        const clientes = await getClientes();

        Cliente.innerHTML = `<option value="">Selecciona un cliente</option>`;

        clientes.forEach((cliente) => {
            Cliente.innerHTML += `<option value="${cliente.idCliente}">${cliente.nombre} ${cliente.apellido}</option>`;
        }
        );
    }
    catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'No se pudo obtener el listado de clientes ' + error.message,
            icon: 'error',
        }
        );
    }
}

async function cargarSalones() {
    try {
        const salones = await getSalones();

        Salon.innerHTML = `<option value="">Selecciona un salon</option>`;

        salones.forEach((salon) => {
            Salon.innerHTML += `<option value="${salon.idSalon}">${salon.nombreSalon} (Capacidad: ${salon.capacidad} - $${salon.precioRenta}/hora)</option>`;
        }
        );
    }
    catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'No se pudo obtener el listado de salones ' + error.message,
            icon: 'error',
        }
        );
    }
}

async function cargarEventos() {
    try {
        const eventos = await getEventos();

        tablaEventos.innerHTML = "";

        eventos.forEach((evento) => {
            tablaEventos.innerHTML += `
        <tr>
            <td>${evento.idEvento}</td>
            <td>${evento.nombreEvento}</td>
            <td>${evento.nombreCliente}</td>
            <td>${evento.nombreSalon}</td>
            <td>${evento.fechaEvento}</td>
            <td>${evento.cantidadPersonas}</td>
            <td>${evento.cantidadHoras}</td>
            <td>$${evento.totalPago}</td>
            <td>${evento.estado}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="borrarEvento(${evento.idEvento})">Eliminar 🗑️</button>
                <button class="btn btn-info btn-sm" onclick="colocarDatosFormulario(${evento.idEvento})">Editar ✏️</button>
            </td>
        </tr>
        `;
        }
        );
    }
    catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'No se pudo obtener el listado de eventos ' + error.message,
            icon: 'error',
        }
        );
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    await cargarClientes();
    await cargarSalones();
    await cargarEventos();
});

formEventos.addEventListener("submit", async function (e) {
    e.preventDefault();

    const id = idEvento.value.trim();
    const cliente = Cliente.value;
    const salon = Salon.value;
    const nombre = Nombre.value.trim();
    const fecha = Fecha.value;
    const personas = Personas.value.trim();
    const horas = Horas.value.trim();
    const estado = Estado.value;

    if (cliente == "" || salon == "" || nombre == "" || fecha == "" || personas == "" || horas == "") {
        Swal.fire({
            title: '¡Datos Incompletos!',
            text: 'Debes de completar todos los campos antes de proceder ',
            icon: 'warning',
        }
        );
        return;
    }

    if (!/^\d+$/.test(personas) || Number(personas) <= 0 || !/^\d+$/.test(horas) || Number(horas) <= 0) {
        Swal.fire({
            title: '¡Datos invalidos!',
            text: 'La cantidad de personas y de horas deben ser numeros enteros mayores a cero',
            icon: 'warning',
        }
        );
        return;
    }

    const evento = {
        idCliente: Number(cliente),
        idSalon: Number(salon),
        nombreEvento: nombre,
        fechaEvento: fecha,
        cantidadPersonas: Number(personas),
        cantidadHoras: Number(horas),
        estado: estado
    };

    try {
        if (id != "") {
            await actualizarEvento(id, evento);
            Swal.fire({
                title: '¡Dato actualizado!',
                text: 'Se ha actualizado correctamente',
                icon: 'info',
            }
            );
        }
        else {
            await createEvento(evento);
            Swal.fire({
                title: '¡Dato creado!',
                text: 'Se ha creado correctamente',
                icon: 'success',
            }
            );
        }
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'No se pudo guardar el evento ' + error.message,
            icon: 'error',
        }
        );
        return;
    }

    limpiarFormulario();

    await cargarEventos();
});

function limpiarFormulario() {
    formEventos.reset();
    idEvento.value = "";

    btnGuardar.textContent = " GuardarRegistro";
    btnCancelar.classList.add("d-none");
    grupoEstado.classList.add("d-none");
}

btnCancelar.addEventListener('click', limpiarFormulario);

async function colocarDatosFormulario(id) {
    try {
        const evento = await getEvento(id);

        idEvento.value = evento.idEvento;
        Cliente.value = evento.idCliente;
        Salon.value = evento.idSalon;
        Nombre.value = evento.nombreEvento;
        Fecha.value = evento.fechaEvento;
        Personas.value = evento.cantidadPersonas;
        Horas.value = evento.cantidadHoras;
        Estado.value = evento.estado;

        btnGuardar.textContent = "Actualizar";

        btnCancelar.classList.remove("d-none");
        grupoEstado.classList.remove("d-none");
    }
    catch (error) {
        Swal.fire({
            title: '¡Error!',
            text: 'No se pudieron cargar los datos del evento ',
            icon: 'error',
        }
        );
        console.error(error);
    }
}

async function borrarEvento(id) {
    const confirmar = confirm("¿Desea eliminar este evento?");

    if (!confirmar) {
        return;
    }

    try {
        await deleteEvento(id);
        Swal.fire({
            title: '¡Dato eliminado!',
            text: 'Se ha eliminado correctamente',
            icon: 'success',
        }
        );
        limpiarFormulario();
        await cargarEventos();
    }
    catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'No se pudo eliminar el evento ' + error.message,
            icon: 'error',
        }
        );
    }
}

window.borrarEvento = borrarEvento;
window.colocarDatosFormulario = colocarDatosFormulario;
