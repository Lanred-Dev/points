<script lang="ts">
    //component props
    export let classes: string = "";
    export let confettiCount: number = 500;
    export let ticks: number = 200;
    export const startConfetti: () => any = start;

    import { onMount } from "svelte";
    import canvasConfetti from "canvas-confetti";
    import randomNumber from "$lib/scripts/functions/randomNumber";
    let canvas: HTMLCanvasElement;
    let confetti: any;
    let updateInterval: NodeJS.Timer;
    const confettiColors: Array<string> = ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"];
    let skew: number = 0;

    function update() {
        skew = Math.max(0.8, skew - 0.001);
        confetti({
            particleCount: 1,
            startVelocity: 0,
            ticks: ticks,
            origin: {
                x: Math.random(),
                y: Math.random() * skew,
            },
            colors: [confettiColors[Math.floor(Math.random() * confettiColors.length)]],
            gravity: randomNumber(0.4, 0.6),
            scalar: 3,
            drift: randomNumber(-0.2, 0.8),
            shapes: ["square"],
        });
    }

    function destroy() {
        if (typeof updateInterval !== "undefined") {
            clearInterval(updateInterval);
        }
    }

    function start() {
        updateInterval = setInterval(() => {
            requestAnimationFrame(update);
        }, 1000 / confettiCount);
    }

    function setup() {
        confetti = canvasConfetti.create(canvas, {
            resize: true,
            useWorker: true,
            disableForReducedMotion: true,
        });

        return destroy;
    }

    onMount(setup);
</script>

<canvas class={classes} bind:this={canvas} />
