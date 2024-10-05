// URLs de las APIs
const pokemonApiUrl = "https://pokeapi.co/api/v2/pokemon?limit=200";
const rickAndMortyApiUrl = "https://rickandmortyapi.com/api/character?page=";
let currentPokemonPage = 1;
let currentRickMortyPage = 1;
let totalPokemonPages = 10;
let totalRickMortyPages = 10; // 10 páginas de 20 personajes cada una
let allPokemonCharacters = [];
let allRickMortyCharacters = [];

// Referencias a elementos del DOM
const pokemonSection = document.getElementById("pokemon-section");
const rickMortySection = document.getElementById("rick-morty-section");
const pokemonBtn = document.getElementById("pokemon-btn");
const rickMortyBtn = document.getElementById("rick-morty-btn");
const pokemonSearchInput = document.getElementById("pokemon-search");
const rickMortySearchInput = document.getElementById("rick-morty-search");

// Listeners para cambiar de sección
pokemonBtn.addEventListener("click", () => {
  pokemonSection.classList.remove("hidden");
  rickMortySection.classList.add("hidden");
  displayPokemonPage(currentPokemonPage);
});

rickMortyBtn.addEventListener("click", () => {
  rickMortySection.classList.remove("hidden");
  pokemonSection.classList.add("hidden");
  displayRickAndMortyPage(currentRickMortyPage);
});

// Fetch de los Pokémon y Rick and Morty - Se cargan todos los personajes
fetch(pokemonApiUrl)
  .then((response) => response.json())
  .then((data) => {
    allPokemonCharacters = data.results;
    displayPokemonPage(currentPokemonPage);
  });

// Obtener todos los personajes de Rick and Morty en las 42 páginas disponibles
function fetchAllRickMortyCharacters() {
  const fetchPromises = [];
  for (let i = 1; i <= 42; i++) {
    // 42 páginas en la API de Rick and Morty
    fetchPromises.push(
      fetch(`${rickAndMortyApiUrl}${i}`).then((res) => res.json())
    );
  }
  Promise.all(fetchPromises).then((pages) => {
    pages.forEach((page) => allRickMortyCharacters.push(...page.results));
    displayRickAndMortyPage(currentRickMortyPage);
  });
}

fetchAllRickMortyCharacters();

// Mostrar personajes de Pokémon
function displayPokemonPage(page) {
  const startIndex = (page - 1) * 20;
  const endIndex = startIndex + 20;
  const charactersToDisplay = allPokemonCharacters.slice(startIndex, endIndex);
  const pokemonContainer = document.getElementById("pokemon-characters");
  pokemonContainer.innerHTML = "";
  charactersToDisplay.forEach((character, index) => {
    const characterDiv = document.createElement("div");
    characterDiv.classList.add("character");
    characterDiv.style.setProperty("--i", index);
    characterDiv.innerHTML = `
            <h3>${character.name.toUpperCase()}</h3>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              startIndex + index + 1
            }.png" alt="${character.name}">
        `;
    pokemonContainer.appendChild(characterDiv);
  });
  document.getElementById(
    "pokemon-page-info"
  ).innerText = `Página ${page} de ${totalPokemonPages}`;
}

// Mostrar personajes de Rick and Morty con raza y estado
function displayRickAndMortyPage(page) {
  const startIndex = (page - 1) * 20;
  const endIndex = startIndex + 20;
  const charactersToDisplay = allRickMortyCharacters.slice(
    startIndex,
    endIndex
  );
  const rickMortyContainer = document.getElementById("rick-morty-characters");
  rickMortyContainer.innerHTML = "";
  charactersToDisplay.forEach((character, index) => {
    const characterDiv = document.createElement("div");
    characterDiv.classList.add("character");
    characterDiv.style.setProperty("--i", index);
    characterDiv.innerHTML = `
            <h3>${character.name}</h3>
            <img src="${character.image}" alt="${character.name}">
            <div class="character-info">
                <p><strong>Raza:</strong> ${character.species}</p>
                <p><strong>Estado:</strong> ${character.status}</p>
            </div>
        `;
    rickMortyContainer.appendChild(characterDiv);
  });
  document.getElementById(
    "rick-morty-page-info"
  ).innerText = `Página ${page} de ${totalRickMortyPages}`;
}

// Función de búsqueda en Pokémon
pokemonSearchInput.addEventListener("input", () => {
  const query = pokemonSearchInput.value.toLowerCase();
  const pokemonContainer = document.getElementById("pokemon-characters");
  pokemonContainer.innerHTML = "";
  if (query === "") {
    // Si no hay búsqueda, mostrar la página actual
    displayPokemonPage(currentPokemonPage);
  } else {
    // Mostrar resultados filtrados de todas las páginas
    const filteredCharacters = allPokemonCharacters.filter((character) =>
      character.name.toLowerCase().includes(query)
    );
    filteredCharacters.forEach((character, index) => {
      const characterDiv = document.createElement("div");
      characterDiv.classList.add("character");
      characterDiv.style.setProperty("--i", index);
      characterDiv.innerHTML = `
                <h3>${character.name.toUpperCase()}</h3>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  index + 1
                }.png" alt="${character.name}">
            `;
      pokemonContainer.appendChild(characterDiv);
    });
  }
});

// Función de búsqueda global en Rick and Morty
rickMortySearchInput.addEventListener("input", () => {
  const query = rickMortySearchInput.value.toLowerCase();
  const rickMortyContainer = document.getElementById("rick-morty-characters");
  rickMortyContainer.innerHTML = "";
  if (query === "") {
    // Si no hay búsqueda, mostrar la página actual
    displayRickAndMortyPage(currentRickMortyPage);
  } else {
    // Mostrar resultados filtrados de todas las páginas
    const filteredCharacters = allRickMortyCharacters.filter((character) =>
      character.name.toLowerCase().includes(query)
    );
    filteredCharacters.forEach((character, index) => {
      const characterDiv = document.createElement("div");
      characterDiv.classList.add("character");
      characterDiv.style.setProperty("--i", index);
      characterDiv.innerHTML = `
                <h3>${character.name}</h3>
                <img src="${character.image}" alt="${character.name}">
                <div class="character-info">
                    <p><strong>Raza:</strong> ${character.species}</p>
                    <p><strong>Estado:</strong> ${character.status}</p>
                </div>
            `;
      rickMortyContainer.appendChild(characterDiv);
    });
  }
});

// Paginación para Pokémon
document.getElementById("prev-pokemon").addEventListener("click", () => {
  if (currentPokemonPage > 1) {
    currentPokemonPage--;
    displayPokemonPage(currentPokemonPage);
  }
});

document.getElementById("next-pokemon").addEventListener("click", () => {
  if (currentPokemonPage < totalPokemonPages) {
    currentPokemonPage++;
    displayPokemonPage(currentPokemonPage);
  }
});

// Paginación para Rick y Morty
document.getElementById("prev-rick-morty").addEventListener("click", () => {
  if (currentRickMortyPage > 1) {
    currentRickMortyPage--;
    displayRickAndMortyPage(currentRickMortyPage);
  }
});

document.getElementById("next-rick-morty").addEventListener("click", () => {
  if (currentRickMortyPage < totalRickMortyPages) {
    currentRickMortyPage++;
    displayRickAndMortyPage(currentRickMortyPage);
  }
});
