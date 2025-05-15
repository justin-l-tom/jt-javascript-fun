export class TabView {

    _tabs = document.querySelectorAll(".operations__tab");
    _tabsContainer = document.querySelector(".operations__tab-container");
    _tabsContent = document.querySelectorAll(".operations__content");

    init() {
        this._tabsContainer.addEventListener("click", function(e) {
            const clicked = e.target.closest(".operations__tab");
    
            if (!clicked) return;
    
            this._tabs.forEach(t => t.classList.remove("operations__tab--active"));
            this._tabsContent.forEach(c => c.classList.remove("operations__content--active"));
    
            clicked.classList.add("operations__tab--active");
    
            document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
        }.bind(this));
    };

}

export default new TabView();