<template>
	<header class="site-header">
		<h1><span>Jeff Gould</span></h1>
		<h2><span>Full-Stack Developer</span></h2>
		<h3><span>PHP, JavaScript, et. al.</span></h3>

	</header>
</template>

<script>
	export default {
		
	}
</script>

<style scoped>
	header {
		padding: 4em 0 0 0;
		
	}
	h1, h2, h3{
		margin: 0;
		font-weight: 300;
		text-transform: none;
		letter-spacing: -.04em;
		font-size: 3rem;
		border: 1px solid transparent;
		border-left: none;
	}
	span {
		background-color: var(--primary-color);
		padding: 0 .3em 0 .1em;
	}
	h3{
		font-size: 1.8rem;
		padding-left: .75em;
		
	}
	h3 span {
		background-color: var(--secondary-color);
	}
	h3:before{
		content: "";
		height: 0;
		position: absolute;
		left: 2px;
		--bw: .6em;
		border: var(--bw) solid transparent;
		border-right: var(--bw) solid var(--secondary-color);
	}
</style>