<script lang="ts">
    import Button from "./button.svelte";

    //component props
    export let innerClasses: string = "";
    export let outerClasses: string = "";
    export let iconClasses: string = "";
    export let svg: boolean = false;
    export let click: any;

    import { twMerge } from "tailwind-merge";
</script>

<Button innerClasses={twMerge("flex items-center justify-center gap-4", innerClasses)} outerClasses={outerClasses} click={click}>
    {#if svg === true}
        <div class={twMerge("h-4 [&>*]:w-auto [&>*]:h-full", iconClasses)}>
            <slot name="icon" />
        </div>
    {:else}
        <slot class={twMerge("w-16", iconClasses)} name="icon" />
    {/if}

    <slot />
</Button>
