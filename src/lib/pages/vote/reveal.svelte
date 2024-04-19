<script lang="ts">
    import BlackBar from "../../components/black-bar.svelte";
    import CoolPixelGlasses from "../../components/images/cool-pixel-glasses.svelte";
    import PixelGlasses from "../../components/images/pixel-glasses.svelte";
    import GridBackground from "$lib/components/backgrounds/grid.svelte";
    import Confetti from "../../components/backgrounds/confetti.svelte";

    //component props
    export let upvote: boolean = false;
    export let done: () => any;

    import { onMount } from "svelte";
    import anime from "animejs";
    import randomNumber from "$lib/scripts/functions/randomNumber";
    let container: HTMLElement;
    let topBar: HTMLDivElement;
    let bottomBar: HTMLDivElement;
    let glasses: HTMLDivElement;
    let text: HTMLParagraphElement;
    let cycleGridColor: (color: string) => void;
    let startConfetti: () => void;

    function getRotation(): number {
        const number: number = Math.random() > 0.5 ? -randomNumber(3, 7) : randomNumber(3, 7);
        return Math.floor(number);
    }

    function itemRevealAnimation(targets: HTMLElement | NodeList | HTMLElement[], complete?: any) {
        anime({
            targets,
            easing: "easeOutBack",
            duration: 1500,
            scale: 1,
            opacity: 1,
            rotate: getRotation(),
            complete,
        });
    }

    function finish() {
        anime({
            targets: container,
            easing: "easeOutBack",
            duration: 1500,
            opacity: 0,
            complete: done as any,
        });
    }

    function revealBackground() {
        cycleGridColor(upvote === true ? "#3b628e" : "#8e3b3b");
        setTimeout(finish, 3500);
    }

    function revealText() {
        itemRevealAnimation(text, () => {
            setTimeout(revealBackground, 2500);
        });
    }

    function revealGlasses() {
        itemRevealAnimation(glasses);
    }

    function revealBlackBars() {
        anime({
            targets: [topBar, bottomBar],
            easing: "easeOutQuint",
            duration: 1500,
            translateY: 0,
            complete: () => {
                setTimeout(startConfetti, 750);
                setTimeout(revealText, 1750);
                setTimeout(revealGlasses, 1000);
            },
        });
    }

    function setup() {
        topBar.style.transform = "translateY(-100%)";
        bottomBar.style.transform = "translateY(100%)";
        glasses.style.opacity = "0";
        glasses.style.transform = "scale(0.2) rotate(0)";
        text.style.opacity = "0";
        text.style.transform = "scale(0.2) rotate(0)";

        //now start the reveal
        setTimeout(revealBlackBars, 500);
    }

    onMount(setup);
</script>

<section class="absolute left-0 top-0 h-screen w-screen [&>*]:absolute [&>*]:left-0 [&>*]:top-0 [&>*]:h-screen [&>*]:w-screen" bind:this={container}>
    <GridBackground classes="z-[3]" targetColor="#8eb27b00" transitionDuration={1500} bind:cycle={cycleGridColor} />

    <div class="z-[1]">
        {#if upvote === true}
            <Confetti classes={"absolute top-[25%] h-[50%] w-screen"} confettiCount={15} bind:startConfetti />
        {/if}
    </div>

    <div class="z-[2]">
        <BlackBar classes="top-0" bind:element={topBar} />
        <BlackBar classes="bottom-0" bind:element={bottomBar} />
    </div>

    <header class="z-[2] flex flex-col items-center justify-center">
        <div class="w-[75%] rotate-[-5deg] lg:w-[30%] [&>*]:h-auto [&>*]:w-full" bind:this={glasses}>
            {#if upvote === true}
                <CoolPixelGlasses />
            {:else}
                <PixelGlasses />
            {/if}
        </div>

        <p class="mt-12 text-7xl text-black" bind:this={text}>{upvote === true ? "WOW!" : "LOL!"}</p>
    </header>
</section>
