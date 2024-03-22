import { API_PATH } from './globals.js';

document.addEventListener('DOMContentLoaded', function() {
    const dataForm = document.getElementById('dataForm');
    const transactionIds = document.getElementById('transactionIds');
    
    dataForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(dataForm);
        const documento = formData.get('documento');
        const nombre = formData.get('nombre');
        const edad = parseInt(formData.get('edad'));
        const programa = formData.get('programa');
        const fecha = new Date().toString();
         

        const data = { documento, nombre, edad, programa, fecha };

        // Crear transacción con BigchainDB
        const alice = new BigchainDB.Ed25519Keypair();
        const metadata = { what: 'Transacción en BigchainDB desde interfaz web' };

        const tx = BigchainDB.Transaction.makeCreateTransaction(data, metadata, [BigchainDB.Transaction.makeOutput(BigchainDB.Transaction.makeEd25519Condition(alice.publicKey))], alice.publicKey);
        const txSigned = BigchainDB.Transaction.signTransaction(tx, alice.privateKey);

        // Enviar transacción a BigchainDB
        new BigchainDB.Connection(API_PATH).postTransactionCommit(txSigned)
            .then(res => {
                console.log('Transaction', txSigned.id, 'accepted');
                // Mostrar el ID de la transacción generada en la interfaz
                const listItem = document.createElement('li');
                listItem.innerText = `ID de transacción: ${txSigned.id}`;
                transactionIds.appendChild(listItem);
            })
            .catch(error => {
                console.error('Error creating transaction:', error);
            });

        // Limpiar el formulario después de enviar los datos
        dataForm.reset();
    });
});
