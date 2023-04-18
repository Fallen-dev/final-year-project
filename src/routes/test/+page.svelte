<script lang="ts">
	import Heading from '$lib/components/Heading.svelte';

	import schedule from '../../lib/ts/schedule';

	const result = schedule();
	console.log('######################');
	console.log(result[0].slots[0]);
</script>

{#each result as routine}
	<p>
		{routine.day_name} =>
		{#each routine.slots as slot}
			<code>{slot.subject} from {slot.start_time}</code>
		{/each}
	</p>
{/each}
