
export function displayMovies(movies, container, showRemoveButton = false,      removeButtonText = "Remove") {

    container.innerHTML = "";

    movies.results.forEach(movie => {
        container.appendChild(createMovieCard(movie, showRemoveButton, removeButtonText))
    });
    
}

export function createMovieCard(movie, showRemoveButton = false, removeButtonText = "Remove") {

    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const card = document.createElement("div");

    card.classList.add("movie-card");

    card.dataset.id = movie.id;

    card.innerHTML = `
        <div class="movie-info">
            <img src="${posterUrl}" alt="">
            <h3>${movie.title}</h3>
            <p>${movie.release_date.slice(0, 4)}</p>
            ${showRemoveButton
            ? `<button class="remove-favorite">${removeButtonText}</button>`
            : ""}
        </div>
    `;

    const movieInfo = card.querySelector(".movie-info");

    movieInfo.addEventListener("click", (event) => {

        if (event.target.classList.contains("remove-favorite")) {
            return;
        }

        const movieId = card.dataset.id;
        window.location.href = `movie.html?id=${movieId}`;
    });

    return card;
}