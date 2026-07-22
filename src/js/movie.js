import { getMovieDetails } from "./api/tmdb.js";

const params = new URLSearchParams(window.location.search);

const movieId = params.get("id");


async function init(){
const movieDetails = await getMovieDetails(movieId);
console.log("Details:", movieDetails);
}



init();