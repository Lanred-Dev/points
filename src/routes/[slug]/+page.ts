import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch, params }) => {
    const get = await fetch(`/vote?person=${params.slug}`);
    const { status, person, wow, lol, color }: { status: boolean; person: string; wow: number; lol: number; color: string } = await get.json();

    if (status === true) {
        return {
            person,
            color,
            wow,
            lol,
        };
    }

    throw error(500, `failed to get votes for ${person}`);
}) satisfies PageLoad;
