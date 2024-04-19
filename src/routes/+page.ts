import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
    const get = await fetch(`/vote`);
    const { status, data }: { status: boolean; data: { [key: string]: { wow: number; lol: number; color: string } } } = await get.json();

    if (status === true) {
        return data;
    }

    throw error(500, `failed to get data`);
}) satisfies PageLoad;
