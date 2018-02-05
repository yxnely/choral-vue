<template>
    <nav class="navbar navbar-default">
        <div class="navbar-header">
            <router-link to="/" class="navbar-brand">Home</router-link>
        </div>
        <!-- <div class="dropdown pull-xs-right nav navbar-nav navbar-right">
            <button class="btn bmd-btn-icon dropdown-toggle" type="button" id="lr1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="material-icons">menu</i>
            </button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="lr1">
                <button class="dropdown-item" type="button">Action</button>
                <button class="dropdown-item" type="button">Another action</button>
                <button class="dropdown-item disabled" type="button">Disabled action</button>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Separated link</a>
            </div>
        </div> -->
    </nav>
</template>

<script>
    export default {
        name: 'app-nav',
        methods: {
            sayHi() {
                alert('hi!');
            },
        },
    }
</script>

<style scoped>
</style>