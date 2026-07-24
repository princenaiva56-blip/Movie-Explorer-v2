
export function displayMovies(movies, container){
    container.innerHTML = "";

    movies.results.forEach(movie => {
        container.appendChild(createMovieCard(movie))
    });
    
}

export function createMovieCard(movie) {

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