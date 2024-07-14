// public/script.js

document.getElementById('tsp-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const matrixText = document.getElementById('matrix').value;
    const matrix = matrixText.split('\n').map(row => row.split(',').map(Number));

    const response = await fetch('/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ matrix })
    });

    const result = await response.json();
    document.getElementById('result').innerText = `Path: ${result.path.join(' -> ')}\nCost: ${result.cost}`;
});
