export default class Accordion {

    constructor(idRootElement) {
        const root = document.getElementById(idRootElement);
        this.accordionHead = root.querySelectorAll('.accordion__head');
        this.elemList = root.querySelectorAll('.accordion__item');
        this.iconList = root.querySelectorAll('.accordion__arrow');

        this._init();
    }

    _clickListener(e) {
        e.preventDefault();
        this.toggleActive(e.currentTarget.parentElement);
    }

    _init() {
        this.accordionHead.forEach(elem => {
            elem.addEventListener('click', this._clickListener.bind(this));
        });
    }

    toggleActive(elem) {
        this.elemList.forEach(item => {
            if (elem === item) item.classList.add('accordion__item-active');
            else item.classList.remove('accordion__item-active');
        
        });
    }


}