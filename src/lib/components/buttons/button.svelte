<script lang="ts">
    //component props
    export let outerClasses: string = "";
    export let innerClasses: string = "";
    export let click: any;

    import { twMerge } from "tailwind-merge";
</script>

<button class={`pixelated-corners ${twMerge("bg-black p-1 hover:translate-y-1", outerClasses)}`} on:click={click}>
    <div class={`pixelated-corners ${twMerge("bg-accent px-6 py-2 text-xl text-black", innerClasses)}`}>
        <slot />
    </div>

    <slot name="outerContainer" />
</button>
