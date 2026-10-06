const API_URL = "http://localhost:8080/cliente";

export async function getCliente(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);

        if (!respuesta.ok) {
             const error = await respuesta.json();
            Swal.fire({
                title: 'Error!',
                text: 'No se pudo obtener el cliente',
                icon: 'error',
            });
             throw new Error(error.message);
        }

        const cliente = await respuesta.json();
        return cliente.data;

    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Hubo un error al obtener el clientes ' + error.message,
            icon: 'error',
        });
         throw error;
    }
}

export async function getClientes() {
    try{
        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            const error = await respuesta.json();
            Swal.fire({
                title: 'Error!',
                text: 'No se pudo obtener el listado de clientes',
                icon: 'error',
            });
            throw new Error(error.message);
        }

        const clientes = await respuesta.json();
        return clientes.data;
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Hubo un error al obtener los clientes ' + error.message,
            icon: 'error',
        });
        throw error;
    }
}

export async function createCliente(cliente) {
    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        });

        if (!respuesta.ok) {
            const error = await respuesta.json();
            throw new Error(error.data ? Object.values(error.data).join(", ") : error.message);
        }

        const nuevoCliente = await respuesta.json();
         return nuevoCliente.data;

    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'No se pudo crear el cliente ' + error.message,
            icon: 'error',
        });
        throw error;
    }
}

export async function actualizarCliente(id, cliente) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        });

        if (!respuesta.ok) {
            const error = await respuesta.json();
            throw new Error(error.data ? Object.values(error.data).join(", ") : error.message);
        }

        const clienteActualizado = await respuesta.json();

        return clienteActualizado.data;

    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'No se pudo actualizat el cliente ' + error.message,
            icon: 'error',
        });
        throw error;
    }
}

export async function deleteCliente(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!respuesta.ok) {
            const error = await respuesta.json();
            throw new Error(error.message);
        }

        return true;
    }
    catch (error) {
        console.error("Error al eliminar el cliente. " + error);
        throw error;
    }
}
