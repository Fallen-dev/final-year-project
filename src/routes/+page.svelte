<script lang="ts">
	import newSchedule from '$lib/ts/newSchedule';

	import Heading from '$lib/components/Heading.svelte';

	const startHour = 10;
	const endHour = 18;
	const hours: number[] = [...Array(endHour + 1 - startHour).keys()].map((i) => i + startHour);

	const routine = newSchedule();

	let innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<section class="p-6 text-center space-y-12">
	<!-- heading -->
	<div class="max-w-4xl mx-auto">
		<Heading type="h1">Routine scheduling system</Heading>
	</div>
	<!-- table -->
	<div>
		<Heading>Routine</Heading>
		<div class="overflow-x-auto">
			<table class="table w-full" class:table-compact={innerWidth < 768}>
				<!-- head -->
				<!-- <thead>
					<tr>
						<th />
						{#each hours as hour}
							<th class="md:text-base">{hour}:00</th>
						{/each}
					</tr>
				</thead> -->
				<tbody>
					<!-- ROWS -->
					{#each routine as { day_name, slots }}
						<tr>
							<th>{day_name.toUpperCase()}</th>
							{#each slots as { subject, professor, start_time }}
								<td>
									<div class="font-semibold">
										{#if subject}
											<div class="badge badge-primary rounded">
												<p>From {start_time}:00</p>
											</div>
											<p>{subject.toUpperCase()}</p>
										{:else}
											<div
												class="py-6 grid place-items-center bg-accent/20 text-accent-content text-sm"
											>
												No class
											</div>
										{/if}
										{#if professor}
											<p class="text-sm opacity-75">{professor.toUpperCase()}</p>
										{/if}
									</div>
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</section>
