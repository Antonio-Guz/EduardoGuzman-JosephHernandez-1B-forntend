const API_URL = "http://localhost:8080/evento";

export async function getEvento(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);

        if (!respuesta.ok) {
            const error = await respuesta.json();
            Swal.fire({
                title: 'Error!',
                text: 'No se pudo o btener el evento',
                icon: 'error',
            });
            throw new Error(error.message);
        }

        const evento = await respuesta.json();
        return evento.data;

    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Hubo un error al obtener el evento ' + error.message,
            icon: 'error',
        });
        throw error;
    }
}

export async function getEventos() {
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) {
            const error = await respuesta.json();
            Swal.fire({
                title: 'Error!',
                text: 'No se pudo obtener el listado de eventos',
                icon: 'error',
            });
            throw new Error(error.message);
        }
        const eventos = await respuesta.json();
        return eventos.data;

    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Hubo un error al obtener los eventos ' + error.message,
            icon: 'error',
        });
        throw error;
    }
}

export async function createEvento(evento) {
    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(evento)
        });

        if (!respuesta.ok) {
            const error = await respuesta.json();
            throw new Error(error.data ? Object.values(error.data).join(", ") : error.message);
        }

        const nuevoEvento = await respuesta.json();

        return nuevoEvento.data;

    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'No se pudo crear el evento ' + error.message,
            icon: 'error',
        });
        throw error;
    }
}

export async function actualizarEvento(id, evento) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(evento)
        });

        if (!respuesta.ok) {
            const error = await respuesta.json();
            throw new Error(error.data ? Object.values(error.data).join(", ") : error.message);
        }

        const eventoActualizado = await respuesta.json();

        return eventoActualizado.data;

    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'No se pudo actualizar el evento ' + error.message,
            icon: 'error',
        });
        throw error;
    }
}

export async function deleteEvento(id) {
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
        console.error("Error al eliminar el evento: " + error);
        throw error;
    }
}

p