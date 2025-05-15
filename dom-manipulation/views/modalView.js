export class ModalView {
  
  constructor() {
    this.modal = document.querySelector('.modal');
    this.overlay = document.querySelector('.overlay');
    this.btnCloseModal = document.querySelector('.btn--close-modal');
    this.btnsOpenModal = document.querySelectorAll('.btn--show-modal');
  }

  _openModal(e) {
    e.preventDefault();
    this.modal.classList.remove('hidden');
    this.overlay.classList.remove('hidden');
  };

  _closeModal() {
    this.modal.classList.add('hidden');
    this.overlay.classList.add('hidden');
  };

  init() {
    this.btnsOpenModal.forEach(btn => btn.addEventListener("click", this._openModal.bind(this)));

    this.btnCloseModal.addEventListener('click', this._closeModal.bind(this));
    this.overlay.addEventListener('click', this._closeModal.bind(this));

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
        this._closeModal();
      }
    }.bind(this));
  }

}

export default new ModalView();