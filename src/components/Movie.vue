<template>
    <div>
        <div>
            <app-nav></app-nav>
            <h1 class="text-center mt-2">Movies</h1>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-sm-4" v-for="(movie, index) in movies">
                    <div class="card mb-4">
                            <div class="card-header">{{ movie.mpaa_rating | rating }}</div>
                        <div class="card-body">
                            <h2 class="card-title">{{ movie.display_title }}</h2>
                            <h5 class="card-subtitle mb-2 text-muted">{{ movie.opening_date | formatDate }}</h5>
                            <button class="btn btn-primary">View More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    button {
        color: #FF3864;
    }
    .card-subtitle {
        text-transform: capitalize;
    }
</style>

<script>
    import moment from 'moment';
    import AppNav from './AppNav';
    import { getMovies } from '../../utils/movies-api';

    export default {
        name: 'movies',
        components: {
            AppNav,
        },
        data() {
            return {
                movies: '',
            };
        },
        filters: {
            capitalize: text => text.toLowerCase(),
            formatDate: date => date !== null ? moment(date).format('MMM D, YYYY') : 'N/A',
            rating: rate => rate !== '' ? rate : 'N/A',
        },
        methods: {
            getAllMovies() {
                getMovies().then((res) => {
                    this.movies = res.results;
                });
            },
        },
        mounted() {
            this.getAllMovies();
        },
    };
</script>