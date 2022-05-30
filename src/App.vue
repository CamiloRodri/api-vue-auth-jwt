<template>
	<div id="app" class="container-fluid">
		<Nav />
		<main>
			<router-view/>
		</main>
	</div>
</template>
<script>
import Nav from "@/components/Nav"
export default {
	components: {
		Nav
	}
}
</script>
<style>
    /* html,
	body {
		height: 100%;
	} */

	body {
		/* display: flex;
		align-items: center;
		padding-top: 40px;
		padding-bottom: 40px; */
		background-color: #47555e;
	}

	.form-signin {
		max-width: 330px;
		padding: 15px;
	}

	.form-signin .form-floating:focus-within {
		z-index: 2;
	}

	
</style>
