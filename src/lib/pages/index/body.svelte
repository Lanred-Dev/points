<script lang="ts">
    //component props
    export let data: { [key: string]: { wow: number; lol: number; color: string } } = {};

    import DailyVs from "./sections/daily-vs.svelte";
    import People from "./sections/people.svelte";
</script>

<div class="flex h-fit w-screen flex-col items-start justify-center gap-8 px-5">
    <DailyVs {data} />

    <hr class="h-1 w-full border-none bg-black" />

    <People {data} />
</div>
