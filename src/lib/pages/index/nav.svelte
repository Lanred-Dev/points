<script lang="ts">
    import IconButton from "$lib/components/buttons/icon.svelte";
    import HamburgerIcon from "$lib/components/images/hamburger.svelte";

    function toggle() {}
</script>

<nav class="flex w-screen items-center justify-end p-4">
    <IconButton innerClasses="p-3" iconClasses="h-6" svg={true} click={toggle}>
        <HamburgerIcon slot="icon" />
    </IconButton>
</nav>
