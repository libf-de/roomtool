<script lang="ts">
	import BottomAppBar, { AutoAdjust, Section } from '@smui-extra/bottom-app-bar';
	
	import IconButton from '@smui/icon-button';
	import FormField from '@smui/form-field';
	import Button, { Label } from '@smui/button';
	import Drawer, { AppContent, Content, Header, Title, Subtitle, Scrim } from '@smui/drawer';
	import List, { Item, Text } from '@smui/list';

	let open = false;
	let active = 'Gray Kittens';

	function setActive(value: string) {
		active = value;
	}

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

<!-- 
    
  
    
  </div>-->
<div class="drawer-container">
<AutoAdjust {bottomAppBar}>
    <Drawer variant="modal" fixed={false} bind:open>
        <Header>
            <Title>Super Drawer</Title>
            <Subtitle>It's the best drawer.</Subtitle>
        </Header>
        <Content>
            <List>
                <Item
                    href="javascript:void(0)"
                    on:click={() => setActive('Gray Kittens')}
                    activated={active === 'Gray Kittens'}
                >
                    <Text>Gray Kittens</Text>
                </Item>
                <Item
                    href="javascript:void(0)"
                    on:click={() => setActive('A Space Rocket')}
                    activated={active === 'A Space Rocket'}
                >
                    <Text>A Space Rocket</Text>
                </Item>
                <Item
                    href="javascript:void(0)"
                    on:click={() => setActive('100 Pounds of Gravel')}
                    activated={active === '100 Pounds of Gravel'}
                >
                    <Text>100 Pounds of Gravel</Text>
                </Item>
                <Item
                    href="javascript:void(0)"
                    on:click={() => setActive('All of the Shrimp')}
                    activated={active === 'All of the Shrimp'}
                >
                    <Text>All of the Shrimp</Text>
                </Item>
                <Item
                    href="javascript:void(0)"
                    on:click={() => setActive('A Planet with a Mall')}
                    activated={active === 'A Planet with a Mall'}
                >
                    <Text>A Planet with a Mall</Text>
                </Item>
            </List>
        </Content>
    </Drawer>

    <Scrim fixed={false} />
  <AppContent class="app-content">
    <div class="container"><slot /></div>
  </AppContent>
	
</AutoAdjust>
</div>

<BottomAppBar
	bind:this={bottomAppBar}
	variant="fixed"
	color={secondaryColor ? 'secondary' : 'primary'}
>
	<Section>
		<IconButton class="material-icons" on:click={() => (open = !open)}>menu</IconButton>
		<Title>TURoomTool</Title>
	</Section>
	<Section>
		<IconButton class="material-icons" aria-label="Light/Dark Mode" on:click={switchTheme}
			>{lightTheme ? 'light_mode' : 'dark_mode'}</IconButton
		>
		<IconButton class="material-icons" aria-label="More">more_vert</IconButton>
	</Section>
</BottomAppBar>
