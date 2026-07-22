import { getTrendingMovies, getPopularMovies, getTopRatedMovies } from "./api/tmdb.js";
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
        heroMeta.innerHTML = `⭐ ${featuredMovie.vote_average}  •  ${featuredMovie.release_date.slice(0, 4)}`;
        heroOverview.textContent = featuredMovie.overview;

}


function displayMovies(movies, container){
    container.innerHTML = "";

    movies.results.forEach(movie => {
        container.appendChild(createMovieCard(movie))
    });
    
}

function createMovieCard(movie) {

const posterUrl =`https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const card = document.createElement("div");

  card.classList.add("movie-card");

  card.dataset.id = movie.id;
    
  card.innerHTML = `
 <div class ="movie-info">
    <img src= "${posterUrl}" alt = "">
    <h3>${movie.title}</h3>
    <p>${movie.release_date.slice(0, 4)}</p>
</div>
  `
   card.addEventListener("click", () => {
    const movieId = card.dataset.id;
    window.location.href = `movie.html?id=${movieId}`
    
  })

  return card;

 
}

