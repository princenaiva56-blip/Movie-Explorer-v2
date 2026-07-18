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

