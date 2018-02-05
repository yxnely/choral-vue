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
                        <div class="card-body">
                            <h3 class="card-title"> {{ movie.display_title }} </h3>
                            <button class="btn btn-primary">View More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
        methods: {
            getAllMovies() {
                getMovies().then((res) => {
                    console.log(this);
                    this.movies = res.results;
                });
            },
        },
        mounted() {
            this.getAllMovies();
        },
    };
</script>