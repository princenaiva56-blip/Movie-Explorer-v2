const apiKey = "305ba29eafe3130f149a78bcf39864f0";
const baseUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`

 export async function getTrendingMovies () {
    try {

        const response = await fetch(baseUrl);
        
        if(!response.ok){
            throw new Error("Failed to fetch")
        }
        
         const trendingData = await response.json();
         
         return trendingData;
        
        
    } catch (error) {
        return error.message;
    }
}

export async function getPopularMovies() {

    try{
        const response2 = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
            if(!response2.ok){
                throw new Error("Failed to fetch")
            }

        const popularData = await response2.json();
        return popularData;
        
    }

    catch(error){
        return error.message;
    }
}

export async function getTopRatedMovies(){
    try{
        const response3 = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`);
         if(!response3.ok){
                throw new Error("Failed to fetch")
            }

        const topRatedData = await response3.json();
        return topRatedData;
        
    }
    catch(error){
        return error.message;
        
    }
}

export async function getMovieDetails(movieId) {
    try {
        
        const response4 = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)

        if(!response4.ok){
            throw new Error("Failed to fetch movie details")
        }

        const detailsData = await response4.json();
       return detailsData;
        
    } catch (error) {
        return error.message;
        
    }
}

export async function getMovieVideos(movieId){
    try {
        const response5 = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`)

        if(!response5.ok){
            throw new Error("Failed to Fetch movie Videos")
        }

        const videosData = await response5.json();
        
        return videosData;
    } catch (error) {
        return error.message;
    }
}

export async function getSimilarMovies(movieId){

    try {
      
        const response6 = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`)

        if(!response6.ok){
            throw new Error("Failed to fetch similar movies")
        }

        const similarMoviesData = await response6.json()

        return similarMoviesData;
    } catch (error) {
        return error.message;
    }
}

export async function getMovieCredits(movieId){

    try {
        
        const  response7 = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`)

        if(!response7.ok){
            throw new Error("Failed to fetch credits")
        }

        const creditsData = await response7.json();

        return creditsData;
    } catch (error) {
        return error.message;
    }
}

export async function getSearchedMovies(encodedMovieName){

    try{

        const response8 = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodedMovieName}`) 

        if(!response8.ok){
            throw new Error("Failed to fetch search results")
        }

        const searchedMovies = await response8.json();
        
        return searchedMovies;
    }

    catch(error){
        return error.message;
    }
}

getSearchedMovies();
