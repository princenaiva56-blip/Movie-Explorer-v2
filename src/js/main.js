import { getTrendingMovies, getPopularMovies, getTopRatedMovies } from "./api/tmdb.js";
import { displayMovies, createMovieCard } from "./ui/moviecard.js";

const hero = document.querySelector(".hero");
const heroTitle = document.querySelector(".hero-title");
const heroMeta = document.querySelector(".hero-meta");
const heroOverview = document.querySelector(".hero-overview");
const trendingContainer = document.querySelector(".trending-container");
const popularContainer = document.querySelector(".popular-container");
const topRatedContainer = document.querySelector(".toprated-container");

async function init(){

const trendingMovies = await getTrendingMovies();
const popularMovies = await getPopularMovies();
const topRatedMovies = await getTopRatedMovies();

displayFeaturedMovie(trendingMovies);
displayMovies(trendingMovies, trendingContainer);
displayMovies(popularMovies, popularContainer);
displayMovies(topRatedMovies, topRatedContainer);
        
    };

    init();
    
   function displayFeaturedMovie(trendingMovies){
    const imageUrl =`https://image.tmdb.org/t/p/original${trendingMovies.results[0].backdrop_path}`;
    const featuredMovie = trendingMovies.results[0];
    
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

