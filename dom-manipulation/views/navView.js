export class NavigationView {

  constructor() {
    this.nav = document.querySelector(".nav");
    this.observer = null;
  }

  _handleHover(e) {
    if (e.target.classList.contains("nav__link")) {
        const link = e.target;
        const siblings = link.closest(".nav").querySelectorAll(".nav__link");
        const logo = link.closest(".nav").querySelector("img");

        siblings.forEach(el => {
          if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
      }
  }

  _stickyNav(entries) {
      const [entry] = entries;
      if (!entry.isIntersecting) this.nav.classList.add("sticky");
      else this.nav.classList.remove("sticky");
  }

  init() {    
    // PAGE NAVIGATION
    document.querySelector(".nav__links").addEventListener("click", function(e) {
        e.preventDefault();
        if (e.target.classList.contains("nav__link") && !e.target.classList.contains("nav__link--btn")) {
            const id = e.target.getAttribute("href");
            document.querySelector(id).scrollIntoView({behavior: "smooth"});
        }
    });

    // MENU FADE
    this.nav.addEventListener("mouseover", this._handleHover.bind(0.5));
    this.nav.addEventListener("mouseout", this._handleHover.bind(1));

    // STICKY NAV
    const header = document.querySelector(".header");
    const navHeight = this.nav.getBoundingClientRect().height;    

    this.observer = new IntersectionObserver(this._stickyNav.bind(this), {
        root: null,
        threshold: 0,
        rootMargin: `-${navHeight}px`
    });
    this.observer.observe(header);
  }
}

export default new NavigationView();