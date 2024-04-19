<script lang="ts">
    //component props
    export let classes: string = "";
    export let tileSize: number = 50;
    export let targetColor: string = "#000000";
    export let transitionDuration: number = 1000;
    export const cycle: (color: string) => void = cycleColor;

    type tile = {
        x: number;
        y: number;
        color: string;
    };

    import { twMerge } from "tailwind-merge";
    import { onMount } from "svelte";
    import anime, { type AnimeInstance } from "animejs";
    let canvas: HTMLCanvasElement
    let canvasContext: CanvasRenderingContext2D;
    let columns: number = 0;
    let rows: number = 0;
    let updateInterval: NodeJS.Timer;

    function convertPositionsToArray(): tile[] {
        const tiles: tile[] = [];

        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                tiles.push({ x, y, color: targetColor });
            }
        }

        return tiles;
    }

    function renderTile(x: number, y: number, color: string) {
        canvasContext.fillStyle = color;
        canvasContext.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }

    function cycleColor(color: string) {
        const tiles: tile[] = convertPositionsToArray();
        targetColor = color;
        anime({
            targets: tiles,
            easing: "easeOutExpo",
            duration: transitionDuration,
            color: color,
            delay: anime.stagger(100, {
                grid: [columns, rows],
                from: "center",
            }),
            update: (animation: AnimeInstance) => {
                for (const animatable of animation.animatables) {
                    const { x, y, color }: tile = animatable.target as any;
                    renderTile(x, y, color);
                }
            },
        });
    }

    function createGrid() {
        columns = Math.floor(canvas.clientWidth / tileSize) + 1;
        rows = Math.floor(canvas.clientHeight / tileSize) + 1;
        canvasContext.fillStyle = targetColor;
        canvasContext.fillRect(canvas.clientWidth, canvas.clientHeight, canvas.clientWidth, canvas.clientHeight);
    }

    function destroy() {
        clearInterval(updateInterval);
        canvas.removeEventListener("resize", createGrid);
    }

    function setup(): () => any {
        canvasContext = canvas.getContext("2d")!;

        //create the grid
        createGrid();
        canvas.addEventListener("resize", createGrid);

        return destroy;
    }

    onMount(setup);
</script>

<canvas class={twMerge("w-screen h-screen", classes)} bind:this={canvas} />
