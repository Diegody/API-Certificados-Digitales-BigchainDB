import { API_PATH } from './globals.js';

document.addEventListener('DOMContentLoaded', function() {
    const loadDataButton = document.getElementById('loadDataButton');
    const transactionsTable = document.getElementById('transactionsTable').querySelector('tbody');
    const transactionIdsList = document.getElementById('transactionIds'); // Obtener el elemento <ul> con el ID "transactionIds"

    loadDataButton.addEventListener('click', function() {
        // Generar la clave pública utilizando la lógica de generación de claves
        const publicKey = generatePublicKey();

        // Construir la URL de la solicitud GET con la clave pública
        const url = `${API_PATH}outputs?public_key=${publicKey}`;

        console.log('URL: ' + url);

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
            // Iterar sobre los IDs de transacción y agregarlos a la lista
            outputs.forEach(output => {
                const newTransactionIdItem = document.createElement('li'); // Crear un nuevo elemento <li> para el nuevo ID de transacción
                newTransactionIdItem.textContent = output.transaction_id; // Establecer el texto del elemento como el ID de transacción
                transactionIdsList.appendChild(newTransactionIdItem); // Agregar el nuevo elemento <li> a la lista <ul>
            });
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
        const privateKeyBase58 = encodeBase58(privateKey);

        return privateKeyBase58;
    }

    // Función para codificar en Base58
    function encodeBase58(data) {
        const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
        const BASE = ALPHABET.length;

        let res = '';
        let num = BigInt('0x' + data.reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), ''));

        while (num > 0n) {
            const remainder = num % BigInt(BASE);
            num = num / BigInt(BASE);
            res = ALPHABET[remainder] + res;
        }

        return res;
    }
});
