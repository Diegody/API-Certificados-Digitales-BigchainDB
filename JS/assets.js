import { API_PATH } from './globals.js';
import bs58 from 'bs58'; 

document.addEventListener('DOMContentLoaded', function() {
    const loadDataButton = document.getElementById('loadDataButton');
    const transactionsTable = document.getElementById('transactionsTable').querySelector('tbody');

    loadDataButton.addEventListener('click', function() {
        // Generar la clave pública utilizando la lógica de generación de claves
        const publicKey = generatePublicKey();

        // Construir la URL de la solicitud GET con la clave pública
        const url = `${API_PATH}outputs?public_key=${publicKey}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(outputs => {
            renderTransactions(outputs);
        })
        .catch(error => {
            console.error('Error al obtener transacciones:', error);
        });
    });
    
    function renderTransactions(outputs) {
        transactionsTable.innerHTML = ''; // Limpiar la tabla antes de cargar nuevos datos
        if (outputs.length === 0) {
            transactionsTable.innerHTML = '<tr><td colspan="4">No hay transacciones disponibles</td></tr>';
            return;
        }
        outputs.forEach(output => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${output.transaction_id}</td>
                <td>${output.output_index}</td>
            `;
            transactionsTable.appendChild(row);
        });
    }

    // Función para generar la clave pública utilizando la codificación Base58
    function generatePublicKey() {
        // Generar una clave privada aleatoria
        const privateKey = crypto.getRandomValues(new Uint8Array(32)); // Se utiliza la API de Crypto para generar una clave privada aleatoria
    
        // Codificar la clave privada en Base58
        const privateKeyBase58 = bs58.encode(privateKey);

        return privateKeyBase58;
    }
});
