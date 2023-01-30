<script lang=ts>
	/** @type {import('./$types').PageData} */  
	export let data;

	import List, { Item, PrimaryText, SecondaryText, Separator, Text } from '@smui/list';
</script>

<h1>Freie Räume in {data.building.toUpperCase()}</h1>
<List class="room-list" twoLine nonInteractive>
	{#each data.data.timeslots as slot}
	{#each slot as siRoom}
	<Item>
		<Text>
			<PrimaryText>{siRoom.courseCatalogName}</PrimaryText>
			<SecondaryText>{data.data.timeslots.indexOf(slot)+1}. Stunde</SecondaryText>
		</Text>
	</Item>
	{/each}
	{/each}
    <Item><Text>Thing 1</Text></Item>
    <Separator />
    <Item activated><Text>Thing 2</Text></Item>
    <Item><Text>Thing 3</Text></Item>
    <Separator />
    <Item><Text>Thing 4</Text></Item>
</List>