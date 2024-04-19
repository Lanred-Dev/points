<script lang="ts">
    import hangmanWords from "$lib/hangman";
    const hangmanCategories: Array<string> = Object.keys(hangmanWords);
    const word: { topic: string; answer: string } = getWord();
    const wordLetters: string[] = word.answer.split(" ");
    const keyboard: string[][] = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["z", "x", "c", "v", "b", "n", "m"],
    ];
    const usedLetters: string[] = [];
    let attemptsLeft: number = 10;

    function getWord(): { topic: string; answer: string } {
        const topic: string = hangmanCategories[Math.floor(Math.random() * hangmanCategories.length)];
        const answer: string = hangmanWords[topic][Math.floor(Math.random() * hangmanWords[topic].length)];

        return {
            topic: topic,
            answer: answer.toLowerCase().replace(/[^a-z \-]/g, ""),
        };
    }

    function updateWord(letter: string) {
        console.log(usedLetters)
        if (usedLetters.includes(letter) === true || attemptsLeft <= 0) return;

        usedLetters.push(letter);
    }
</script>

<section class="flex h-screen w-screen flex-col items-center justify-between">
    <header class="pt-12">
        <p class="text-6xl">{word.topic}</p>
    </header>

    <div>
        <div class="mb-6 select-none flex-wrap gap-6 px-6 text-2xl text-white lg:max-w-[50%]">
            {#each wordLetters as word, wordIndex}
                <div class="flex items-center justify-center gap-1" data-word={wordIndex}>
                    {#each word.split("") as letter, letterIndex}
                        {#if letter === "-"}
                            <span class="mx-1 h-[2px] w-5 rounded-sm bg-[#bdbebe]" />
                        {:else}
                            <p class="children:transition-all children:duration-500 relative inline-block px-1 pb-[2px]">
                                <span class="word inline-block translate-y-[-30px] {usedLetters.includes(letter) === true ? "opacity-100" : "opacity-0"}">a</span>
                                <span class="absolute bottom-0 left-0 h-[2px] w-full rounded-sm bg-black underline" />
                            </p>
                        {/if}
                    {/each}
                </div>
            {/each}
        </div>

        <div class="flex flex-col gap-2 px-2 py-6">
            {#each keyboard as row}
                <div class="flex flex-wrap items-center justify-center gap-2">
                    {#each row as letter}
                        <button
                            class="pixelated-corners-sm bg-black p-2 text-2xl leading-none"
                            on:click={() => {
                                updateWord(letter);
                            }}>{letter}</button
                        >
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</section>
