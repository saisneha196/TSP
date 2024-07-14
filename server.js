// server.js

const express = require('express');
const TSP = require('./algorithm/branchAndBound');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/solve', (req, res) => {
    const { matrix } = req.body;
    if (!matrix) {
        return res.status(400).send('Matrix is required');
    }
    
    const tsp = new TSP(matrix);
    const result = tsp.solve();
    res.json(result);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
