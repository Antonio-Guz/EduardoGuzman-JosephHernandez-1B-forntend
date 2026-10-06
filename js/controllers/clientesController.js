import { obtenerClientes } from '../services/clientesService';

const nombre = document.getElementById("txtNombre");

const apellido = document.getElementById("txtApellido");

const telefono = document.getElementById("txtTelefono");

const email = document.getElementById("txtEmail");

const direccion = document.getElementById("txtDireccion");

const btnGuardar = document.getElementById("btnGuardar");
const tablaClientes = document.getElementById("tablaClientes");

async function cargarPosts() {
  try {
    const posts = await obtenerClientes();
    tablaClientes.innerHTML += `
    <tr>
      <td>${cliente.id}</td>
      <td>
      <button class="btn btn-danger btn-sm" onclick="borrarCliente(${cliente.id})">Borrar 🗑</button>
      <button class="btn btn-danger btn-sm" onclick="editarCliente(${cliente.id})">editar🗑</button>
      </td>
    </tr>
    `
  } catch (error) {
    console.error('Error al cargar:', error.message);
  }
}




