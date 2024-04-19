<script lang="ts">
    //component props
    export let data: { [key: string]: { wow: number; lol: number; color: string } } = {};

    import Person from "../components/person.svelte";
</script>

<div class="w-full">
    <p class="text-3xl mb-2">daily vs</p>

    <div class="gap-1md:gap-4 relative flex w-full flex-col items-center justify-between md:flex-row">
        <Person person={{ person: "london", wow: 0, lol: 0, color: "" }} />

        <div class="vs-label z-[1] flex select-none gap-2 text-7xl md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
            <p>V</p>
            <p>S</p>
        </div>

        <Person person={{ person: "london", wow: 0, lol: 0, color: "" }} />
    </div>
</div>

<style>
    .vs-label {
        text-shadow: -4px -4px 0 #000, 0 -4px 0 #000, 4px -3px 0 #000, 4px 0 0 #000, 4px 4px 0 #000, 0 4px 0 #000, -4px 4px 0 #000, -4px 0 0 #000;
    }
</style>
