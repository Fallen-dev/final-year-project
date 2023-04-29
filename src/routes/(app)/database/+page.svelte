<script lang="ts">
	import { messenger } from '$lib/ts/store/messenger'
	import { Table, tableMapperValues, toastStore, type ToastSettings } from '@skeletonlabs/skeleton'
	import type { TableSource } from '@skeletonlabs/skeleton'
	import type { ActionData, PageData } from './$types'

	export let data: PageData
	export let form: ActionData

	const tableData = data.messages || []
	const facultyData = data.faculties || []

	const messageTableData: TableSource = {
		head: ['ID', 'User', 'Message'],
		body: tableMapperValues(tableData, ['id', 'user', 'message']),
		meta: tableMapperValues(tableData, ['id', 'user', 'message']),
		foot: ['Total messages', '', tableData.length.toLocaleString()]
	}

	const facultyTableData: TableSource = {
		head: ['Name', 'Department'],
		body: tableMapperValues(facultyData, ['Name', 'Department']),
		foot: ['Total faculties', facultyData.length.toLocaleString()]
	}

	const successMSG: ToastSettings = {
		message: 'Succesfully deleted the broadcast',
		background: 'variant-filled-success'
	}

	const erorMSG: ToastSettings = {
		message: data?.error || form?.error,
		background: 'variant-filled-error'
	}

	const updateMSG = (detail: [number, string, string]) =>
		messenger.set({
			id: detail[0],
			user: detail[1].split(' ')[0],
			message: detail[2]
		})

	if (data?.error || form?.error) toastStore.trigger(erorMSG)
	if (form?.messageDeletedSuccess) toastStore.trigger(successMSG)
</script>

<section class="p-6 space-y-6">
	<h1>Our database</h1>
	<hr />
	<h3>Broadcast table</h3>
	<p>You can delete the broadcast messages of this database.</p>
	{#if tableData.length > 0}
		<Table
			source={messageTableData}
			interactive={true}
			regionFootCell="bg-surface-700"
			regionFoot="font-semibold"
			on:selected={(el) => updateMSG(el.detail)}
		/>
	{:else}
		<h6 class="text-center">No record found</h6>
	{/if}
	<hr />
	<h3>Faculty table</h3>
	<p>This table is read-only and cannot be modified.</p>
	{#if facultyData.length > 0}
		<Table source={facultyTableData} regionFootCell="bg-surface-700" regionFoot="font-semibold" />
	{:else}
		<h6 class="text-center">No record found</h6>
	{/if}
</section>
