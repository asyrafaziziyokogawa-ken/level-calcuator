const Installation = {

    selected: "below",

    styles: {

        below: {
            name: "Below Low Tapping",

            description:
                "DPT installed below HP / low tapping.",

            defaultElevation: 2500
        },

        same: {
            name: "Same Level as Low Tapping",

            description:
                "DPT installed at HP / low tapping.",

            defaultElevation: 0
        },

        middle: {
            name: "Between Tappings",

            description:
                "DPT installed between HP and LP tapping.",

            defaultElevation: 2750
        },

        above: {
            name: "Above Upper Tapping",

            description:
                "DPT installed above LP / upper tapping.",

            defaultElevation: 6500
        }

    },


    select(style) {

        this.selected = style;

        document
            .querySelectorAll(".installation-card")
            .forEach(card => {

                card.classList.remove("selected");

            });


        const selectedCard =
            document.querySelector(
                `[data-style="${style}"]`
            );


        if (selectedCard) {

            selectedCard.classList.add("selected");

        }


        document.getElementById(
            "selectedInstallation"
        ).textContent =
            this.styles[style].name;

    },


    get() {

        return this.styles[this.selected];

    }

};
