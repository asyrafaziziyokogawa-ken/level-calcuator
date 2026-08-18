document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
         * Installation card selection
         */

        document
            .querySelectorAll(".installation-card")
            .forEach(card => {

                card.addEventListener(
                    "click",
                    () => {

                        Installation.select(
                            card.dataset.style
                        );

                    }
                );

            });



        /*
         * Continue to calculator
         */

        document
            .getElementById("continueButton")
            .addEventListener(
                "click",
                () => {

                    openCalculator();

                }
            );



        /*
         * Change installation
         */

        document
            .getElementById("changeInstallation")
            .addEventListener(
                "click",
                () => {

                    document
                        .getElementById(
                            "calculatorPage"
                        )
                        .classList.add("hidden");


                    document
                        .getElementById(
                            "installationPage"
                        )
                        .classList.remove("hidden");

                }
            );

    }
);



function openCalculator() {

    const selected =
        Installation.get();


    /*
     * Update calculator title
     */

    document.getElementById(
        "calculatorInstallation"
    ).textContent =
        selected.name;



    /*
     * Set default DPT elevation
     */

    document.getElementById(
        "dptElevation"
    ).value =
        selected.defaultElevation;



    /*
     * Installation description
     */

    document.getElementById(
        "installationHelp"
    ).textContent =
        selected.description;



    /*
     * Switch pages
     */

    document
        .getElementById(
            "installationPage"
        )
        .classList.add("hidden");


    document
        .getElementById(
            "calculatorPage"
        )
        .classList.remove("hidden");


    /*
     * Update diagram
     */

    Diagram.update();


    /*
     * Calculate
     */

    Calculator.calculate();

}
