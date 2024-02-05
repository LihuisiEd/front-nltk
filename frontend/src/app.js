const config = require('../config.js');
const loadDataButton = document.querySelector('.load-data-button');
const loaderContainer = document.querySelector('.loader-container');
const checkContainer = document.querySelector('.check-container');
const PORT = config.PORT;
const HOST = config.HOST;
loadDataButton.addEventListener('click', async () => {
    try {
        loaderContainer.classList.remove('hidden');

        const response = await fetch(`http://${HOST}:${PORT}/api/load_data`);
        const data = await response.json();
        
        console.log('Datos de películas:', data);
        loaderContainer.classList.add('hidden');
        loadDataButton.classList.remove('hover:shadow-orange-200');
        loadDataButton.classList.remove('hover:scale-110');
        loadDataButton.disabled = true;
        checkContainer.classList.remove('hidden');
    } catch (error) {
        console.error('Error al cargar datos de películas', error);
        loaderContainer.classList.add('hidden');
    }
});

document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const movieTitle = document.querySelector('.search-input').value;

    try {
        const response = await fetch(`http://${HOST}:${PORT}/api/recommendations?movie_title=${movieTitle}`);
        const data = await response.json();
        updateView(data);
    } catch (error) {
        console.error('Error al obtener recomendaciones', error);
    }
});

function updateView(data) {
    const spanMessage = document.querySelector('.span-message');
    const movieTitleElement = document.querySelector('.movie-title');
    const recommendationsList = document.querySelector('.recommendations-list');
    
    spanMessage.textContent = 'Your recommendations for...';
    movieTitleElement.classList.remove('hidden');
    recommendationsList.classList.remove('hidden');
    recommendationsList.scrollIntoView({ behavior: 'smooth' });
    movieTitleElement.textContent = data.movie_title;
    recommendationsList.innerHTML = '';
    data.recommendations.forEach(recommendation => {
        const listItem = document.createElement('li');
        listItem.textContent = recommendation;
        recommendationsList.appendChild(listItem);
    });
}
