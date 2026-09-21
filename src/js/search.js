import { getSearchedMovies } from "./api/tmdb.js";
import { displayMovies } from "./ui/moviecard.js";
import { showMessage } from "./ui/status.js";

const searchForm = document.getElementById("search-form");
const userInput = document.querySelector("#search-input");
const searchResultsContainer = document.querySelector(".search-results");


searchForm.addEventListener("submit", async (event) => {

        event.preventDefault();
        
    const movieName = userInput.value.trim();

    if(!movieName){

        showMessage(searchResultsContainer, "Please enter a movie name.", "error");
        return;
    }

    showMessage(searchResultsContainer, "Searching for movies");

    try{
     //for inputs with special character
    const encodedMovieName = encodeURIComponent(movieName); 
    
    const searchedMovies = await getSearchedMovies(encodedMovieName);

    if(searchedMovies.results.length === 0) {
        showMessage(searchResultsContainer, "No movies found. Try another search.", "empty");
        return;
    }

     displayMovies(searchedMovies, searchResultsContainer)

    }

    catch (error){

        showMessage(searchResultsContainer, "Something went wrong. Please check your internet connection and try again.", "error")
    }
   
})
