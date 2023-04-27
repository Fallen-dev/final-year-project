<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css'
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css'
	// Most of your app wide CSS should be put in this file
	import '../../app.postcss'
	import { AppShell } from '@skeletonlabs/skeleton'
	import { page } from '$app/stores'

	const routes = [
		{
			name: 'Dashboard',
			path: '/',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
</svg>
`
		},
		{
			name: 'My Schedule',
			path: '/schedule',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
`
		},
		{
			name: 'My Course',
			path: '/course',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
</svg>
`
		},
		{
			name: 'My Profile',
			path: '/profile',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
`
		}
	]

	const addIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2Zm0 5a1 1 0 0 0-.993.883L11 8v3H8a1 1 0 0 0-.117 1.993L8 13h3v3a1 1 0 0 0 1.993.117L13 16v-3h3a1 1 0 0 0 .117-1.993L16 11h-3V8a1 1 0 0 0-1-1Z"/></g></svg>`

	function initials(name: string, arg?: { period: boolean }): string {
		arg = arg || { period: false }
		return name
			.trim()
			.split(' ')
			.map((char): string => char[0])
			.join(arg.period ? '.' : '')
	}

	export let data

	const name = data.user.split(';')[0] || 'John Doe'
	const role = data.user.split(';')[2] || 'Developer'
</script>

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
					{#each routes as route}
						<a href={route.path} class:active={$page.url.pathname === route.path}
							>{#if route.icon}{@html route.icon}{/if}
							{route.name}</a
						>
					{/each}
				</section>
				<section>
					<button class="btn variant-filled-secondary capitalize">
						<span>{@html addIcon}</span>
						<span>Create</span>
					</button>
				</section>
			</div>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="sidebarRight">
		<div id="sidebar">
			<section>
				<h4 class="mb-3">Upcoming classes</h4>
				<div class="variant-glass py-2 px-3 rounded-md">
					<h6>Subject name</h6>
					<p class="!text-sm font-medium text-surface-100/60">PCC CS-592</p>
					<div id="classDetails" class="mt-2 flex flex-wrap gap-2 justify-between items-center">
						<p class="chip variant-soft">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
								><g fill="none" fill-rule="evenodd"
									><path
										d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"
									/><path
										fill="currentColor"
										d="M10.772 2.688a2 2 0 0 1 2.456 0l8.384 6.52c.753.587.337 1.792-.615 1.792H20v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8h-.997c-.953 0-1.367-1.206-.615-1.791l8.384-6.52ZM5.625 9.225c.229.185.375.468.375.785V19h12v-8.99c0-.317.146-.6.375-.785L12 4.267L5.625 9.225Z"
									/></g
								></svg
							>
							<span>#N304</span>
						</p>
						<p class="chip variant-soft">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
								><g fill="none"
									><path
										d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"
									/><path
										fill="currentColor"
										d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2Zm0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16Zm0 2a1 1 0 0 1 .993.883L13 7v4.586l2.707 2.707a1 1 0 0 1-1.32 1.497l-.094-.083l-3-3a1 1 0 0 1-.284-.576L11 12V7a1 1 0 0 1 1-1Z"
									/></g
								></svg
							>
							<span>10:30</span>
						</p>
					</div>
				</div>
			</section>
		</div>
	</svelte:fragment>
	<!-- Router Slot -->
	<div class="hide-scrollbar">
		<slot />
	</div>
	<!-- ---- / ---- -->
</AppShell>

<style lang="scss">
	#sidebar {
		@apply min-h-full w-64 p-6 bg-surface-800;
	}
	#sidebar section > * + * {
		margin-top: 0.25rem;
	}
	#sidebar section a {
		display: flex;
		align-items: center;
		gap: 1rem;
		text-decoration: none;
		color: inherit;
		font-weight: 500;

		padding: 0.75rem 1.5rem;

		&.active {
			@apply text-primary-900 variant-filled-primary;
		}
	}

	#classDetails p,
	#classDetails div,
	#classDetails span {
		@apply text-xs font-semibold;
	}
</style>
