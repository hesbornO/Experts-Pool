const colors = require("tailwindcss/colors");


module.exports = {
    purge: [
        "./src/**/*.html",
        "./src/**/*.vue",
        "./src/**/*.js",
        "../schemas/*.json",
        "node_modules/vue-tailwind/dist/*.js"
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            padding: {
                "scrollbar": "1.0625rem"
            },
            container: {
                center: true
            },
            gridTemplateRows: {
                sticky: "auto 1fr auto",
                layout: "auto 1fr",
                footer: "1fr auto"
            },
            colors: {
                modal: "rgba(0,0,0,.2)",
                brandblue: { DEFAULT: "#1D5288", '50': "#A0C5EB", '100': "#8BB8E6", '200': "#619EDD", '300': "#3785D4", '400': "#266BB2", '500': "#1D5288", '600': "#14395E", '700': "#0B1F34", '800': "#02060A", '900': "#000000" },
                bluegray: colors.blueGray,
                wgray: colors.warmGray,
                lblue: colors.lightBlue,
                teal: colors.teal,
                orange: colors.orange,
                metal: { DEFAULT: "#F2F2F2", '100': "#F2F2F2", '200': "#D9D9D9", '300': "#BFBFBF", '400': "#A6A6A6", '500': "#8C8C8C", '600': "#737373", '700': "#595959", '800': "#404040", '900': "#262626" },
                'havelock-blue': {  DEFAULT: '#48A6DB',  '50': '#FFFFFF',  '100': '#F2F9FD',  '200': '#C8E4F4',  '300': '#9DCFEC',  '400': '#73BBE3',  '500': '#48A6DB',  '600': '#278EC9',  '700': '#1F709E',  '800': '#175273',  '900': '#0E3449'},
            },
            animation: {
                "fade-in-top": "fade-in-top .2s cubic-bezier(.39,.575,.565,1.000) both",
                "tilt-in-top-2": "tilt-in-top-2 .2s cubic-bezier(.25,.46,.45,.94) both",
                //"flip-in-ver-right": "flip-in-ver-right .5s cubic-bezier(.25,.46,.45,.94) both",
                "scale-up-hor-center": "scale-up-hor-center .3s cubic-bezier(.39,.575,.565,1.000) both",
                "scale-up-hor-left": "scale-up-hor-left .4s cubic-bezier(.39,.575,.565,1.000) both",
                "scale-in-tr": "scale-in-tr 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
                "scale-in-center": "scale-in-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
                "flip-out": "flip-out 0.3s cubic-bezier(0.550, 0.085, 0.680, 0.530) both",
                "slide-in-left": "slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
                "slide-out-left": "slide-out-left 0.2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both",
                "fade-in-left": "fade-in-left .6s cubic-bezier(.39,.575,.565,1.000) both",
                "flip-vertical-bck": "flip-vertical-bck 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both",
                "flip-in-ver-right": "flip-in-ver-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
                "slide-in-fwd-top": "slide-in-fwd-top 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
                "scale-in-top": "scale-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
                "swing-in-left-fwd": "swing-in-left-fwd 1s cubic-bezier(0.175, 0.885, 0.320, 1.275)   both"
            },
            keyframes: {
                "swing-in-left-fwd": {
                    "0%": {
                        transform: "rotateY(100deg)",
                        "transform-origin": "left",
                        opacity: "0"
                    },
                    to: {
                        transform: "rotateY(0)",
                        "transform-origin": "left",
                        opacity: "1"
                    }
                },
                "scale-in-top": {
                    "0%": {
                        transform: "scale(0)",
                        "transform-origin": "50% 0%",
                        opacity: "1"
                    },
                    to: {
                        transform: "scale(1)",
                        "transform-origin": "50% 0%",
                        opacity: "1"
                    }
                },
                "slide-in-fwd-top": {
                    "0%": {
                        transform: "translateZ(-1400px) translateY(-800px)",
                        opacity: "0"
                    },
                    to: {
                        transform: "translateZ(0) translateY(0)",
                        opacity: "1"
                    }
                },
                "fade-in-top": { "0%": { transform: "translateY(-50px)", opacity: 0 }, "100%": { transform: "translateY(0)", opacity: 1 } },
                "tilt-in-top-2": { "0%": { transform: "rotateY(-30deg) translateY(-300px) skewY(30deg)", opacity: 0 }, "100%": { transform: "rotateY(0deg) translateY(0) skewY(0deg)", opacity: 1 } },
                //"flip-in-ver-right": { "0%": { transform: "rotateY(-80deg)", opacity: 0 }, "100%": { transform: "rotateY(0)", opacity: 1 } },
                "scale-up-hor-center": { "0%": { transform: "scaleX(.4)" }, "100%": { transform: "scaleX(1)" } },
                "scale-up-hor-left": { "0%": { transform: "scaleX(.4)", transformOrigin: "0 0" }, "100%": { transform: "scaleX(1)", transformOrigin: "0 0" } },
                "scale-in-tr": {
                    "0%": {
                        transform: "scale(0)",
                        transformOrigin: "100% 0%",
                        opacity: 1
                    },
                    "100%": { transform: "scale(1)", transformOrigin: "100% 0%", opacity: 1 }
                },
                "scale-in-center": {
                    "0% ": { transform: "scale(0)", opacity: 0 },
                    "100%": { transform: "scale(1)", opacity: 1 }
                },
                "flip-out": {
                    "0% ": { transform: "rotateX(0)", opacity: 1 },
                    "100%": { transform: "rotateX(70deg)", opacity: 0 }
                },
                "slide-in-left": {
                    "0%": {
                        transform: "translateX(-1000px)",
                        opacity: 0
                    },
                    "100%": {
                        transform: "translateX(0)",
                        opacity: 1
                    }
                },
                "slide-out-left": {
                    "0%": {
                        transform: "translateX(0)",
                        opacity: 1
                    },
                    "100%": {
                        transform: "translateX(-1000px)",
                        opacity: 0
                    }
                },
                "fade-in-left": {
                    "0%": {
                        transform: "translateX(-50px)",
                        opacity: 0
                    },
                    "100%": {
                        transform: "translateX(0)",
                        opacity: 1
                    }
                },
                "flip-vertical-bck": {
                    "0%": {
                        transform: "translateZ(0) rotateY(0)"
                    },
                    to: {
                        transform: "translateZ(-260px) rotateY(-180deg)"
                    }
                },
                "flip-in-ver-right": {
                    "0%": {
                        transform: "rotateY(-80deg)",
                        opacity: "0"
                    },
                    to: {
                        transform: "rotateY(0)",
                        opacity: "1"
                    }
                }
            },
            fontFamily: {
                sans: ['Graphik', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
            },
        },

    },
    variants: {
        extend: {
            opacity: ["disabled"],
            cursor: ["disabled"],
            animation: ["hover", "focus"]
        }
    },
    plugins: [
        require("tailwindcss-elevation")(["responsive"]),
        require("@tailwindcss/forms"),

        require("@tailwindcss/typography"),
        // require("tailwind-scrollbar")
    ]
}