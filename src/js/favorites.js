import { getMovieDetails } from "./api/tmdb.js";
import { displayMovies } from "./ui/moviecard.js";
import { showMessage } from "./ui/status.js";

const storedFavorites = localStorage.getItem("favorites");

const favoriteIds = storedFavorites ? JSON.parse(storedFavorites) : [];

const favoritesContainer = document.querySelector(".favorites-results");

console.log("favoriteIds:", favoriteIds);

async function loadFavoriteMovie() {

    showMessage(
        favoritesContainer,
        "Loading your favorites..."
    );

    if (favoriteIds.length === 0) {
        showMessage(
            favoritesContainer,
            "You haven't added any favorite movies yet.",
            "empty"
        );
        return;
    }

    try {
        const movies = await Promise.all(
            favoriteIds.map(id => getMovieDetails(id))
        );

        displayMovies(
            { results: movies },
            favoritesContainer,
            true
        );

        console.log("Favorite movies:", movies);

    } catch (error) {
        console.error("Favorites error:", error);

        showMessage(
            favoritesContainer,
            "Couldn't load your favorites. Please try again.",
            "error"
        );
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