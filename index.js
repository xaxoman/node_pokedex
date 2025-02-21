const express = require('express');
const app = express();
const port = 3000;

// SERVER FILE

app.use(express.json()); 
app.use(express.static('public'));

app.get('/api/pokemon', async (req, res) => {
    try {
        // Per prima cosa, fetchiamo il numero totale di pokemon
        const countResponse = await fetch('https://pokeapi.co/api/v2/pokemon');
        if (!countResponse.ok) {
            throw new Error(`Pokemon API error: ${countResponse.status}`);
        }
        const countData = await countResponse.json();
        const limit = countData.count;

        // Ora fetchiamo i dati di tutti i pokemon usando il numero totale come limite
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        if (!response.ok) {
            throw new Error(`Pokemon API error: ${response.status}`);
        }

        const pokemon_data = await response.json();
        res.json({ success: true, data: pokemon_data });

    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({ success: false, error: 'Failed to fetch pokemon data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
