export class RevealView {

    constructor() {
        this.allSections = document.querySelectorAll(".section");
        this.observer = null;
    }

    _revealSection(entries, observer) {
        entries.forEach(entry => {        
            if (!entry.isIntersecting) return;
            entry.target.classList.remove("section--hidden");
            observer.unobserve(entry.target);
        });
    }

    init() {
        this.observer = new IntersectionObserver(this._revealSection.bind(this), {
            root: null,
            threshold: 0.15
        });

        this.allSections.forEach(section => this.observer.observe(section));
    };

}

export default new RevealView();