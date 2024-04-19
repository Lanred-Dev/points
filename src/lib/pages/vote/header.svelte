<script lang="ts">
    //component props
    export let data: { wow: number; lol: number, person: string };
    export let element: HTMLElement;
</script>

<header class="z-[1] px-8 lg:px-0" bind:this={element}>
    <h1 class="text-6xl lg:text-8xl">{data.person}</h1>
</header>
