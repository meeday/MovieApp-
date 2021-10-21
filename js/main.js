var apiKey = "8a8fc148";

$(document).ready(function () {
    $('#searchForm').on('submit', function (e) {
        e.preventDefault()
        var searchText = $('#searchText').val()
        getMovies(searchText)
    })
})

function getMovies(searchText) {
    fetch(`http://omdbapi.com?s=${searchText}&apikey=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.Response === 'False') {
                $('#movies').html(`<h2 class="text-danger text-center">${data.Error}</h2>`)
            }

            var movies = data.Search
            var output = "";

            movies.map(function (movie) {
        output += `
        <div class="col-md-3">
            <div class="well text-center">
                <img src="${movie.Poster}">
                <h5 class="text-truncate">${movie.Title}</h5>
                <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
        </div>
           `
            })
            $("#movies").html(output)
        }).catch(function(error){
            console.log(error);
        })
}

function movieSelected(id) {
    localStorage.setItem('movieId', id);
    window.location = 'movie.html'
}

function getMovie() {
    var movieId = localStorage.getItem('movieId')
    fetch(`http://omdbapi.com?i=${movieId}&apikey=${apiKey}`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        var output = `
        <div class="row">
    <div class="col-md-4">
        <img src="${data.Poster}" class="thumbnail">
    </div>
    <div class="col-md-8">
        <h2>${data.Title}</h2>
        <ul class="list-group ">
            <li class="list-group-item list-group-item-dark"><strong>Genre: </strong>${data.Genre}</li>
            <li class="list-group-item list-group-item-dark"><strong>Released: </strong>${data.Released}</li>
            <li class="list-group-item list-group-item-dark"><strong>Rated: </strong>${data.Rate}</li>
            <li class="list-group-item list-group-item-dark"><strong>IMDB Rating: </strong>${data.imdbRating}</li>
            <li class="list-group-item list-group-item-dark"><strong>Director: </strong>${data.Director}</li>
            <li class="list-group-item list-group-item-dark"><strong>Writer: </strong>${data.Writer}</li>
            <li class="list-group-item list-group-item-dark"><strong>Actors: </strong>${data.Actors}</li>
        </ul>
    </div>
</div>
<div class="row">
    <div class="well">
        <h3>Plot</h3>
        ${data.Plot}
        <hr>
        <a href="http://imdb.com/title/${data.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
        <a href="index.html" class="btn btn-light">Go Back To Search</a>
    </div>
</div>
        `;
        $("#movie").html(output)
    })
    .catch(function(error){
        console.log(error);
    })
}