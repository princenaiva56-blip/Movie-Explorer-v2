import { getMovieDetails } from "./api/tmdb.js";
import { displayMovies } from "./ui/moviecard.js";

const storedWatchlist = localStorage.getItem("watchlist");

const watchlistIds = storedWatchlist
    ? JSON.parse(storedWatchlist)
    : [];

const watchlistContainer = document.querySelector(".watchlist-results");

console.log("watchlistIds:", watchlistIds);

async function loadWatchlistMovies() {
    if (watchlistIds.length > 0) {

        const movies = await Promise.all(
            watchlistIds.map(id => getMovieDetails(id))
        );

        console.log("Watchlist movies:", movies);

        displayMovies(
            { results: movies },
            watchlistContainer, true, "Remove from Watchlist"
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