<script lang="ts">
	import { db } from '$lib/db.js'
	import { Table, tableMapperValues, toastStore, type ToastSettings } from '@skeletonlabs/skeleton'
	import type { TableSource } from '@skeletonlabs/skeleton'
	import { fail } from '@sveltejs/kit'

	export let data
	const tableData = data.messages || []
	const facultyData = data.faculties || []

	const tableSimple: TableSource = {
		head: ['ID', 'User', 'Message'],
		body: tableMapperValues(tableData, ['id', 'user', 'message']),
		meta: tableMapperValues(tableData, ['id'])
	}

	const facultyTableData: TableSource = {
		head: ['Name', 'Department'],
		body: tableMapperValues(facultyData, ['Name', 'Department']),
		foot: ['Total faculties', facultyData.length.toString()]
	}

	$: id = 0

	const successMSG: ToastSettings = {
		message: 'Succesfully deleted the broadcast',
		background: 'variant-filled-success'
	}

	const deleteToast: ToastSettings = {
		message: `Do you want to delete the selected broadcast?`,
		autohide: false,
		action: {
			label: 'Delete',
			response: async () => {
				const { error } = await db.from('messages').delete().eq('id', id)
				if (error) return fail(500, { message: error })
				toastStore.trigger(successMSG)
				location.reload()
			}
		},
		background: 'variant-filled-warning'
	}

	// clear queue on refresh
	toastStore.clear()
</script>

<section class="p-6 space-y-6">
	<h1>Our database</h1>
	<hr />
	<h3>Broadcast table</h3>
	{#if tableData.length > 0}
		<Table
			source={tableSimple}
			interactive={true}
			on:selected={(el) => (id = el.detail[0])}
			on:selected={() => toastStore.trigger(deleteToast)}
		/>
	{:else}
		<h6 class="text-center">No record found</h6>
	{/if}
	<hr />
	<h3>Faculty table</h3>
	{#if facultyData.length > 0}
		<Table source={facultyTableData} />
	{:else}
		<h6 class="text-center">No record found</h6>
	{/if}
</section>
