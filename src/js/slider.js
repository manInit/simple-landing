export default class Slider {

    constructor(slideRootId, startSlider = 0) {
        const root = document.getElementById(slideRootId);
        this.slides = root.querySelectorAll('.slide');

        this.btnLeft = root.querySelector('.slider__btn-left');
        this.btnRight = root.querySelector('.slider__btn-right');
        this.slidesList = root.querySelector('.slider__list');
        this.slides = root.querySelectorAll('.slide');
        this.slideWidth = this.slides[0].clientWidth;
        this.slideCount = this.slides.length - 1;
        this.numSlide = startSlider;

        this._init();
    }

    _updateSlideResize() {
        this.slideWidth = this.slides[0].clientWidth;
        this.showSlide(this.numSlide);
    }
    
    _init() {
        if (this.slideCount === 0) {
            this._changebtnDisplay('none', 'none');
            return;
        }

        this.btnLeft.addEventListener('click', this.toLeft.bind(this));
        this.btnRight.addEventListener('click', this.toRight.bind(this));
        window.addEventListener('resize', this._updateSlideResize.bind(this));
        this.showSlide(this.numSlide);
    }

    _changebtnDisplay(left, right) {
        this.btnLeft.style.display = left;
        this.btnRight.style.display = right;
    }

    _toggleBtn(slideNum) {
        if (slideNum === 0) this._changebtnDisplay('none', 'block');
        else if (slideNum === this.slideCount) this._changebtnDisplay('block', 'none');
        else this._changebtnDisplay('block', 'block');
    }

    showSlide(num) {
        if (num < 0 || num > this.slideCount) return;
        this._toggleBtn(num);
        this.numSlide = num;
        this.slidesList.style.right = `${num * this.slideWidth}px`;
    }

    toLeft() {
        if (this.numSlide === 0) return;
        this.showSlide(--this.numSlide);
    }

    toRight() {
        if (this.numSlide === this.slideCount) return;
        this.showSlide(++this.numSlide);
    }
}