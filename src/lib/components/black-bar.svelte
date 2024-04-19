<script lang="ts">
    //component props
    export let classes = "";
    export let element: HTMLDivElement;

    import { twMerge } from "tailwind-merge";
</script>

<div class={twMerge("h-[25%] w-full bg-black absolute left-0", classes)} bind:this={element} />
