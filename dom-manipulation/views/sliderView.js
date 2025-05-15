export class SliderView {

  _slides = document.querySelectorAll(".slide");
  _btnLeft = document.querySelector(".slider__btn--left");
  _btnRight = document.querySelector(".slider__btn--right");
  _dotContainer = document.querySelector(".dots");

  _currSlide = 0;
  _maxSlide = this._slides.length;
  
  _createDots() {
    this._slides.forEach(function(_, i) {
      this._dotContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${i}"></button>`);
    }.bind(this));
  };

  _activateDot(slide) {
    document.querySelectorAll(".dots__dot").forEach(dot => dot.classList.remove("dots__dot--active"));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
  }

  _goToSlide(slide) {
    this._slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
  };

  _nextSlide() {
    if (this._currSlide === this._maxSlide - 1) this._currSlide = 0;
    else this._currSlide++;
    this._goToSlide(this._currSlide);
    this._activateDot(this._currSlide);
  }

  _prevSlide() {
    if (this._currSlide === 0) this._currSlide = this._maxSlide - 1;
    else this._currSlide--;
    this._goToSlide(this._currSlide);
    this._activateDot(this._currSlide);
  }

  _initSlider() {
    this._createDots();
    this._activateDot(0);
    this._goToSlide(0);
  };

  init() {
  
    this._initSlider();
  
    this._btnRight.addEventListener("click", this._nextSlide.bind(this));
    this._btnLeft.addEventListener("click", this._prevSlide.bind(this));
  
    document.addEventListener("keydown", function(e) {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    });
  
    this._dotContainer.addEventListener("click", function(e) {
      if (e.target.classList.contains("dots__dot")) {
        this._currSlide = Number(e.target.dataset.slide);
        this._goToSlide(this._currSlide);
        this._activateDot(this._currSlide);
      }
    }.bind(this));
  }

}

export default new SliderView();