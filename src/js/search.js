import { getSearchedMovies } from "./api/tmdb.js";
import { displayMovies } from "./ui/moviecard.js";

const searchForm = document.getElementById("search-form");
const userInput = document.querySelector("#search-input");
const searchResultsContainer = document.querySelector(".search-results");


searchForm.addEventListener("submit", async (event) => {

        event.preventDefault();
        
    const movieName = userInput.value.trim();

    //for inputs with special character
    const encodedMovieName = encodeURIComponent(movieName); 
    
    const searchedMovies = await getSearchedMovies(encodedMovieName);

console.log(searchedMovies);

    displayMovies(searchedMovies, searchResultsContainer)
})
