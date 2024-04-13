import { API_PATH } from './globals.js';

document.addEventListener('DOMContentLoaded', function() {
    const dataForm = document.getElementById('dataForm');

    dataForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const publicKey = document.getElementById('publicKey').value.trim();

        if (!publicKey) {
            alert('Por favor, ingrese una clave pública.');
            return;
        }

        fetchTransactions(publicKey);
    });

    function fetchTransactions(publicKey) {
        const transactionIdsList = document.getElementById('transactionIds');

        const url = `${API_PATH}outputs?public_key=${publicKey}`;

        fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
        }
        return response.json(); // Convertir la respuesta a JSON
    })
    .then(outputs => {
        renderTransactions(outputs, transactionIdsList);
    })
    .catch(error => {
        console.error('Error al obtener transacciones:', error);
    });

    }

    function renderTransactions(outputs, transactionIdsList) {
        transactionIdsList.innerHTML = ''; 

        if (outputs.length === 0) {
            const listItem = document.createElement('li');
            listItem.textContent = 'No hay transacciones disponibles';
            transactionIdsList.appendChild(listItem);
            return;
        }

        outputs.forEach(output => {
            const listItem = document.createElement('li');
            listItem.textContent = output.transaction_id;
            transactionIdsList.appendChild(listItem);
        });
    }
});

// export { fetchTransactions, renderTransactions };
