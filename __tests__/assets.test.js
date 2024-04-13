
// Importa la función a probar
import { fetchTransactions, renderTransactions } from '../View/assets';

// Mock para fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ transaction_id: 'abc123' }])
  })
);

describe('fetchTransactions', () => {
  it('debería obtener transacciones y llamar a renderTransactions', async () => {
    document.body.innerHTML = `
      <ul id="transactionIds"></ul>
    `;

    const publicKey = 'dummyPublicKey';
    await fetchTransactions(publicKey);

    const transactionIdsList = document.getElementById('transactionIds');
    expect(transactionIdsList.children.length).toBe(1);
    expect(transactionIdsList.children[0].textContent).toBe('abc123');
  });
});

describe('renderTransactions', () => {
  it('debería renderizar las transacciones en la lista', () => {
    document.body.innerHTML = `
      <ul id="transactionIds"></ul>
    `;

    const outputs = [{ transaction_id: 'xyz789' }];
    const transactionIdsList = document.getElementById('transactionIds');

    renderTransactions(outputs, transactionIdsList);

    expect(transactionIdsList.children.length).toBe(1);
    expect(transactionIdsList.children[0].textContent).toBe('xyz789');
  });

  it('debería renderizar un mensaje si no hay transacciones', () => {
    document.body.innerHTML = `
      <ul id="transactionIds"></ul>
    `;

    const outputs = [];
    const transactionIdsList = document.getElementById('transactionIds');

    renderTransactions(outputs, transactionIdsList);

    expect(transactionIdsList.children.length).toBe(1);
    expect(transactionIdsList.children[0].textContent).toBe('No hay transacciones disponibles');
  });
});
