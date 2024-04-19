<script lang="ts">
    //component props
    export let data: { [key: string]: { wow: number; lol: number; color: string } } = {};

    import Person from "../components/person.svelte";

    $: people = Object.entries(data).map(([key, value]) => ({
        person: key,
        ...value,
    }));
</script>

<div class="flex h-fit w-full flex-col items-start justify-center gap-4">
    {#each people as person}
        <Person {person} />
    {/each}
</div>
