<script lang="ts">
    //component props
    export let data: { wow: number; lol: number; person: string };
    export let vote: (upvote: boolean) => void;
    export let canVote: boolean;
    export let lolContainer: HTMLElement;
    export let wowContainer: HTMLElement;

    import Vote from "./vote.svelte";
    import VoteButton from "./button.svelte";
</script>

<div class="absolute left-0 top-0 h-screen w-screen [&>*]:w-screen">
    <Vote position="top-10" bind:element={wowContainer}>
        <VoteButton button="wow" {vote} {canVote} />

        <p class="text-3xl">{data.wow} votes</p>
    </Vote>

    <Vote position="bottom-10" bind:element={lolContainer}>
        <p class="text-3xl">{data.lol} votes</p>

        <VoteButton button="lol" {vote} {canVote} />
    </Vote>
</div>
