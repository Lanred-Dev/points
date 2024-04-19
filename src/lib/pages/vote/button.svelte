<script lang="ts">
    //component props
    export let canVote: boolean = true;
    export let button: "lol" | "wow";
    export let vote: (upvote: boolean) => void;

    import Button from "$lib/components/buttons/button.svelte";
    import IconButton from "$lib/components/buttons/icon.svelte";
    import CoolPixelGlasses from "$lib/components/images/cool-pixel-glasses.svelte";
    import PixelGlasses from "$lib/components/images/pixel-glasses.svelte";
    const buttonOuterClasses: string = "min-w-1/2";
    const buttonInnerClasses: string = button === "wow" ? "bg-[#3b628e]" : "bg-[#8e3b3b]";
</script>

{#if canVote === true}
    <IconButton
        svg={true}
        outerClasses={buttonOuterClasses}
        innerClasses={buttonInnerClasses}
        click={() => {
            vote(button === "wow" ? true : false);
        }}
    >
        <div slot="icon" class="[&>*]:h-full [&>*]:w-auto">
            {#if button === "wow"}
                <CoolPixelGlasses />
            {:else if button === "lol"}
                <PixelGlasses />
            {/if}
        </div>

        {button.toUpperCase()}
    </IconButton>
{:else}
    <div class="flex {button === 'wow' ? 'flex-col' : 'flex-col-reverse'} w-full items-center justify-center gap-2">
        <IconButton svg={true} outerClasses={buttonOuterClasses} innerClasses={buttonInnerClasses} click={() => {}}>
            <div slot="icon" class="[&>*]:h-full [&>*]:w-auto">
                {#if button === "wow"}
                    <CoolPixelGlasses />
                {:else if button === "lol"}
                    <PixelGlasses />
                {/if}
            </div>

            play
        </IconButton>

        <p class="w-full px-[18%] text-xl">you must play a game to vote again</p>
    </div>
{/if}
