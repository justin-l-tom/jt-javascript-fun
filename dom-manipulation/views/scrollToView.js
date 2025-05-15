export class ScrollToView {

    constructor() {
        this.btnScrollTo = document.querySelector(".btn--scroll-to");
        this.section1 = document.querySelector("#section--1");
    }

    init() {
        this.btnScrollTo.addEventListener("click", function() {
            console.log(this);
            this.section1.scrollIntoView({behavior: "smooth"});
        }.bind(this));
    }

}

export default new ScrollToView();