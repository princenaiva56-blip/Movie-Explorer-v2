import { getMovieDetails, getMovieVideos, getSimilarMovies, getMovieCredits } from "./api/tmdb.js";
import { displayMovies } from "./ui/moviecard.js";
import { showMessage } from "./ui/status.js";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

if (!movieId) {
    console.error("No movie ID found in URL.");
}


const movieHero = document.querySelector(".movie-hero")
const moviePoster = document.querySelector(".movie-poster img")
const movieTitle = document.querySelector(".movie-title");
const movieMeta = document.querySelector(".movie-meta");
const movieGenres = document.querySelector(".movie-genres")
const movieOverview = document.querySelector(".movie-overview");
const trailerBtn = document.querySelector(".primary-btn");
const similarContainer = document.querySelector(".similar-container");
const castContainer = document.querySelector(".cast-container");


async function loadSimilarMovies() {
    showMessage(similarContainer, "Loading similar movies...");

    try {
        const similarMovies = await getSimilarMovies(movieId);

        if (similarMovies.results.length === 0) {
            showMessage(
                similarContainer,
                "No similar movies found.",
                "empty"
            );
            return;
        }

        displayMovies(similarMovies, similarContainer);
    } catch (error) {
        console.error("Similar movies error:", error);

        showMessage(
            similarContainer,
            "Couldn't load similar movies. Please try again.",
            "error"
        );
    }
}

async function loadCast() {
    showMessage(castContainer, "Loading cast...");

    try {
        const movieCredits = await getMovieCredits(movieId);

        const mainCast = movieCredits.cast.slice(0, 8);

        if (mainCast.length === 0) {
            showMessage(
                castContainer,
                "No cast information available.",
                "empty"
            );
            return;
        }

        displayCast(mainCast, castContainer);

    } catch (error) {
        console.error("Cast error:", error);

        showMessage(
            castContainer,
            "Couldn't load the cast. Please try again.",
            "error"
        );
    }
}


async function displayMovieDetails() {
    showMessage(movieOverview, "Loading movie details...");

    try {
        const movieDetails = await getMovieDetails(movieId);

        if (!movieDetails || !movieDetails.id) {
            showMessage(
                movieOverview,
                "Movie information is not available.",
                "empty"
            );
            return;
        }

        const posterUrl =
            `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;

        const runtimeHour = Math.floor(movieDetails.runtime / 60);
        const runtimeMinute = movieDetails.runtime % 60;

        movieTitle.textContent = movieDetails.title;

        movieMeta.textContent =
            `⭐ ${movieDetails.vote_average.toFixed(1)} • ` +
            `${movieDetails.release_date.slice(0, 4)} • ` +
            `${runtimeHour}h ${runtimeMinute}m`;

        moviePoster.src = posterUrl;
        moviePoster.alt = movieDetails.title;

        movieOverview.textContent = movieDetails.overview;

        const genres = movieDetails.genres.map(
            genre => genre.name
        );

        movieGenres.textContent = genres.join(" • ");

        movieHero.style.backgroundImage = `
            linear-gradient(
                to right,
                rgba(18,18,18,.95),
                rgba(18,18,18,.6),
                rgba(18,18,18,.2)
            ),
            url(${posterUrl})
        `;

    } catch (error) {
        console.error("Movie details error:", error);

        showMessage(
            movieOverview,
            "Couldn't load this movie. Please try again.",
            "error"
        );
    }
}

async function displayMovieTrailer() {
    trailerBtn.disabled = true;
    trailerBtn.textContent = "Loading Trailer...";

    try {
        const movieVideos = await getMovieVideos(movieId);

        const trailer = movieVideos.results.find(
            video =>
                video.type === "Trailer" &&
                video.site === "YouTube"
        );

        if (!trailer) {
            trailerBtn.textContent = "Trailer Unavailable";
            return;
        }

        trailerBtn.disabled = false;
        trailerBtn.textContent = "Watch Trailer";

        trailerBtn.addEventListener("click", () => {
            const youtubeUrl =
                `https://www.youtube.com/watch?v=${trailer.key}`;

            window.open(youtubeUrl, "_blank");
        });

    } catch (error) {
        console.error("Trailer error:", error);

        trailerBtn.textContent = "Trailer Unavailable";
        trailerBtn.disabled = true;
    }
}

function createCastCard(actor){

    const castCard = document.createElement("div");

    castCard.classList.add("cast-card");

    const imageUrl =`https://image.tmdb.org/t/p/w500${actor.profile_path}`
    console.log(imageUrl);
    

    castCard.innerHTML = `
        <img src ="${imageUrl}" alt ="" >
        <h3> ${actor.original_name} <h3>
        <p> ${actor.character} <p>
    `

    return castCard;
}

function displayCast(actors, container){
    container.innerHTML ="";

    actors.forEach(actor => {
        container.appendChild(createCastCard(actor));
    })
}

const favoritesBtn = document.querySelector(".favorites-btn");

favoritesBtn.addEventListener("click", () => {
    const storedFavorites = localStorage.getItem("favorites");

    const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

    if(!favorites.includes(movieId)){
        favorites.push(movieId)
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    console.log("stored favorites:", storedFavorites);
});

const watchlistBtn = document.getElementById("watchlist-btn");

watchlistBtn.addEventListener("click", () => {
    const storedWatchlist = localStorage.getItem("watchlist");

    const watchlist = storedWatchlist
        ? JSON.parse(storedWatchlist)
        : [];

    if (!watchlist.includes(movieId)) {
        watchlist.push(movieId);
    }

    localStorage.setItem(
        "watchlist",
        JSON.stringify(watchlist)
    );

    console.log("Watchlist:", watchlist);
});

displayMovieDetails();
displayMovieTrailer();
loadCast();
loadSimilarMovies();
