<script lang="ts">
    export let data: { [key: string]: { wow: number; lol: number; color: string } };

    import Nav from "$lib/pages/index/nav.svelte";
    import Body from "$lib/pages/index/body.svelte";
</script>

<Nav />
<Body {data} />
