const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            textColor: {
                primary: "#f0ece2",
            },
            colors: {
               background: "#8eb27b", 
               accent: "#b27962",
            },
            fontFamily: {
                pixhobo: ["TeleSys", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    "tailwindCSS.includeLanguages": {
        Svelte: "html",
    },
};
