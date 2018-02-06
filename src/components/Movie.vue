<template>
    <div>
        <div>
            <app-nav></app-nav>
            <h1 class="text-center mt-2">Movies</h1>
        </div>
        <b-container fluid>
            <b-row>
                <div class="col-sm-4" v-for="(movie, index) in movies">
                    <div>
                        <b-card class="mb-4" 
                            v-bind:title="movie.display_title"
                            v-bind:sub-title="movie.opening_date | formatDate"
                        >
                            <b-button>View More</b-button>
                        </b-card>
                    </div>
                </div>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import Vue from 'Vue';
    import moment from 'moment';
    import AppNav from './AppNav';
    import { getMovies } from '../../utils/movies-api';
    import { Card, Button, Layout } from 'bootstrap-vue/es/components';

    Vue.use(Card)
    Vue.use(Button)
    Vue.use(Layout);

    Vue.component('b-row')
    Vue.component('b-card')
    Vue.component('b-button')
    Vue.component('b-container')

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
            formatDate: date => date !== null ? moment(date).format('MMM D, YYYY') : '-',
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