<script lang="ts">
    //component props
    export let person: { person: string; wow: number; lol: number; color: string };

    import CoolPixelGlasses from "$lib/components/images/cool-pixel-glasses.svelte";
    import PixelGlasses from "$lib/components/images/pixel-glasses.svelte";
    import Link from "$lib/components/buttons/link.svelte";

    function calculatePercentage(smallerNumber: number, largerNumber: number): number {
        return (smallerNumber / largerNumber) * 100;
    }

    const wowBarSize: number = calculatePercentage(person.wow, person.wow + person.lol);
</script>

<Link outerClasses="w-full" innerClasses="relative inline-block w-full py-3" href="/{person.person}">
    <div class="absolute left-0 top-0 z-[1] flex h-full w-full [&>*]:h-full" style="background-color: {person.color};">
        <div class="bg-[#3b628e]" style="width: {wowBarSize}%;" />
        <div class="bg-[#8e3b3b]" style="width: {100 - wowBarSize}%;" />
    </div>

    <div class="relative z-[2]">
        <p class="text-3xl">{person.person}</p>

        <div class="flex items-center justify-center gap-6 text-xl [&>*]:flex [&>*]:items-center [&>*]:justify-center [&>*]:gap-2">
            <p>
                <CoolPixelGlasses classes="h-2.5" />
                {person.wow}
            </p>

            <p>
                {person.lol}
                <PixelGlasses classes="h-2.5" />
            </p>
        </div>
    </div>
</Link>
