<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css'
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css'
	// Most of your app wide CSS should be put in this file
	import '../../../app.postcss'

	import { Toast, toastStore } from '@skeletonlabs/skeleton'
	import type { ToastSettings } from '@skeletonlabs/skeleton'

	export let form
	let text = ''

	const t: ToastSettings = {
		message: form?.message
	}

	if (form?.message) toastStore.trigger(t)
</script>

<Toast rounded="rounded-token" />

<form method="post" class="p-6 space-y-12 container mx-auto max-w-md h-screen">
	<div>
		<h1 class="mb-3">Register</h1>
		<p>You need to register frst to use the application.</p>
	</div>
	<!-- inputs -->
	<div class="space-y-6">
		<label class="label">
			<span>Your name</span>
			<input
				class="input"
				type="text"
				name="name"
				placeholder="Full name"
				bind:value={text}
				required
			/>
		</label>
		<label class="label">
			<span>Your email</span>
			<input class="input" type="email" name="email" placeholder="email@example.com (optional)" />
		</label>
		<div class="space-y-2 self-start">
			<h3 class="mb-3">Joining as</h3>
			<div class="flex gap-4 flex-wrap justify-between">
				<label class="flex items-center gap-3">
					<input class="radio !w-5 !h-5" type="radio" name="role" value="admin" required />
					<p>Admin</p>
				</label>
				<label class="flex items-center gap-3">
					<input class="radio !w-5 !h-5" type="radio" name="role" value="teacher" />
					<p>Teacher</p>
				</label>
				<label class="flex items-center gap-3">
					<input class="radio !w-5 !h-5" type="radio" name="role" value="developer" />
					<p>Developer</p>
				</label>
			</div>
		</div>
	</div>
	<div class="px-12">
		<button class="btn btn-lg variant-filled-primary w-full" disabled={!text || !text.trim().length}
			>Register</button
		>
	</div>
</form>
