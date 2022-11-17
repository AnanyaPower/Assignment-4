function getOption() {
    selectElement = document.querySelector('#movies');
    
    if (document.getElementById("movie")) {
        document.getElementById("movie").remove();
    }
    axios.get(`https://api.themoviedb.org/3/movie/${selectElement.value}`, {
        params: {
            api_key: "13fa5f30fd7d0d46db32924a921592e2",
            include_adult: "false",
            append_to_response: "videos",
        }
    }).then((movieData) => {
        const div = document.createElement("div");
        const img = document.createElement('img');
        const p = document.createElement('p');
        const iframe = document.createElement('iframe');
        div.id = "movie";

        const trailers = movieData.data.videos.results.filter((trailer) => trailer.type === "Trailer");
        iframe.src = `https://www.youtube.com/embed/${trailers.at(0).key}`
        img.src = `https://image.tmdb.org/t/p/w500${movieData.data.poster_path}`;
        p.innerHTML = `${movieData.data.title} ~ ${movieData.data.tagline} <br></br> Overview: ${movieData.data.overview} 
        <br></br> Release Date: ${movieData.data.release_date} 
        <br></br> Popularity: ${movieData.data.popularity} ~ Vote Average: ${movieData.data.vote_count} ~ Vote Count: ${movieData.data.vote_average} 
        <br></br> Budget: $${movieData.data.budget}`;

        div.append(p);
        div.append(img);
        div.append(iframe);
        document.body.append(div);

    });
}