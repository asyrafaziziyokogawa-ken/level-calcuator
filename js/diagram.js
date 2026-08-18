const Diagram = {

    update() {

        const style =
            Installation.selected;


        const elevation =
            Number(
                document.getElementById(
                    "h2"
                ).value
            );


        const h1 =
            Number(
                document.getElementById(
                    "h1"
                ).value
            );


        /*
         * Tank tapping positions
         */

        const HP_Y = 350;

        const LP_Y = 135;


        /*
         * Calculate DPT position
         */

        let dptY;


        switch (style) {

            case "below":

                dptY =
                    HP_Y +
                    215 *
                    (
                        elevation /
                        h1
                    );

                break;


            case "same":

                dptY =
                    HP_Y;

                break;


            case "middle":

                dptY =
                    HP_Y -
                    215 *
                    (
                        elevation /
                        h1
                    );

                break;


            case "above":

                dptY =
                    LP_Y -
                    215 *
                    (
                        elevation -
                        h1
                    ) /
                    h1;

                break;

        }


        /*
         * Limit DPT position
         */

        dptY =
            Math.max(
                35,
                Math.min(
                    520,
                    dptY
                )
            );


        /*
         * Move DPT
         */

        document
            .getElementById(
                "dptSymbol"
            )
            .setAttribute(
                "transform",
                `translate(500 ${dptY - 30})`
            );


        /*
         * HP tubing
         *
         * BLUE
         */

        const hp =
            `
            <path
                d="
                    M395 ${HP_Y}
                    H475
                    V${dptY}
                    H500
                "
                fill="none"
                stroke="#2496e8"
                stroke-width="7"
            />
            `;


        /*
         * LP tubing
         *
         * GREY
         *
         * Dry leg
         */

        const lp =
            `
            <path
                d="
                    M395 ${LP_Y}
                    H650
                    V${dptY}
                    H592
                "
                fill="none"
                stroke="#7d8795"
                stroke-width="7"
            />
            `;


        document.getElementById(
            "processPiping"
        ).innerHTML =
            hp + lp;


        /*
         * Dimensions
         */

        const h2 =
            Math.abs(elevation);


        const h3 =
            Math.abs(
                h1 - elevation
            );


        document.getElementById(
            "dimensions"
        ).innerHTML = `

            <!-- H2 -->

            <line
                x1="425"
                y1="${HP_Y}"
                x2="425"
                y2="${dptY}"
                stroke="#ef4444"
                stroke-width="2"
            />

            <text
                x="345"
                y="${(HP_Y + dptY) / 2}"
                font-size="13"
                font-weight="800"
                fill="#dc2626">

                H2 = ${Math.round(h2)} mm

            </text>


            <!-- H3 -->

            <line
                x1="680"
                y1="${LP_Y}"
                x2="680"
                y2="${dptY}"
                stroke="#ef4444"
                stroke-width="2"
            />

            <text
                x="690"
                y="${(LP_Y + dptY) / 2}"
                font-size="13"
                font-weight="800"
                fill="#dc2626">

                H3 = ${Math.round(h3)} mm

            </text>

        `;


        /*
         * Liquid level
         */

        updateLiquidLevel();

    }

};



function updateLiquidLevel() {

    const level =
        Number(
            document.getElementById(
                "levelInput"
            ).value
        );


    const y =
        350 -
        (
            215 *
            level /
            100
        );


    document.getElementById(
        "levelLine"
    ).setAttribute(
        "y1",
        y
    );


    document.getElementById(
        "levelLine"
    ).setAttribute(
        "y2",
        y
    );


    document.getElementById(
        "levelText"
    ).textContent =
        `LEVEL ${level.toFixed(1)}%`;


    document.getElementById(
        "liquidLevel"
    ).setAttribute(
        "d",
        `
        M105 ${y}
        Q250 ${y - 30}
        395 ${y}
        L395 500
        L105 500
        Z
        `
    );


    document.getElementById(
        "liquidSurface"
    ).setAttribute(
        "d",
        `
        M105 ${y}
        Q250 ${y - 30}
        395 ${y}
        `
    );

}
