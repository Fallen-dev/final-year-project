<script lang="ts">
	const hours = ['10:30', '11:30', '12:30', '13:30', '14:00', '15:00', '16:00', '17:00'] as string[]

	const days = ['mon', 'tue', 'wed', 'thu', 'fri'] as string[]

	const subjects = [
		{
			day: 1,
			from: 1,
			to: 2,
			name: 'PR',
			code: 'PCC-CS-592',
			teacher: 'M.I'
		},
		{
			day: 1,
			from: 2,
			to: 4,
			name: 'DBMS',
			code: 'PCC-CS-601',
			teacher: 'SNG'
		},
		{
			day: 1,
			from: 4,
			to: 5,
			name: 'break'
		},
		{
			day: 1,
			from: 5,
			to: 9,
			name: 'dbms lab',
			code: 'PCC-CS-651',
			teacher: 'SNG'
		},
		{
			day: 2,
			from: 1,
			to: 3,
			name: 'RM',
			code: 'PCC-CS-501',
			teacher: 'PB'
		},
		{
			day: 2,
			from: 3,
			to: 4,
			name: 'HR',
			code: 'PCC-CS-XXX',
			teacher: 'JR'
		},
		{
			day: 3,
			from: 2,
			to: 4,
			name: 'PR',
			code: 'PCC-CS-692',
			teacher: 'MI'
		},
		{
			day: 3,
			from: 4,
			to: 5,
			name: 'break'
		},
		{
			day: 3,
			from: 5,
			to: 7,
			name: 'DDBMS',
			code: 'PCC-CS-532',
			teacher: 'SM'
		},
		{
			day: 4,
			from: 1,
			to: 2,
			name: 'DBMS',
			code: 'PCC-CS-601',
			teacher: 'SNG'
		},
		{
			day: 4,
			from: 2,
			to: 4,
			name: 'CN',
			code: 'PCC-CS-542',
			teacher: 'AKK'
		},
		{
			day: 4,
			from: 4,
			to: 5,
			name: 'break'
		},
		{
			day: 4,
			from: 5,
			to: 9,
			name: 'CN LAB',
			code: 'PCC-CS-592',
			teacher: 'AKK'
		}
	] as Array<{
		day: number
		from: number
		to: number
		name: string
		code?: string
		teacher?: string
	}>
</script>

<section class="container p-6">
	<h3>{new Date().toDateString()}</h3>
	<div class="my-6" />
	<!-- Table -->
	<div class="bg-surface-800/40 backdrop-blur-lg rounded-lg p-6 min-h-[400px] overflow-x-hidden">
		<div id="table" class="hide-scrollbar">
			<!-- columns -->
			<p>&nbsp;</p>
			{#each hours as hour}
				<p class="font-medium">{hour}</p>
			{/each}
			<!-- rows -->
			{#each days as day, i}
				<p class="row-start-{++i + 1} row-end-{i + 1} col-start-1 capitalize font-medium">{day}</p>
			{/each}
			<!-- subjects -->
			{#each subjects as subject}
				<div
					id="subject"
					style="grid-column: {++subject.from} / {++subject.to};
					grid-row: {++subject.day} / {++subject.day};
				"
				>
					{#if subject.name === 'break'}
						<p class="name h-full grid place-items-center">{subject.name}</p>
					{:else}
						<p class="name">{subject.name}</p>
						<p class="code">{subject.code}</p>
						<p class="!text-sm font-semibold mt-2">
							By {subject.teacher}
						</p>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	#subject {
		@apply bg-tertiary-600 rounded-lg p-3 font-medium;

		& .name {
			font-weight: 600;
			text-transform: uppercase;
		}
		& .code {
			@apply text-xs;
		}
	}

	#table {
		display: grid;
		grid-template-columns: 4rem repeat(8, minmax(6rem, auto));
		grid-template-rows: 3rem repeat(5, minmax(4rem, auto));
		gap: 0.5rem;
		overflow: scroll;
	}
</style>
