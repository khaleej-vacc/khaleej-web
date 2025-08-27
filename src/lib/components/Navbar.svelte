<script lang="ts">
	import {
		// Getting Started
		Rocket,
		Star,
		UserPlus,
		GraduationCap,

		// Pilots
		Plane,
		CalendarHeart,
		CalendarPlus,
		Map,

		// Controllers
		Radar,
		Rss,
		UserRoundSearch,
		// UserRoundCheck,
		BookText,

		// About
		Info,
		UsersRound,
		HeartHandshake,
		Mails,
		Headset,

		// Mobile
		Menu
	} from 'lucide-svelte';

	const onclick = (e: any) => {
		for (const details of document.querySelectorAll('details')) {
			if (!details.querySelector('summary')?.contains(e.target)) details.open = false;
		}
	};
</script>

<svelte:document {onclick} />

<!-- Drawer Wrapper -->
<div class="drawer drawer-end">
	<!-- Drawer Toggle -->
	<input id="mobile-drawer" type="checkbox" class="drawer-toggle" />

	<div class="drawer-content flex flex-col">
		<div class="navbar bg-transparent px-8">
			<div class="navbar-start">
				<a href="/" aria-label="Home" class="transition-opacity hover:opacity-50">
					<enhanced:img src="../assets/images/logo_khaleej.png" alt="Logo" class="h-32 w-32" />
				</a>
			</div>

			<div class="navbar-center hidden lg:inline-flex">
				<ul class="menu menu-horizontal gap-1 px-1">
					<li>
						<details>
							<summary class="hover:bg-secondary hover:bg-opacity-50">
								<Rocket size={20} /> Getting Started
							</summary>

							<ul class="menu menu-vertical bg-secondary bg-opacity-50">
								<li><a href="/new"><Star size={20} />New to VATSIM</a></li>
								<li><a href="/join"><UserPlus size={20} />Join Khaleej</a></li>
								<li><a href="/atc/training"><GraduationCap size={20} />ATC Training</a></li>
							</ul>
						</details>
					</li>

					<li>
						<details>
							<summary class="hover:bg-secondary hover:bg-opacity-50">
								<Plane size={20} /> Pilots
							</summary>

							<ul class="menu menu-vertical min-w-max bg-secondary bg-opacity-50">
								<li><a href="/events"><CalendarHeart size={20} />Events</a></li>
								<li><a href="/events/booking"><CalendarPlus size={20} />Event Booking</a></li>
								<li><a href="/charts"><Map size={20} />Airports & Charts</a></li>
							</ul>
						</details>
					</li>

					<li>
						<details>
							<summary class="hover:bg-secondary hover:bg-opacity-50">
								<Radar size={20} /> Controllers
							</summary>

							<ul class="menu menu-vertical min-w-max bg-secondary bg-opacity-50">
								<li><a href="/atc/feedback"><Rss size={20} />ATC Feedback</a></li>
								<li><a href="/atc/roster"><UserRoundSearch size={20} />ATC Roster</a></li>
								<li><a href="https://docs.khaleejvacc.net/" target="_blank"><BookText size={20} />Documentation</a></li>
							</ul>
						</details>
					</li>

					<li>
						<details>
							<summary class="hover:bg-secondary hover:bg-opacity-50">
								<Info size={20} /> About
							</summary>

							<ul class="menu menu-vertical min-w-max bg-secondary bg-opacity-50">
								<li><a href="/staff"><UsersRound size={20} />Staff</a></li>
								<li><a href="/policies"><HeartHandshake size={20} />Policies</a></li>
								<li><a href="/contact"><Mails size={20} />Contact</a></li>
								<li><a href="https://hayya.vatsim.me/" target="_blank"><Headset size={20} />HQ</a></li>
							</ul>
						</details>
					</li>
				</ul>
			</div>

			<div class="navbar-end hidden lg:inline-flex">
				<div class="inline-flex flex-row">
					<a href="/join" class="btn btn-outline btn-secondary">Join Now</a>
				</div>
			</div>

			<div class="navbar-end lg:hidden">
				<label for="mobile-drawer" class="btn btn-square btn-ghost hover:bg-secondary hover:bg-opacity-50">
					<Menu size={28} />
				</label>
			</div>
		</div>
	</div>

	<div class="drawer-side">
		<label for="mobile-drawer" aria-label="close sidebar" class="drawer-overlay"></label>

		<ul class="menu min-h-full w-80 bg-base-200 p-4">
			<li class="menu-title">Getting Started</li>
			<li><a href="/new"><Star size={20} />New to VATSIM</a></li>
			<li><a href="/join"><UserPlus size={20} />Join Khaleej</a></li>
			<li><a href="/atc/training"><GraduationCap size={20} />ATC Training</a></li>

			<li class="menu-title">Pilots</li>
			<li><a href="/events"><CalendarHeart size={20} />Events</a></li>
			<li><a href="/events/booking"><CalendarPlus size={20} />Event Booking</a></li>
			<li><a href="/charts"><Map size={20} />Airports & Charts</a></li>

			<li class="menu-title">Controllers</li>
			<li><a href="/atc/feedback"><Rss size={20} />ATC Feedback</a></li>
			<li><a href="/atc/roster"><UserRoundSearch size={20} />ATC Roster</a></li>
			<li><a href="https://docs.khaleejvacc.net/" target="_blank"><BookText size={20} />Documentation</a></li>

			<li class="menu-title">About</li>
			<li><a href="/staff"><UsersRound size={20} />Staff</a></li>
			<li><a href="/policies"><HeartHandshake size={20} />Policies</a></li>
			<li><a href="/contact"><Mails size={20} />Contact</a></li>
			<li><a href="https://hayya.vatsim.me/" target="_blank"><Headset size={20} />HQ</a></li>
		</ul>
	</div>
</div>

<style lang="postcss">
	@media (hover: hover) {
		@supports (color: oklch(0% 0 0)) {
			:where(.menu li:not(.menu-title, .disabled) > *:not(ul, details, .menu-title)):not(.active, .btn):hover {
				@apply bg-secondary;
			}
		}
	}

	.menu li > *:not(ul, .menu-title, details, .btn):active,
	.menu li > *:not(ul, .menu-title, details, .btn).active,
	.menu li > details > summary:active {
		@apply bg-secondary;
		@apply text-white;
	}
</style>
