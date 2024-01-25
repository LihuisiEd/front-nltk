const express = require('express');
const app = express();
const port = 3000;
const fetch = require('node-fetch');
const ejs = require('ejs');

app.use(express.static('src'));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/api/load_data', async (req, res) => {
    try {
        // Cambia la url de la api por la api de flask de nltk
        const apiUrl = 'url_de_la_api/load_data';
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error al cargar datos', error);
        res.status(500).json({ error: 'Error al cargar datos' });
    }
});

// Ruta para renderizar la página principal
app.get('/', (req, res) => {
    res.render('index', { movieTitle: 'Name of movie', recommendations: [] });
});

app.get('/api/recommendations', async (req, res) => {
    try {
        // Cambia la url de la api por la api de flask de nltk
        const movieTitle = req.query.movie_title;
        const apiUrl = `url_de_la_api/recommendations/${movieTitle}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error al obtener recomendaciones', error);
        res.status(500).json({ error: 'Error al obtener recomendaciones' });
    }
});

app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
