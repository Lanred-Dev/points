<!--TODO: only allow you to vote 1 time then you have to play a game to vote again-->

<script lang="ts">
    export let data: { wow: number; lol: number; person: string; color: string } = { wow: 0, lol: 0, person: "no one?", color: "#000000" };

    import Header from "$lib/pages/vote/header.svelte";
    import Votes from "$lib/pages/vote/votes.svelte";
    import Reveal from "$lib/pages/vote/reveal.svelte";

    import anime from "animejs";
    import { onMount } from "svelte";
    import db from "$lib/scripts/classes/db";
    let voteDB: db;
    let lolContainer: HTMLDivElement;
    let wowContainer: HTMLDivElement;
    let title: HTMLElement;
    let reveal: boolean = false;
    let revealUpvote: boolean = false;
    let canVote: boolean = false;

    function fadeItem(targets: HTMLElement | NodeList | HTMLElement[], opacity: number, complete?: any) {
        anime({
            targets: targets,
            easing: "linear",
            duration: 1500,
            opacity,
            complete,
        });
    }

    function revealFinish() {
        reveal = false;
        revealTitle();
    }

    function revealVote() {
        reveal = true;
    }

    function revealTitle() {
        fadeItem(title, 1);
    }

    function hideTitle() {
        fadeItem(title, 0, revealVote);
    }

    async function updateVotes(upvote: boolean) {
        //update the votes
        const post = await fetch("/vote", {
            method: "POST",
            body: JSON.stringify({
                vote: upvote === true ? 1 : 0,
                person: data.person,
            }),
        });
        const { wow, lol }: { wow: number; lol: number } = await post.json();
        data.wow = wow;
        data.lol = lol;
    }

    function vote(upvote: boolean) {
        if (canVote === false) return;

        canVote = false;
        voteDB.setItem(data.person, canVote);

        //do the reveal
        revealUpvote = upvote;
        hideTitle();

        //wait so that it does not update until the reveal is covering it
        setTimeout(function () {
            updateVotes(upvote);
        }, 2000);
    }

    function setContainerSizes() {
        lolContainer.style.height = "50%";
        wowContainer.style.height = "50%";
    }

    function setup() {
        voteDB = new db("data", "canVote");
        voteDB.getItem(data.person, function (value: boolean) {
            canVote = typeof value === "boolean" ? value : true;
        });

        setContainerSizes();
    }

    onMount(setup);
</script>

<!--todo: cleanup lib folder-->
<!--todo: make page more component like-->

<section class="relative flex h-screen w-screen flex-col items-center justify-center">
    <Header {data} bind:element={title} />
    <Votes {data} {vote} {canVote} bind:lolContainer bind:wowContainer />
</section>

{#if reveal === true}
    <Reveal bind:upvote={revealUpvote} done={revealFinish} />
{/if}
