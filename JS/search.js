import { API_PATH } from './globals.js';

document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const searchTokenInput = document.getElementById('searchToken');
    const searchResults = document.getElementById('searchResults');

    searchButton.addEventListener('click', function() {
        const token = searchTokenInput.value.trim();
        if (token !== '') {
            // Realizar una llamada a BigchainDB para buscar los datos asociados al token
            const conn = new BigchainDB.Connection(API_PATH);
            conn.getTransaction(token)
                .then(transaction => {
                    const asset = transaction.asset;
                    if (asset && asset.data) {
                        const data = asset.data;
                        // Mostrar los datos en la interfaz
                        renderData(data, token); // Pasar el token como argumento
                    } else {
                        searchResults.innerHTML = `<p>No se encontraron datos para el token <strong>${token}</strong>.</p>`;
                    }
                })
                .catch(error => {
                    console.error('Error al buscar datos:', error);
                    searchResults.innerHTML = `<p>Ocurrió un error al buscar datos para el token <strong>${token}</strong>.</p>`;
                });
        } else {
            alert('Por favor ingrese un token válido.');
        }
    });

    function renderData(data, token) { // Agregar token como argumento
        // Mostrar los datos en la interfaz
        searchResults.innerHTML = `
        <p><b>ESQUEMA GENERADO EXITOSAMENTE</b></p>
        <p>Resultados para el token <strong>${token}</strong>.</p>
        `;
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                searchResults.innerHTML += `<p><strong>${key}:</strong> ${data[key]}</p>`;
            }
        }
    }
});
