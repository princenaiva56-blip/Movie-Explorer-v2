import { getMovieDetails, getMovieVideos, getSimilarMovies, getMovieCredits } from "./api/tmdb.js";
import { displayMovies } from "./ui/moviecard.js";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
console.log(movieId);

const movieHero = document.querySelector(".movie-hero")
const moviePoster = document.querySelector(".movie-poster img")
const movieTitle = document.querySelector(".movie-title");
const movieMeta = document.querySelector(".movie-meta");
const movieGenres = document.querySelector(".movie-genres")
const movieOverview = document.querySelector(".movie-overview");
const trailerBtn = document.querySelector(".primary-btn");
const similarContainer = document.querySelector(".similar-container");
const castContainer = document.querySelector(".cast-container");


const similarMovies = await getSimilarMovies(movieId);
displayMovies(similarMovies, similarContainer)
console.log("Similar:", similarMovies);

const movieCredits = await getMovieCredits(movieId)
console.log("Credits:", movieCredits.cast.slice(0, 8));
const mainCast = movieCredits.cast.slice(0, 8);


async function displayMovieDetails(movie){

    const movieDetails = await getMovieDetails(movieId);

    const posterUrl = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;


    const runtimeHour = Math.floor(movieDetails.runtime / 60);
    const runtimeMinute = Math.floor(movieDetails.runtime % 60);
    console.log(runtimeHour, runtimeMinute);

    movieTitle.textContent = movieDetails.title;
    movieOverview.textContent = movieDetails.overview;
    movieMeta.textContent = `⭐ ${movieDetails.vote_average.toFixed(1)}  •  ${movieDetails.
        release_date.slice(0, 4)}  •  ${runtimeHour}h  ${runtimeMinute}m`
    moviePoster.src = posterUrl;
    moviePoster.alt = movieDetails.title;

    movieHero.style.backgroundImage = `
        linear-gradient(
        to right,
        rgba(18,18,18,.95),
        rgba(18,18,18,.6),
        rgba(18,18,18,.2)), url(${posterUrl})`

    let genresArray = movieDetails.genres;
    let genres = genresArray.map(genre => genre.name);
    movieGenres.textContent = genres.join("    •    ");

}

async function displayMovieTrailer(movie){
    const movieVideos = await getMovieVideos(movieId);
    console.log("Videos:", movieVideos);

    const trailer = movieVideos.results.find( video => video.type === "Trailer" && video.site === "YouTube" );

    

    trailerBtn.addEventListener("click", () => {
        
        
        if(trailer){ //trailer is an object which js treats as truthy

            const youtubeUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
           
            window.open(youtubeUrl, "_blank");
            console.log("Button clicked");
            console.log("Trailer:", trailer)
            
        }else{
            alert("No trailer available for this movie.")
        }
    });
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

displayMovieDetails();
displayMovieTrailer();
displayCast(mainCast, castContainer);
