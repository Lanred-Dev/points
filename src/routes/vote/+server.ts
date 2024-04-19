import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { writeFileSync, readFileSync } from "fs";
let voteData: { [key: string]: { wow: number; lol: number; color: string } };

export const GET = (({ url }) => {
    voteData = JSON.parse(readFileSync("data/votes.json") as unknown as string);

    const person: string | null = url.searchParams.get("person") || null;

    if (typeof person === "string") {
        if (voteData.hasOwnProperty(person) === true) {
            const { wow, lol, color }: { wow: number; lol: number; color: string } = voteData[person];
            return json({ status: true, person, color, wow, lol });
        }
    } else {
        return json({ status: true, data: voteData });
    }

    return json({ status: false });
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
    const { vote, person }: { vote: 1 | 0; person: string } = await request.json();

    if (typeof person !== "string" || (vote !== 1 && vote !== 0)) {
        return json({ status: false, error: "incorrect vote value" });
    }

    let upvote: boolean = vote == 1;

    try {
        if (voteData.hasOwnProperty(person) === true) {
            if (upvote === true) {
                voteData[person].wow += 1;
            } else {
                voteData[person].lol += 1;
            }
        } else {
            return json({ status: false, wow: 0, lol: 0 });
        }

        writeFileSync("data/votes.json", JSON.stringify(voteData), "utf8");
    } catch (_error) {}

    return json({ status: true, wow: voteData[person].wow, lol: voteData[person].lol });
}) satisfies RequestHandler;
