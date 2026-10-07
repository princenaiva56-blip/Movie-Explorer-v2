import { getTrendingMovies, getPopularMovies, getTopRatedMovies, getMovieVideos } from "./api/tmdb.js";
import { displayMovies, createMovieCard } from "./ui/moviecard.js";
import { showMessage } from "./ui/status.js";

const hero = document.querySelector(".hero");
const heroTitle = document.querySelector(".hero-title");
const heroMeta = document.querySelector(".hero-meta");
const heroOverview = document.querySelector(".hero-overview");
const trendingContainer = document.querySelector(".trending-container");
const popularContainer = document.querySelector(".popular-container");
const topRatedContainer = document.querySelector(".toprated-container");

const movieButtons = document.querySelector(".movie-buttons")
const watchTrailerBtn = document.querySelector(".primary-btn");
const moreDetailsBtn = document.querySelector(".secondary-btn");

async function init() {

    showHeroLoading();

    showMessage(trendingContainer, "Loading trending movies...");
    showMessage(popularContainer, "Loading popular movies...");
    showMessage(topRatedContainer, "Loading top rated movies...");


    // TRENDING
    try {
        const trendingMovies = await getTrendingMovies();

        if (trendingMovies.results.length === 0) {

            showMessage(
                trendingContainer,
                "No trending movies available right now.",
                "empty"
            );

            showHeroError();

        } else {

            displayFeaturedMovie(trendingMovies);
            displayMovies(trendingMovies, trendingContainer);

        }

    } catch (error) {

        console.error(error);

        showMessage(
            trendingContainer,
            "Unable to load trending movies.",
            "error"
        );

        showHeroError();
    }


    // POPULAR
    try {
        const popularMovies = await getPopularMovies();

        if (popularMovies.results.length === 0) {
    showMessage(
        popularContainer,
        "No popular movies available right now.",
        "empty"
    );
} else {
    displayMovies(popularMovies, popularContainer);
}

    } catch (error) {

        console.error(error);

        showMessage(
            popularContainer,
            "Unable to load popular movies.",
            "error"
        );
    }


    // TOP RATED
    try {
        const topRatedMovies = await getTopRatedMovies();

        if (topRatedMovies.results.length === 0) {
    showMessage(
        topRatedContainer,
        "No top rated movies available right now.",
        "empty"
    );
} else {
    displayMovies(topRatedMovies, topRatedContainer);
}

    } catch (error) {

        console.error(error);

        showMessage(
            topRatedContainer,
            "Unable to load top rated movies.",
            "error"
        );
    }
}

    init();
    
   function displayFeaturedMovie(trendingMovies){

    movieButtons.style.display = "flex";

    const imageUrl =`https://image.tmdb.org/t/p/original${trendingMovies.results[0].backdrop_path}`;

    const featuredMovie = trendingMovies.results[0];

    console.log("Featured movie:", featuredMovie);
    console.log("Featured movie ID:", featuredMovie.id);
    console.log("More details button:", moreDetailsBtn);

watchTrailerBtn.onclick = async () => {
    const movieVideos = await getMovieVideos(featuredMovie.id);

    const trailer = movieVideos.results.find(
        video => video.type === "Trailer" && video.site === "YouTube"
    );

    if (trailer) {
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
    } else {
        alert("Trailer not available.");
    }
};

    moreDetailsBtn.onclick = () => {

        console.log("More Details clicked");
        
    window.location.href = `movie.html?id=${featuredMovie.id}`;
    moreDetailsBtn.addEventListener("click", () => {
    console.log("BUTTON CLICKED");
});

    
    };
    
    hero.style.backgroundImage = `
    linear-gradient(
        to right,
    rgba(18,18,18,.95),
    rgba(18,18,18,.6),
    rgba(18,18,18,.2)), url(${imageUrl})
    `
        heroTitle.textContent = featuredMovie.title;
        heroMeta.innerHTML = `⭐ ${featuredMovie.vote_average.toFixed(1)}  •  ${featuredMovie.release_date.slice(0, 4)}`;
        heroOverview.textContent = featuredMovie.overview;

}

function showHeroLoading() {
    hero.style.backgroundImage = "none";

    heroTitle.textContent = "Loading featured movie...";
    heroMeta.textContent = "";
    heroOverview.textContent = "";

    movieButtons.style.display = "none";
}

function showHeroError() {
    hero.style.backgroundImage = "none";

    heroTitle.textContent = "Couldn't load featured movie. Please try again.";
    heroMeta.textContent = "";
    heroOverview.textContent =
        "We couldn't load movie information right now. Please try again later.";

    movieButtons.style.display = "none";
}