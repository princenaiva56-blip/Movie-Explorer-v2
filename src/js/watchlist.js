import { getMovieDetails } from "./api/tmdb.js";
import { displayMovies } from "./ui/moviecard.js";
import { showMessage } from "./ui/status.js";

const storedWatchlist = localStorage.getItem("watchlist");

const watchlistIds = storedWatchlist
    ? JSON.parse(storedWatchlist)
    : [];

const watchlistContainer = document.querySelector(".watchlist-results");

console.log("watchlistIds:", watchlistIds);

async function loadWatchlistMovies() {

    showMessage(
        watchlistContainer,
        "Loading your watchlist..."
    );

    if (watchlistIds.length === 0) {
        showMessage(
            watchlistContainer,
            "Your watchlist is empty.",
            "empty"
        );
        return;
    }

    try {
        const movies = await Promise.all(
            watchlistIds.map(id => getMovieDetails(id))
        );

        console.log("Watchlist movies:", movies);

        displayMovies(
            { results: movies },
            watchlistContainer,
            true,
            "Remove from Watchlist"
        );

    } catch (error) {
        console.error("Watchlist error:", error);

        showMessage(
            watchlistContainer,
            "Couldn't load your watchlist. Please try again.",
            "error"
        );
    }
}

watchlistContainer.addEventListener("click", (event) => {
    if (!event.target.classList.contains("remove-favorite")) {
        return;
    }

    const card = event.target.closest(".movie-card");
    const movieId = card.dataset.id;

    const updatedWatchlist = watchlistIds.filter(
        id => id !== movieId
    );

    localStorage.setItem(
        "watchlist",
        JSON.stringify(updatedWatchlist)
    );

    card.remove();

    console.log("Updated watchlist:", updatedWatchlist);
});

loadWatchlistMovies();