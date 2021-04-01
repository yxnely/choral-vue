const NY_TIMES_CONFIG = {
    url: 'https://api.nytimes.com/svc/movies/v2/reviews/search.json',
    key: '',
};

const IMBD_CONFIG = {
    url: 'http://www.omdbapi.com/',
    key: 'fed7077d',
};

export { getMovies };

const getMovieUrl = () => {
    return `${NY_TIMES_CONFIG.url}?api-key=${NY_TIMES_CONFIG.key}`;
}

const getMovieDetailUrl = (title, year) => {
    return `${IMBD_CONFIG.url}/?t=${title}&y=${year}&apiKey=${IMBD_CONFIG.key}`;
}

const getMovies = () => {
    return fetch(getMovieUrl())
        .then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error('Server response wasn\'t OK');
            }
        })
        .then((json) => {
            return json;
        });
}
		
