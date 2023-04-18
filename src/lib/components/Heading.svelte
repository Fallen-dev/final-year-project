<script lang="ts">
	export let type = 'h3' satisfies 'h1' | 'h2' | 'h3' | 'h5' | 'h6'
</script>

{#if type === 'h1'}
	<h1 class="text-4xl {$$restProps.class}"><slot /></h1>
{:else if type === 'h2'}
	<h2 class="text-2xl {$$restProps.class}"><slot /></h2>
{:else if type === 'h3'}
	<h3 class="text-xl {$$restProps.class}"><slot /></h3>
{:else if type === 'h5'}
	<h5 class="text-lg {$$restProps.class}"><slot /></h5>
{:else if type === 'h6'}
	<h6 class="text-base {$$restProps.class}"><slot /></h6>
{/if}

<style>
	h1,
	h2,
	h3,
	h5,
	h6 {
		font-weight: 700;
	}
</style>
