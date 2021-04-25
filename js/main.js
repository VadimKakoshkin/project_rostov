$(document).ready(function () {
    var modal = $('.modal'),
        modalBtn = $('[data-toggle=modal]'),
        closeBtn = $('.modal__close');

    modalBtn.on('click', function () {
        modal.toggleClass('modal--visible');
    });
    closeBtn.on('click', function () {
        modal.toggleClass('modal--visible');
    });

    var mySwiper = new Swiper ('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
          },

          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
    });

    var next = $('.swiper-button-next');
    var prev = $('.swiper-button-prev');
    var bullets = $('.swiper-pagination');

    next.css('left', prev.width() + 10 + bullets.width() + 10);
    bullets.css('left', prev.width() + 10);

    new WOW().init();

    //Валидация формы
    $('.modal__form').validate({
        errorClass: "invalid",
        rules: {
            // Строчное правило
            userName: {
                required: true,
                minlength: 2
            },
            userPhone: "required",
            // Правило-объект (блок)
            userEmail: {
              required: true,
              email: true
            }
        },
          messages: {
            userName: {
                required: "Поле обязательно для заполнения",
                minlength: "Имя должно быть не короче двух букв"
            },
            userPhone: "Поле обязательно для заполнения",
            userEmail: {
              required: "Поле обязательно для заполнения",
              email: "Адрес e-mail должен быть в формате name@domain.com"
            }
        },
        submitHandler: function(form) {
            $.ajax({
                type: "POST",
                url: "send.php",
                data: $(form).serialize(),
                success: function (response) {
                    alert('Форма отправлена, мы свяжемся с вами в ближайшее время.');
                    $(form)[0].reset();
                    modal.removeClass('modal--visible');
                },
                error: function (response) {
                    console.error('Ошибка запроса ' + responce)
                }
            });
        }
    });

    //Маска для телефона
    $('[type=tel]').mask('+7(000)000-00-00', {placeholder: "+7 (___) ___-__-__"});

    //Создание Yandex-карты
    ymaps.ready(init);
    function init(){
        
        var myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 7
        });

    }
    
});