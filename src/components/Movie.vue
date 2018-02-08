<template>
    <div>
        <div>
            <app-nav></app-nav>
            <h1 class="text-center mt-2">Movies</h1>
        </div>
        <b-container>
            <b-form-select v-model="selected" :options="options" class="mb-3" />
        </b-container>
        <b-container>
            <b-row>
                <b-col v-for="(movie, index) in movies"
                        v-bind:data="movie"
                        v-bind:key="index"
                        sm="12"
                        cols="12"
                        md="6"
                        lg="4">
                    <b-card class="mb-4" 
                        v-bind:title="movie.display_title"
                        v-bind:sub-title="movie.opening_date | formatDate">
                        <b-button variant="outline-secondary">View More</b-button>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import Vue from 'Vue';
    import moment from 'moment';
    import AppNav from './AppNav';
    import { getMovies } from '../../utils/movies-api';
    import { FormSelect, Card, Button, Layout } from 'bootstrap-vue/es/components';

    export default {
        name: 'movies',
        components: {
            FormSelect,
            AppNav,
            Button,
            Layout,
            Card,
        },
        data() {
            return {
                movies: '',
                selected: null,
                options: [
                    //
                ]
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