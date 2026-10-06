const API_URL = "http://localhost:8080/salon";

export async function getSalon(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);

        if (!respuesta.ok) {
            const error = await respuesta.json();
            Swal.fire({
                title: 'Error!',
                text: 'No se pudo obtener el salon',
                icon: 'error',
            });
            throw new Error(error.message);
        }

        const salon = await respuesta.json();
        return salon.data;

    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Hubo un error al obtener el salon ' + error.message,
            icon: 'error',
        });
        throw error;
    }
}

export async function getSalones() {
    try {
        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            const error = await respuesta.json();
            Swal.fire({
                title: 'Error!',
                text: 'No se pudo obtener el listado de salones',
                icon: 'error',
            });
            throw new Error(error.message);
        }

        const salones = await respuesta.json();
        return salones.data;

    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Hubo un error al obtener los salones ' + error.message,
            icon: 'error',
        });
        throw error;
    }
}
