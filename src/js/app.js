
import Vue from 'vue';

const url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";

new Vue({
    el: '#card',
	data: {
		article_search: '',
		movies: '',
		byline: '',
		keywords: [],
		api_key: 'afbbea547c7a452fb7d6cce8307cbb19',
	},
	beforeMount() {
		const movieUrl = `${url}?api-key=${this.api_key}`;

		fetch(movieUrl)
		.then((res) => res.json())
		.then((res) => {
			this.movies = res.results
		})
	},
	methods: {
		// searchArticle: function () {
		// 	var app = this
		// 	var searchUrl = `${url}?api-key=${app.api_key}&q=${app.article_search}`;

		// 	fetch(searchUrl)
		// 	.then((res) => res.json())
		// 	.then((res) => {
		// 		app.articles = res.response.docs
		// 	})
		// }
	}
});