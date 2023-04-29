<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css'
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css'
	// Most of your app wide CSS should be put in this file
	import '../../app.postcss'
	import { AppShell, Toast, toastStore, type ToastSettings } from '@skeletonlabs/skeleton'

	import { page } from '$app/stores'
	import type { ActionData, PageData } from './$types'
	import { enhance } from '$app/forms'
	import { fly } from 'svelte/transition'

	import FlashSvg from '$lib/icons/FlashSVG.svelte'
	import CalenderSvg from '$lib/icons/CalenderSVG.svelte'
	import BookmarkSvg from '$lib/icons/BookmarkSVG.svelte'
	import ProfileSvg from '$lib/icons/ProfileSVG.svelte'
	import AddSvg from '$lib/icons/AddSVG.svelte'
	import MessageSvg from '$lib/icons/MessageSVG.svelte'
	import BellSvg from '$lib/icons/BellSVG.svelte'
	import SendSvg from '$lib/icons/SendSVG.svelte'
	import { afterUpdate } from 'svelte'
	import { browser } from '$app/environment'
	import DatabaseSvg from '$lib/icons/DatabaseSVG.svelte'
	import { messenger } from '$lib/ts/store/messenger'

	function initials(name: string, arg?: { period: boolean }): string {
		arg = arg || { period: false }
		return name
			.trim()
			.split(' ')
			.map((char): string => char[0])
			.join(arg.period ? '.' : '')
	}

	$: path = $page.url.pathname

	export let data: PageData
	export let form: ActionData

	const name = data.user.split(';')[0] || 'John Doe'
	const role = data.user.split(';')[2] || 'Developer'

	const errorMSG: ToastSettings = {
		message: form?.error || 'Something went wrong',
		background: 'variant-filled-error'
	}

	let showMessage = false
	let div: HTMLDivElement
	let text: string

	if (browser) afterUpdate(() => div?.scrollTo(0, div?.scrollHeight))

	if (form?.error) toastStore.trigger(errorMSG)
</script>

<Toast />

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<div id="sidebar" class="border-r-2 border-surface-700">
			<div class="flex flex-col gap-6">
				<section class="flex gap-3 items-center">
					<div class="w-12 h-12 flex-shrink-0 grid place-items-center bg-surface-500 rounded-full">
						<span class="font-semibold text-xs">{initials(name, { period: true })}</span>
					</div>
					<div>
						<h5>{name}</h5>
						<p class="mt-0.5 !text-sm text-surface-100/40">{role}</p>
					</div>
				</section>
				<hr />
				<section class="-mx-6 space-y-4">
					<!-- Dashboard / Home -->
					<a href="/" class:active={path === '/'}>
						<FlashSvg filled={path === '/'} />
						Dashboard
					</a>
					<!-- Schedule -->
					<a href="/schedule" class:active={path === '/schedule'}>
						<CalenderSvg filled={path === '/schedule'} />
						My schedule
					</a>
					<!-- Subjects -->
					<a href="/course" class:active={path === '/course'}>
						<BookmarkSvg filled={path === '/course'} />
						My courses
					</a>
					<!-- Database -->
					<a href="/database" class:active={path === '/database'}>
						<DatabaseSvg filled={path === '/database'} />
						Database
					</a>
					<!-- Profile -->
					<a href="/profile" class:active={path === '/profile'}>
						<ProfileSvg filled={path === '/profile'} />
						My profile
					</a>
				</section>
				<section>
					<a
						href="/"
						type="button"
						class="btn btn-lg !gap-0 flex-col variant-filled-secondary capitalize"
					>
						<AddSvg width="40" filled={true} />
						Create
					</a>
				</section>
			</div>
		</div>
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
	<!-- Right side bar -->
	<svelte:fragment slot="sidebarRight">
		<div id="sidebar" class="flex flex-col gap-6">
			<section class="flex justify-between items-center">
				<a href="/" id="logo" class="unstyled font-semibold text-xl">FYP24</a>
				<div class="space-x-4">
					<button on:click={() => (showMessage = !showMessage)}
						><MessageSvg filled={showMessage} /></button
					>
					<button><BellSvg /></button>
				</div>
			</section>
			<hr />
			<!-- message -->
			{#if showMessage}
				<section transition:fly={{ x: 200 }}>
					<div class="bg-surface-900 p-3 rounded-xl h-60 overflow--hidden">
						<div class="overflow-y-scroll space-y-4 h-full" bind:this={div}>
							{#if data.messages.length > 0}
								{#each data.messages as { user, message, created_at }}
									<div class="flex flex-col gap-2">
										<div class="flex items-center gap-1 [&>*]:!text-xs font-semibold">
											<p class="text-primary-600">{user.split(' ')[0]}</p>
											<!-- TODO: Add readable timestamp -->
											<p class="text-surface-100/40">
												<span>&bullet;</span>
												<span>date here</span>
											</p>
										</div>
										<p class="unstyled text-xs font-medium">{message}</p>
										<hr />
									</div>
								{/each}
							{:else}
								<h4 class="h-full grid place-content-center">No messages</h4>
							{/if}
						</div>
					</div>
					<form action="/?/send" method="post" class="pt-3 flex justify-between gap-2" use:enhance>
						<input
							type="text"
							name="message"
							placeholder="Type a message"
							class="input"
							bind:value={text}
						/>
						<button
							class="btn-icon flex-shrink-0 rotate-45 variant-filled-surface"
							disabled={!text || !text.trim().length}><SendSvg /></button
						>
					</form>
				</section>
			{/if}
			{#if $messenger?.id}
				<section transition:fly={{ x: 200 }}>
					<div class="variant-soft-warning p-3 rounded-xl space-y-3">
						<h6>Do you want to delete the selected message?</h6>
						<div class="variant-filled-surface px-3 py-2 rounded-xl">
							<p class="unstyled text-xs font-semibold mb-1">
								{$messenger.user} &bullet; id {$messenger.id}
							</p>
							<p class="unstyled text-sm font-medium">{$messenger.message}</p>
						</div>
						<div class="flex justify-end items-center gap-3">
							<form method="post" action="/database?/deleteMessage">
								<button class="btn btn-sm variant-filled-primary" name="id" value={$messenger.id}
									>Yes</button
								>
							</form>
							<button class="btn btn-sm variant-ringed-primary" on:click={() => messenger.set(null)}
								>No</button
							>
						</div>
					</div>
				</section>
			{/if}
		</div>
	</svelte:fragment>
	<!-- ---- / ---- -->
</AppShell>

<style lang="postcss">
	#sidebar {
		@apply min-h-full w-64 p-6 bg-surface-800;
	}
	#sidebar section > * + * {
		margin-top: 0.25rem;
	}
	#sidebar section a:not(#logo) {
		display: flex;
		align-items: center;
		gap: 1rem;
		text-decoration: none;
		color: inherit;
		font-weight: 500;

		padding: 0.75rem 1.5rem;
	}

	#sidebar section a.active {
		@apply bg-secondary-500;
	}
</style>
