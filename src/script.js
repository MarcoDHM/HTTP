// Datos ficticios para mostrar Actores y Películas
const allActors = Array.from({ length: 200 }, (_, index) => ({
  name: `Actor ${index + 1}`,
  image: `https://via.placeholder.com/150?text=Actor+${index + 1}`
}));

const allMovies = Array.from({ length: 200 }, (_, index) => ({
  title: `Película ${index + 1}`,
  image: `https://via.placeholder.com/150?text=Película+${index + 1}`,
  genre: "Drama",
  director: `Director ${index + 1}`
}));

// Paginación
let currentActorsPage = 1;
let currentMoviesPage = 1;
const itemsPerPage = 20;
const totalActorsPages = Math.ceil(allActors.length / itemsPerPage);
const totalMoviesPages = Math.ceil(allMovies.length / itemsPerPage);

// Referencias a elementos del DOM
const actorsSection = document.getElementById("actors-section");
const moviesSection = document.getElementById("movies-section");
const actorsBtn = document.getElementById("actors-btn");
const moviesBtn = document.getElementById("movies-btn");
const actorsSearchInput = document.getElementById("actors-search");
const moviesSearchInput = document.getElementById("movies-search");

// Listeners para cambiar de sección
actorsBtn.addEventListener("click", () => {
  actorsSection.classList.remove("hidden");
  moviesSection.classList.add("hidden");
  displayActorsPage(currentActorsPage);
});

moviesBtn.addEventListener("click", () => {
  moviesSection.classList.remove("hidden");
  actorsSection.classList.add("hidden");
  displayMoviesPage(currentMoviesPage);
});

// Mostrar Actores en la página actual
function displayActorsPage(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const charactersToDisplay = allActors.slice(startIndex, endIndex);
  const actorsContainer = document.getElementById("actors-characters");
  actorsContainer.innerHTML = "";
  charactersToDisplay.forEach((actor, index) => {
    const characterDiv = document.createElement("div");
    characterDiv.classList.add("character");
    characterDiv.style.setProperty("--i", index);
    characterDiv.innerHTML = `
            <h3>${actor.name}</h3>
            <img src="${actor.image}" alt="${actor.name}">
        `;
    actorsContainer.appendChild(characterDiv);
  });
  document.getElementById("actors-page-info").innerText = `Página ${page} de ${totalActorsPages}`;
}

// Mostrar Películas en la página actual
function displayMoviesPage(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const charactersToDisplay = allMovies.slice(startIndex, endIndex);
  const moviesContainer = document.getElementById("movies-characters");
  moviesContainer.innerHTML = "";
  charactersToDisplay.forEach((movie, index) => {
    const characterDiv = document.createElement("div");
    characterDiv.classList.add("character");
    characterDiv.style.setProperty("--i", index);
    characterDiv.innerHTML = `
            <h3>${movie.title}</h3>
            <img src="${movie.image}" alt="${movie.title}">
            <div class="character-info">
                <p><strong>Género:</strong> ${movie.genre}</p>
                <p><strong>Director:</strong> ${movie.director}</p>
            </div>
        `;
    moviesContainer.appendChild(characterDiv);
  });
  document.getElementById("movies-page-info").innerText = `Página ${page} de ${totalMoviesPages}`;
}

// Navegación entre páginas
document.getElementById("prev-actors").addEventListener("click", () => {
  if (currentActorsPage > 1) {
    currentActorsPage--;
    displayActorsPage(currentActorsPage);
  }
});

document.getElementById("next-actors").addEventListener("click", () => {
  if (currentActorsPage < totalActorsPages) {
    currentActorsPage++;
    displayActorsPage(currentActorsPage);
  }
});

document.getElementById("prev-movies").addEventListener("click", () => {
  if (currentMoviesPage > 1) {
    currentMoviesPage--;
    displayMoviesPage(currentMoviesPage);
  }
});

document.getElementById("next-movies").addEventListener("click", () => {
  if (currentMoviesPage < totalMoviesPages) {
    currentMoviesPage++;
    displayMoviesPage(currentMoviesPage);
  }
});

// Cargar la primera página de Actores por defecto
displayActorsPage(currentActorsPage);
