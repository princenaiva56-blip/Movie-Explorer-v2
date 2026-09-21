import { getMovieDetails } from "./api/tmdb.js";
import { displayMovies } from "./ui/moviecard.js";

const storedFavorites = localStorage.getItem("favorites");

const favoriteIds = storedFavorites ? JSON.parse(storedFavorites) : [];

const favoritesContainer = document.querySelector(".favorites-results");

console.log("favoriteIds:", favoriteIds);

async function loadFavoriteMovie() {
    if (favoriteIds.length > 0) {

        const movies = await Promise.all(favoriteIds.map(id => getMovieDetails(id)));

        displayMovies({results: movies}, favoritesContainer, true)
        console.log("Favorite movies:", movies);
    }
}

favoritesContainer.addEventListener("click", (event) => {
    if (!event.target.classList.contains("remove-favorite")) {
        return;
    }

    const card = event.target.closest(".movie-card");
    const movieId = card.dataset.id;

    const updatedFavorites = favoriteIds.filter(
        id => id !== movieId
    );

    localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
    );

    card.remove();

    console.log("Updated favorites:", updatedFavorites);
});

loadFavoriteMovie();