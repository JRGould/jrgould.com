<template>
	<div>
		<p>Sorry, nothing here!<br>
		<router-link to="/">Go Home</router-link></p>
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style scoped>
	div{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		flex-grow: 1;
		padding-bottom: 20vh;
	}
	p{
		font-size: 2em;
		line-height: 1.5;
		text-align: center;
	}
</style>