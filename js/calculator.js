const Calculator = {

    unit: "mmH2O",


    getInputs() {

        return {

            sg1:
                Number(
                    document.getElementById(
                        "sg1"
                    ).value
                ),

            sg2:
                Number(
                    document.getElementById(
                        "sg2"
                    ).value
                ),

            h1:
                Number(
                    document.getElementById(
                        "h1"
                    ).value
                ),

            elevation:
                Number(
                    document.getElementById(
                        "h2"
                    ).value
                ),

            level:
                Number(
                    document.getElementById(
                        "levelInput"
                    ).value
                )

        };

    },


    calculate() {

        const data =
            this.getInputs();


        /*
         * Static head from transmitter
         */

        const staticHead =
            data.sg1 *
            data.elevation;


        /*
         * Dry-leg gas head
         */

        const gasHead =
            data.sg2 *
            (
                data.h1 +
                data.elevation
            );


        /*
         * LRV
         */

        const lrv =
            staticHead -
            gasHead;


        /*
         * URV
         */

        const urv =
            data.sg1 *
            (
                data.h1 +
                data.elevation
            )
            -
            gasHead;


        /*
         * Span
         */

        const span =
            urv - lrv;


        /*
         * Current DP
         */

        const currentDP =
            data.sg1 *
            (
                data.elevation +
                data.h1 *
                data.level /
                100
            )
            -
            gasHead;


        /*
         * Display results
         */

        document.getElementById(
            "resultLRV"
        ).textContent =
            this.format(
                this.convert(lrv)
            );


        document.getElementById(
            "resultURV"
        ).textContent =
            this.format(
                this.convert(urv)
            );


        document.getElementById(
            "resultSpan"
        ).textContent =
            this.format(
                this.convert(span)
            );


        document.getElementById(
            "resultLevel"
        ).textContent =
            data.level.toFixed(1);


        document.getElementById(
            "resultDP"
        ).textContent =
            this.format(
                this.convert(currentDP)
            );


        this.createCalibrationTable(
            data
        );

    },


    convert(value) {

        switch (this.unit) {

            case "mbar":

                return value *
                    0.0980665;


            case "kPa":

                return value *
                    0.00980665;


            case "psi":

                return value *
                    0.001422334;


            default:

                return value;

        }

    },


    format(value) {

        return Number(value)
            .toLocaleString(
                undefined,
                {
                    maximumFractionDigits: 2
                }
            );

    },


    createCalibrationTable(data) {

        const points =
            [0, 25, 50, 75, 100];


        const tbody =
            document.getElementById(
                "calibrationTable"
            );


        tbody.innerHTML = "";


        points.forEach(level => {

            const dp =
                data.sg1 *
                (
                    data.elevation +
                    data.h1 *
                    level /
                    100
                )
                -
                data.sg2 *
                (
                    data.h1 +
                    data.elevation
                );


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>${level}%</td>

                <td>
                    ${this.format(dp)}
                </td>

                <td>
                    ${this.format(
                        dp * 0.0980665
                    )}
                </td>

                <td>
                    ${this.format(
                        dp * 0.00980665
                    )}
                </td>

                <td>
                    ${this.format(
                        dp * 0.001422334
                    )}
                </td>

            `;


            tbody.appendChild(row);

        });

    }

};
