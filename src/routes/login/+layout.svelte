<script lang="ts">
	import BottomAppBar, { AutoAdjust, Section } from '@smui-extra/bottom-app-bar';
	import { Title } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';
	import FormField from '@smui/form-field';
	import Button, { Label } from '@smui/button';
	import Drawer, { AppContent, Content, Header, Subtitle, Scrim } from '@smui/drawer';
	import List, { Item, Text } from '@smui/list';

	let open = false;

	let bottomAppBar: BottomAppBar;

	let secondaryColor = false;

	let lightTheme =
		typeof window === 'undefined' || window.matchMedia('(prefers-color-scheme: light)').matches;
	function switchTheme() {
		lightTheme = !lightTheme;
		let themeLink = document.head.querySelector<HTMLLinkElement>('#theme');
		if (!themeLink) {
			themeLink = document.createElement('link');
			themeLink.rel = 'stylesheet';
			themeLink.id = 'theme';
		}
		themeLink.href = `/smui${lightTheme ? '' : '-dark'}.css`;
		document.head
			.querySelector<HTMLLinkElement>('link[href$="/smui-dark.css"]')
			?.insertAdjacentElement('afterend', themeLink);
	}
</script>

<AutoAdjust {bottomAppBar}>
  <AppContent class="app-content">
    <div class="container"><slot /></div>
  </AppContent>
</AutoAdjust>

<BottomAppBar
	bind:this={bottomAppBar}
	variant="fixed"
	color={secondaryColor ? 'secondary' : 'primary'}
>
	<Section>
		<IconButton class="material-icons" href="/">back</IconButton>
		<Title>TURoomTool2</Title>
	</Section>
	<Section>
		<IconButton class="material-icons" aria-label="Light/Dark Mode" on:click={switchTheme}
			>{lightTheme ? 'light_mode' : 'dark_mode'}</IconButton
		>
		<IconButton class="material-icons" aria-label="More">more_vert</IconButton>
	</Section>
</BottomAppBar>
<!-- TODO: How to override parent layout.svelte? -->