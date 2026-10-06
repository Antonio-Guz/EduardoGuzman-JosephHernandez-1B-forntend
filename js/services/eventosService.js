const API = '';



export async function obtenerEventos() {
  // Paso 1: esperar la respuesta del servidor
  const response = await fetch(`${API}`);

  // Verificar que no hubo error HTTP (404, 500, etc.)
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  // Paso 2: convertir el JSON en un objeto de JavaScript
  const clientes = await response.json();

  console.log(clientes); // arreglo de objetos
  return clientes;
}

export async function guardarCambios(id, datosCompletos) {
  const postActualizado = await actualizarPost(id, datosCompletos);
  console.log('Guardado:', postActualizado);
}


