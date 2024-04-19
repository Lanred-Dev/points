<script lang="ts">
    //component props
    export let position: string;
    export let element: HTMLElement;
</script>

<div class="h-1/2" bind:this={element}>
    <div class="absolute left-1/2 w-full {position} flex -translate-x-1/2 flex-col items-center justify-center gap-4">
        <slot />
    </div>
</div>
