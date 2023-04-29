<script lang="ts">
	import { enhance } from '$app/forms'
	import EditSvg from '$lib/icons/EditSVG.svelte'
	import ExitSvg from '$lib/icons/ExitSVG.svelte'
	import { ListBox, ListBoxItem, toastStore } from '@skeletonlabs/skeleton'

	export let data
	export let form

	const name = data.user?.split(';')[0] || ''
	const role = data.user?.split(';')[2] || ''

	let newRole = role
	let newName = name

	const roles = ['admin', 'developer', 'faculty']

	let editName = false
	let editRole = false

	$: if (form?.updateDetails)
		toastStore.trigger({
			message: 'Details updated!',
			background: 'variant-filled-success'
		})
</script>

<h1 class="p-6">Your details</h1>
<hr class="mx-6" />
<section class="p-6 space-y-6 max-w-md mx-auto">
	<label class="label">
		<h6>Your name</h6>
		<div class="flex items-center gap-4">
			<input
				type="text"
				bind:value={newName}
				readonly={!editName}
				class="input w-auto"
				on:blur={() => (editName = false)}
			/>
			<button
				class="btn btn-sm shrink-0"
				class:variant-filled-primary={editName}
				on:click={() => (editName = !editName)}
			>
				<EditSvg filled={editName} /> <span>{editName ? 'Done' : 'Change'}</span>
			</button>
		</div>
	</label>
	<h6 class="flex items-center gap-2">
		You have joined as
		<span class="underline">{newRole}</span>
		<button
			class="btn btn-sm"
			class:variant-filled-primary={editRole}
			on:click={() => (editRole = !editRole)}
		>
			<EditSvg filled={editRole} />
			<span>{editRole ? 'Done' : 'Change'}</span>
		</button>
	</h6>
	{#if editRole}
		<ListBox>
			<div>
				{#each roles as role}
					<ListBoxItem bind:group={newRole} name="role" value={role}>
						<span class="capitalize">{role}</span>
					</ListBoxItem>
				{/each}
			</div>
		</ListBox>
	{/if}
	{#if (newName.trim() !== name && newName.trim().length != 0) || newRole !== role}
		<form method="post" action="?/updateDetails">
			<input name="newname" value={newName} hidden />
			<input name="newrole" value={newRole} hidden />
			<button class="btn w-full variant-filled-primary">Save changes</button>
		</form>
		<button
			class="btn w-full variant-ringed-primary"
			on:click|once={() => {
				newName = name
				newRole = role
				editName = editRole = false
			}}>Discard changes</button
		>
	{/if}

	<hr />
	<h3>Danger zone</h3>
	<form action="?/logout" method="post">
		<button class="btn variant-filled-error">
			<ExitSvg />
			<span>Logout</span></button
		>
	</form>
	<h6 class="text-error-600-300-token">
		Your data will be deleted after log out and you have to register again to continue use this
		website.
	</h6>
</section>
