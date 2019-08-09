
function initLandingPageScripts() {
    var buttonsMap = {
        0: "start_page",
        1: "about",
        2: "projects",
        3: "partners",
        4: "cooperate"
    };
    var buttons = [].slice.call(document.querySelectorAll(".nav"), 0);
    var sections = [].slice.call(document.querySelectorAll("section"), 0);

    function subscribeButtons() {
        var cooperateButton = document.querySelector("button");

        cooperateButton.addEventListener("click", function (event) {
            removePreviousActiveButton();
            scrollToSection(buttonsMap[4]);
        })

        buttons.forEach(function (button, index) {
            button.addEventListener("click", function (event) {
                var pressedButton = buttons[index];

                if (Object.values(pressedButton.classList).includes("active")) {
                    return;
                }

                removePreviousActiveButton();
                pressedButton.classList.add("active");
                scrollToSection(buttonsMap[index]);
            })
        })
    };

    function subscribeHeader() {
        var header = document.querySelector("header");
        var rect = header.getBoundingClientRect();

        var sticky = header.offsetTop + rect.bottom;

        document.addEventListener("scroll", function (event) {
            if (window.pageYOffset > sticky) {
                if (!Object.values(header.classList).includes("fixed")) {
                    header.classList.add("fixed");
                }
            } else {
                header.classList.remove("fixed");
            }
        })
    };

    function subscribeSections() {
        window.addEventListener("scroll", function (event) {
            var tops = [];

            sections.forEach(function (section, index) {
                var rect = section.getBoundingClientRect();
                tops[index] = rect.top;
            });

            tops.forEach(function (top, index) {
                if (top >= 0 && top <= 70) {
                    removePreviousActiveButton();
                    if (buttons[index]) {
                        buttons[index].classList.add("active");
                    }
                }
            })
        })
    }

    function subscribeScroll() {
        window.addEventListener("wheel", function (event) {
            sections.forEach(function (section, i) {
                var rect = section.getBoundingClientRect();
                var sectionTop = Math.trunc(rect.top);

                if (sectionTop > -2 && sectionTop < 2) { // Странная проверка из-за IE
                    if (event.deltaY < 0) {
                        var index = i - 1;
                    } else {
                        var index = i + 1;
                    }
                    if (index >= 0) {
                        scrollToSection(buttonsMap[index]);
                    }
                }
            })
        })
    }

    /*----------------------------------------------------helpers----------------------------------------------------*/
    function scrollToSection(sectionClass) {
        var section = document.querySelector("." + sectionClass);
        var rect = section.getBoundingClientRect();

        window.scrollTo({
            top: window.pageYOffset + rect.top,
            behavior: "smooth"
        })
    };

    function removePreviousActiveButton() {
        var previousActiveButton = document.querySelector(".active");

        if (previousActiveButton) {
            previousActiveButton.classList.remove("active");
        }
    }
    /*----------------------------------------------------------------------------------------------------------------*/

    subscribeButtons();
    subscribeSections();
    subscribeHeader();
    subscribeScroll();
}

window.onload = function () {
    initLandingPageScripts();
    Slider();
}
