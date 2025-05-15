export class ImageView {
    
    constructor() {
        this.imgTargets = document.querySelectorAll("img[data-src]");
        this.observer = null;
    }

    _loadImg(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
        
            entry.target.src = entry.target.dataset.src;
        
            entry.target.addEventListener("load", function() {
                entry.target.classList.remove("lazy-img");
            });
        
            observer.unobserve(entry.target);

        });
    }

    init() {
        this.observer = new IntersectionObserver(this._loadImg.bind(this), {
            root: null, threshold: 0,
            rootMargin: "200px"
        });

        this.imgTargets.forEach(img => this.observer.observe(img));
    }

}

export default new ImageView();