import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--color-background)",
                foreground: "var(--color-text-main)",
                primary: {
                    DEFAULT: "var(--color-primary)",
                    dark: "#7B8C9D", // Slightly darker slate
                    light: "#A4B5C6", // Lighter slate
                },
                secondary: {
                    DEFAULT: "var(--color-secondary)",
                    dark: "#BFA382", // Darker gold
                    light: "#E5CDB0", // Lighter gold
                },
                muted: "var(--color-text-muted)",
            },
            fontFamily: {
                sans: ["var(--font-sans)"],
                serif: ["var(--font-sans)"], // Fallback to sans for consistency
            },
            borderRadius: {
                'card': '1.5rem', // Consistent 24px radius for cards
                'button': '1rem', // 16px for buttons
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-overlay': 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.6) 100%)',
            }
        },
    },
    plugins: [],
} satisfies Config;
