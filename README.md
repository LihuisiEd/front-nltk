
# NLTK Frontend
```
npm install
```
Cambiamos la url de la api en el archivo **server.js**
```
app.get('/api/load_data', async (req, res) => {
    try {
        // Cambia la url de la api por la api de flask de nltk
        const apiUrl = 'url_de_la_api/load_data';
```
```
app.get('/api/recommendations', async (req, res) => {
    try {
        // Cambia la url de la api por la api de flask de nltk
        const movieTitle = req.query.movie_title;
        const apiUrl = `url_de_la_api/recommendations/${movieTitle}`;
```
Luego iniciamos el servidor
```
node server.js
```
Ahora revisamos el puerto **3000** y probamos su funcionamiento.
