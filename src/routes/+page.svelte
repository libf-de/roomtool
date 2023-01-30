<script lang="ts">
	import Button, { Label, Icon } from '@smui/button';

	let clicked = 0;

	function handleClick(event: CustomEvent | MouseEvent) {
		event = event as MouseEvent;
		if (event.button === 0) {
			clicked++;
		}
	}

	function reset() {
		clicked = 0;
	}
</script>

<p class="mdc-typography--body1">
	&larr; Wähle links ein Gebäude aus!
</p>

<Button href="/hsz">
	<Label>Hörsaalzentrum</Label>
</Button>
<Button href="/bar">
	<Label>Barkhausen-Bau</Label>
</Button>
<Button href="/che">
	<Label>Chemie-Bau</Label>
</Button>
<Button href="/apb">
	<Label>Andreas-Pfitzmann-Bau</Label>
</Button>
<Button href="/toe">
	<Label>Toepler-Bau</Label>
</Button>
<Button href="/gör">
	<Label>Görges-Bau</Label>
</Button>
<Button href="/foe">
	<Label>Fritz-Foerster-Bau</Label>
</Button>
<Button href="/sch">
	<Label>Georg-Schumann-Bau</Label>
</Button>