import { getCliente, getClientes, createCliente, actualizarCliente, deleteCliente } from '../services/clientesService.js';

const tablaClientes = document.getElementById("tablaClientes");

const idCliente = document.getElementById("idCliente");

const Nombre = document.getElementById("txtNombre");

const Apellido = document.getElementById("txtApellido");

const Telefono = document.getElementById("txtTelefono");

const Email = document.getElementById("txtEmail");

const Direccion = document.getElementById("txtDireccion");

const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");
const formClientes = document.getElementById("formClientes");

async function cargarClientes() {
  try {
    const clientes = await getClientes();

    tablaClientes.innerHTML = "";

    clientes.forEach((cliente) => {
      tablaClientes.innerHTML += `
      <tr>
        <td>${cliente.idCliente}</td>
        <td>${cliente.nombre}</td>
        <td>${cliente.apellido}</td>
        <td>${cliente.telefono}</td>
        <td>${cliente.email}</td>
        <td>${cliente.direccion ?? ""}</td>
        <td>
        <button class="btn btn-danger btn-sm" onclick="borrarCliente(${cliente.idCliente})">Borrar 🗑</button>
        <button class="btn btn-info btn-sm" onclick="colocarDatosFormulario(${cliente.idCliente})">editar ✏️</button>
        </td>
      </tr>
      `;
    }
    );
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: 'No se pudo obtener el listado de clientes ' + error.message,
      icon: 'error',
    }
    );
  }
}

document.addEventListener("DOMContentLoaded", cargarClientes);

formClientes.addEventListener("submit", async function (e) {
  e.preventDefault();

  const id = idCliente.value.trim();
  const nombre = Nombre.value.trim();
  const apellido = Apellido.value.trim();
  const telefono = Telefono.value.trim();
  const email = Email.value.trim();
  const direccion = Direccion.value.trim();

  if (nombre == "" || apellido == "" || telefono == "" || email == "") {
    Swal.fire({
      title: '¡Datos Incompletos!',
      text: 'Nombre, Apellido, Telefono y Email son obligatorios',
      icon: 'warning',
    }
    );
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    Swal.fire({
      title: '¡Email invalido!',
      text: 'Debes ingresar un email con un formato valido',
      icon: 'warning',
    }
    );
    return;
  }

  const cliente = {
    nombre: nombre,
    apellido: apellido,
    telefono: telefono,
    email: email,
    direccion: direccion
  };

  try {
    if (id != "") {
      await actualizarCliente(id, cliente);
      Swal.fire({
        title: '¡Dato actualizado!',
        text: 'Se ha actualizado correctamente',
        icon: 'info',
      }
      );
    }
    else {
      await createCliente(cliente);
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
      text: 'No se pudo guardar el cliente ' + error.message,
      icon: 'error',
    }
    );
    return;
  }

  limpiarFormulario();

  await cargarClientes();
});

function limpiarFormulario() {
  formClientes.reset();
  idCliente.value = "";

  btnGuardar.textContent = " GuardarRegistro";
  btnCancelar.classList.add("d-none");
}

btnCancelar.addEventListener('click', limpiarFormulario);

async function colocarDatosFormulario(id) {
  try {
    const cliente = await getCliente(id);

    idCliente.value = cliente.idCliente;
    Nombre.value = cliente.nombre;
    Apellido.value = cliente.apellido;
    Telefono.value = cliente.telefono;
    Email.value = cliente.email;
    Direccion.value = cliente.direccion ?? "";

    btnGuardar.textContent = "Actualizar";

    btnCancelar.classList.remove("d-none");
  }
  catch (error) {
    Swal.fire({
      title: '¡Error!',
      text: 'No se pudieron cargar los datos del cliente ',
      icon: 'error',
    }
    );
    console.error(error);
  }
}

async function borrarCliente(id) {
  const confirmar = confirm("¿Desea eliminar este cliente?");

  if (!confirmar) {
    return;
  }

  try {
    await deleteCliente(id);
    Swal.fire({
      title: '¡Dato eliminado!',
      text: 'Se ha eliminado correctamente',
      icon: 'success',
    }
    );
    limpiarFormulario();
    await cargarClientes();
  }
  catch (error) {
    Swal.fire({
      title: 'Error!',
      text: 'No se pudo eliminar el cliente ' + error.message,
      icon: 'error',
    }
    );
  }
}

window.borrarCliente = borrarCliente;
window.colocarDatosFormulario = colocarDatosFormulario;
