let myWidth = window.innerWidth,
    myHeight = window.innerHeight;
console.log(`width ${myWidth} \n height ${myHeight}`);

document.querySelector('html').style.overflowY = 'hidden';

window.onload = function () {

    setTimeout(() => {
        document.querySelector('.loader').style.cssText = 'opacity: 0; z-index: -5';
        document.querySelector('html').style.overflowY = 'scroll';
    }, 1500);

    /*
        increase data
     */

    let today = new Date(),
        tomorrow = new Date(),
        day,
        month,
        year,
        i = 3,
        period = document.querySelectorAll('h6 output');

    tomorrow.setDate(today.getDate() + i);
    day = tomorrow.getDate() > 9 ? tomorrow.getDate() : `0${tomorrow.getDate()}`;
    month = tomorrow.getMonth() + 1 > 9? tomorrow.getMonth() + 1 : `0${tomorrow.getMonth() + 1}`;
    year = tomorrow.getFullYear();

    for(let i = 0; i < period.length; i++) {
        period[i].innerHTML = `${day}.${month}.${year.toString().slice(2)}`;
    }

    /*
        loop fancybox
     */

    $.fancybox.defaults.loop = true;

    /*
        form styler
     */

    $(function () {
        $('select').styler({
            selectSmartPositioning: false
        });
    });

    /*
        review slider
     */

    $('.review__content-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 0,
        speed: 300,
        arrows: true,
        prevArrow: $('.prev-arrow'),
        nextArrow: $('.next-arrow')
    });

    /*
        feedback
     */

    const bodyFilter = document.querySelector('.body__filter'),
        feedback = document.querySelector('.feedback'),
        openFeedback = document.querySelector('p.feed'),
        closeFeedback = document.querySelector('span.close'),
        feedbackTitle = document.querySelector('.feedback p'),
        inputValue = document.querySelector('.feedback input'),
        textAreaValue = document.querySelector('.feedback textarea'),
        feedbackForm = document.querySelector('.feedback form'),
        changeForm = () => {
            inputValue.value = '';
            textAreaValue.value = '';
            feedbackForm.style.cssText = 'display: block';
            feedbackTitle.innerHTML = `Оставьте ваш отзыв и оценку товару`;
        },
        toggleFeedback = (toggle) => {
            if(toggle === false) {
                document.querySelector('html').style.overflowY = 'hidden';
                bodyFilter.style.cssText = '  background: rgba(0, 0, 0, 0.8); z-index: 9999';
                feedback.style.cssText = ' opacity: 1; transform: translate(-50%, -50%) rotateX(0deg); z-index: 99999';
            } else {
                document.querySelector('html').style.overflowY = 'scroll';
                bodyFilter.style.cssText = '  background: rgba(0, 0, 0, 0.0); z-index: -5';
                feedback.style.cssText = ' opacity: 0; transform: translate(-50%, -50%) rotateX(-90deg); z-index: -5';
                setTimeout(() => {
                    changeForm();
                }, 500);
            }
        };

    inputValue.addEventListener('change', () => {
        inputValue.value;
    });

    textAreaValue.addEventListener('change', () => {
        textAreaValue.value;
    });

    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if(inputValue !== '' && textAreaValue !== '') {
          feedback.style.opacity = '0';
          setTimeout(() => {
              feedbackForm.style.display = 'none';
              feedbackTitle.innerHTML = `Спасибо за ваш отзыв, <br>он появится на сайте после проверки модератором`;
          }, 500);
          setTimeout(() => {
              feedback.style.opacity = '1'
          }, 600);
      }
    });

    openFeedback.addEventListener('click', () => {
        toggleFeedback(false);
    });
    closeFeedback.addEventListener('click', () => {
        toggleFeedback(true);
    });
    bodyFilter.addEventListener('click', () => {
        toggleFeedback(true);
    });

    /*
        toggle bucket
     */

    const toggleBucket = () => {
        const bucket = document.querySelector('.bucket'),
            topOfWindow = window.pageYOffset + innerHeight,
            catalogTopPosition = document.querySelector('.catalog').offsetTop,
            reviewTopPosition = document.querySelector('.review').offsetTop,
            footerLink = $('.footer a.to-order').offset().top;

        if(topOfWindow >= catalogTopPosition && topOfWindow <= reviewTopPosition || topOfWindow >= footerLink) {
            bucket.style.cssText = 'opacity: 0; z-index: -5';
        } else {
            bucket.style.cssText = 'opacity: 1; z-index: 999';
        }
    }

    if(/iPhone|iPod|Android/i.test(navigator.userAgent)){
        let href = $('#mobile-order').offset().top - innerHeight;

        $('a.to-order, a.bucket').on('click', function () {
            $('html, body').animate({scrollTop: href}, 800);
        });
        window.addEventListener('scroll', () => {
            toggleBucket();
        });
        window.addEventListener('resize', () => {
            toggleBucket();
        });
    } else {
        let href = $('#catalog').offset().top;

        $('a.to-order, a.bucket').on('click', function () {
            $('html, body').animate({scrollTop: href}, 800);
        });
    }
};