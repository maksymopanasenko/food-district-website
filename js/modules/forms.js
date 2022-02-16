import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(modalTimerId) {

    // Forms

    const forms = document.querySelectorAll('form');


    const message = {
        loading: "img/svg/spinner.svg",
        success: "Попистефали!",
        failure: "Увы..."
    };

    forms.forEach(item => {
        bindPostData(item);
    });


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMassage = document.createElement('img');
            statusMassage.src = message.loading;
            statusMassage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMassage);

            // для XML відправлення/отримання даних

            /* const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            // request.setRequestHeader('Content-type', 'multipart/form-data');
            // при использовании FormData заголовок НЕ НУЖЕН!
            request.setRequestHeader('Content-type', 'aplication/json');
            */
            const formData = new FormData(form);
            
            
            /*   1 спосіб перетворення FormData на JSON (старий)
            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            });
            */

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            

            // request.send(JSON.stringify(object)); для XML відправлення/отримання даних

            /*
            fetch("server.php", {
                method: "POST",
                headers: {
                    'Content-type':'aplication/json'
                },
                body: JSON.stringify(object) //formData
            })
            */ 
        // старий код ^
            postData("http://localhost:3000/requests", json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMassage.remove();
            }).catch(()=> {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });

            // request.addEventListener('load', () => {
            //     if(request.status === 200) {
            //         
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }


    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.remove('show');
        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close >&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            prevModalDialog.classList.add('show');
                
            closeModal('.modal');
        }, 4000);
        
    }

    //    fetch('db.json')
    //         .then(data => data.json())
    //         .then(res => console.log(res));
}
export default forms;
