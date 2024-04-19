import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
import { resolve } from "path";

const config: UserConfig = {
    ssr: {
		noExternal: ['three']
	},
    resolve: {
        alias: {
            $houdini: resolve(".", "$houdini"),
        },
    },
    server: {
        fs: {
            allow: [".."],
        },
    },
    plugins: [sveltekit()],
};

export default config;
