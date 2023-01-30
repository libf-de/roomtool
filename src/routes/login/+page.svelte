<script lang="ts">
	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';
	import HelperText from '@smui/textfield/helper-text';
	import Button, { Label } from '@smui/button';
	import FormField from '@smui/form-field';
	import Checkbox from '@smui/checkbox';

    /** @type {import('./$types').PageData} */  
	export let data;

    let username = data.username || '';
	let password = data.password || '';
    let checked = password != '';

	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<form action="?/login" method="POST">
	<div class="columns margins">
		{#if form?.credentials}
			<p class="error">ZIH-Login oder Passwort falsch!</p>
        {:else if data.loggedin}
            <p class="warning">Bereits angemeldet!</p>
		{:else}
			<p>Melde dich mit deinem ZIH-Login an:</p>
		{/if}

		<Textfield variant="outlined" bind:value={username} label="Username" input$name="username">
			<HelperText slot="helper">ZIH-Login</HelperText>
		</Textfield>

		<Textfield
			variant="outlined"
			bind:value={password}
			type="password"
			label="Password"
			input$name="password"
		>
			<HelperText slot="helper">Passwort</HelperText>
		</Textfield>

		<div>
			<FormField>
				<Checkbox bind:checked input$name="savePassword" />
				<span slot="label"> Passwort speichern </span>
			</FormField>
		</div>

		<Button type="submit" touch variant="raised">
			<Label>Login</Label>
		</Button>
	</div>
</form>

<form action="/" method="GET">
	<Button type="submit" touch variant="outlined">
		<Label>Zurück...</Label>
	</Button>
</form>
