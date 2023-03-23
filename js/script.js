$(document).ready(function(){
    $('.carousel__inner').slick({
        
        speed: 1200,
        adaptiveHeight: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/chevron-left-solid.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/chevron-right-solid.png"></button>',
        responsive: [
            {
              breakpoint: 992,
              settings: {
                arrows: false,
                autoplay: true,
                autoplaySpeed: 1000
              }
            },
          ]
      });
    $('input[name=phone]').mask("+7 (999) 999-9999");
    $('form').submit(function(e) {
      e.preventDefault();
      if(!this.checkValidity()) {
        return;
      }

      $.ajax({
        type: "POST",
        url : "mailer/smart.php",
        data: $(this).serialize()
      }).done(function() {
        $(this).find("input").val("");
    
        $('form').trigger('reset');
        document.querySelector('#consultation').style.display = "none";
        document.querySelector('#order').style.display = "none";
        document.querySelector('#thanks').style.display = "block";
      });
      return false;
      });
  });
    


//элементы табов
const catalogTabs = document.querySelectorAll('.catalog__tab'); 
//элементы каталогов
const catalogContent = document.querySelectorAll('.catalog__content'); 
//элементы главного контента карточек товаров
const catalogItemsContent = document.querySelectorAll('.catalog-item__content');
//элементы доп. контента карточек товаров (скрытый список)
const catalogItemsList = document.querySelectorAll('.catalog-item__list');
//кнопки на странице
const buttons = document.querySelectorAll('button');
//кнопки закрытия модального окна
const closeModal = document.querySelectorAll('.modal__close');
//события нажатия закрытия модальных окон
closeModal.forEach(elem => {
  elem.addEventListener('click', closeModalWindow)
})
//события нажатия ссылки на карточках товаров
document.querySelectorAll(".catalog-item__link").forEach((item) => {
    item.addEventListener('click', catalogItemHidden)
})
//события нажатия на табы
catalogTabs.forEach(item => {
  item.addEventListener('click', CatalogTabActive)
})
//события нажатия на кнопки
buttons.forEach(elem => {
  elem.addEventListener('click', openModal)
})

//активация табов и отображение каталога
function CatalogTabActive(event) {
  let target = event.target.closest('.catalog__tab')
  catalogTabs.forEach(item => {
    item.classList.remove('catalog__tab_active');
  })
  this.classList.add('catalog__tab_active');
  for (let index = 0; index < catalogTabs.length; index++) {
      if (target == catalogTabs[index]) {
        catalogContentShow(index);
        break;
      }
    
  }
  catalogItemsDefoltView();
}
//информация "подробнее" карточек товаров
function catalogItemHidden(item) {
    item.preventDefault();
    let catalogItem = this.closest('.catalog-item');
    catalogItem.querySelector('.catalog-item__content').classList.toggle('catalog-item_hidden');
    catalogItem.querySelector('.catalog-item__list').classList.toggle('catalog-item_hidden');
}   

//обработка каталога 
function catalogContentShow(i) {
  catalogContent.forEach(item => {
    item.classList.remove('catalog__content_active');
  })
  catalogContent[i].classList.add('catalog__content_active');
}

//cброс карточек доваров в дефолтное состояние
function catalogItemsDefoltView() {
  catalogItemsContent.forEach(item => {
    item.classList.remove('catalog-item_hidden');
  })
  catalogItemsList.forEach(item => {
    item.classList.add('catalog-item_hidden');
  })
}


//модальные окна

function openModal(event) {
  const data = this.dataset.modal
  switch(data) {
    //модальное окно заказ консультации
    case 'consultation':
      document.querySelector('.overlay').style.display = "block";
      document.querySelector('#consultation').style.display = "block";
      break;
      //модальное окно оформление заказа
      case 'order':
        document.querySelector('.overlay').style.display = "block";
        document.querySelector('#order').style.display = "block";
        break;
      // case 'send':
      // //модальное окно благодарность после заполнения и валидации формы 
      //   if(document.forms["form-consultation"].checkValidity() || document.forms["form-order"].checkValidity()) {
      //     event.preventDefault();
      //     document.querySelector('#consultation').style.display = "none";
      //     document.querySelector('#order').style.display = "none";
      //     document.querySelector('#thanks').style.display = "block";
      //     break;
      //   }
  }
}

//закрытие модального окна

function closeModalWindow() {
  document.querySelector('.overlay').style.display = "none";
  document.querySelector('#consultation').style.display = "none";
  document.querySelector('#order').style.display = "none";
  document.querySelector('#thanks').style.display = "none";

}