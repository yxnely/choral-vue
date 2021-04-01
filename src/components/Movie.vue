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
					v-bind:data="movie.display_title"
					v-bind:key="index"
					sm="12"
					cols="12"
					md="6"
					lg="4">
						<b-card class="mb-4" 
							v-bind:title="movie.display_title"
							v-bind:sub-title="movie.opening_date | formatDate">
							<b-button variant="outline-secondary" @click="getThisMovie(index)">View More</b-button>
						</b-card>
				</b-col>
			</b-row>
        </b-container>
        
        <div>
            <b-modal id="modal" v-bind:data="selected" ref="movieModal" :ok-only="true">
                <div v-if="selected !== null">
                    <b-img class='image' :src="selected.multimedia.src" fluid alt="Fluid image" />
                    <h2>{{ selected.display_title }}</h2>
                    <div class='modal-section'>
                        <span class='uppercase small-title'>Opening Date:</span>
                        <p>{{ selected.opening_date | formatDate }}</p>
                    </div>
                    <div class='modal-section'>
                        <span class='uppercase small-title'>Summary:</span>
                        <p>{{ selected.summary_short }}</p>
                    </div>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<style>
    p { margin: 0; }
    h2 { font-weight: bold; }

    .card-title {
        font-weight: 400 !important;
        margin-bottom: 20px !important;
    }

    .modal-header {
        padding: 10px 20px 0 !important;
    }

    .modal-body {
        margin: 0;
        padding: 10px 20px 0px !important;
    }

    .modal-section {
        margin-top: 20px;
    }

    .image {
        width: 100%;
        object-fit: cover;
        margin-bottom: 10px;
    }

    .small-title {
        color: rgba(0, 0, 0, .65);
        display: block;
        line-height: 10px;
    }

    .uppercase {
        text-transform: uppercase;
        font-size: 15px;
        font-weight: bold;
    }
</style>

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
                ],
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
                    this.allMovies = res.results;
                    this.movies = [];
                    
                    this.allMovies.forEach((movie) => {
                        if (movie.display_title !== '') {
                            this.movies.push(movie);
                        }
                    });

                    return this.movies;
                });
            },
            getThisMovie(idx) {
                this.selected = this.movies[idx];

                this.displayModal();
            },
            displayModal() {
                this.$refs.movieModal.show();
            },
        },
        mounted() {
            this.getAllMovies();
        },
    };
</script>