function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
        modal.style.display = 'block';
        modal.parentElement.style.overflow = 'hidden';
        if (modalTimerId) {
            clearInterval(modalTimerId);
        }

}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
        modal.style.display = 'none';
        modal.parentElement.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modal

    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);

    modalTrigger.forEach((item) => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });
    // My code

    /* const teg = document.querySelector('[data-btn]');

    teg.addEventListener('click', (e) => {
    e.preventDefault();
    let nameOfClient = document.querySelector('[data-name]').value;
    console.log(nameOfClient);
    }); 

    */


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
             openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

}

export default modal;
export {closeModal, openModal};