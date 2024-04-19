<script lang="ts">
    //component props
    export let outerClasses: string = "";
    export let innerClasses: string = "";
    export let href: string;
        
    import { twMerge } from "tailwind-merge";
</script>

<a class={`pixelated-corners ${twMerge("bg-black p-1", outerClasses)}`} href={href}>
    <span class={`pixelated-corners ${twMerge("bg-accent px-6 py-2 text-xl text-black", innerClasses)}`}>
        <slot />
    </span>

    <slot name="outerContainer"></slot>
</a>
