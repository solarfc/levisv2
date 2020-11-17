"use strict";

var myWidth = window.innerWidth,
    myHeight = window.innerHeight;
console.log("width ".concat(myWidth, " \n height ").concat(myHeight));
document.querySelector('html').style.overflowY = 'hidden';

window.onload = function () {
  setTimeout(function () {
    document.querySelector('.loader').style.cssText = 'opacity: 0; z-index: -5';
    document.querySelector('html').style.overflowY = 'scroll';
  }, 1500);
  /*
      increase data
   */

  var today = new Date(),
      tomorrow = new Date(),
      day,
      month,
      year,
      i = 3,
      period = document.querySelectorAll('h6 output');
  tomorrow.setDate(today.getDate() + i);
  day = tomorrow.getDate() > 9 ? tomorrow.getDate() : "0".concat(tomorrow.getDate());
  month = tomorrow.getMonth() + 1 > 9 ? tomorrow.getMonth() + 1 : "0".concat(tomorrow.getMonth() + 1);
  year = tomorrow.getFullYear();

  for (var _i = 0; _i < period.length; _i++) {
    period[_i].innerHTML = "".concat(day, ".").concat(month, ".").concat(year.toString().slice(2));
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

  var bodyFilter = document.querySelector('.body__filter'),
      feedback = document.querySelector('.feedback'),
      openFeedback = document.querySelector('p.feed'),
      closeFeedback = document.querySelector('span.close'),
      feedbackTitle = document.querySelector('.feedback p'),
      inputValue = document.querySelector('.feedback input'),
      textAreaValue = document.querySelector('.feedback textarea'),
      feedbackForm = document.querySelector('.feedback form'),
      changeForm = function changeForm() {
    inputValue.value = '';
    textAreaValue.value = '';
    feedbackForm.style.cssText = 'display: block';
    feedbackTitle.innerHTML = "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0432\u0430\u0448 \u043E\u0442\u0437\u044B\u0432 \u0438 \u043E\u0446\u0435\u043D\u043A\u0443 \u0442\u043E\u0432\u0430\u0440\u0443";
  },
      toggleFeedback = function toggleFeedback(toggle) {
    if (toggle === false) {
      document.querySelector('html').style.overflowY = 'hidden';
      bodyFilter.style.cssText = '  background: rgba(0, 0, 0, 0.8); z-index: 9999';
      feedback.style.cssText = ' opacity: 1; transform: translate(-50%, -50%) rotateX(0deg); z-index: 99999';
    } else {
      document.querySelector('html').style.overflowY = 'scroll';
      bodyFilter.style.cssText = '  background: rgba(0, 0, 0, 0.0); z-index: -5';
      feedback.style.cssText = ' opacity: 0; transform: translate(-50%, -50%) rotateX(-90deg); z-index: -5';
      setTimeout(function () {
        changeForm();
      }, 500);
    }
  };

  inputValue.addEventListener('change', function () {
    inputValue.value;
  });
  textAreaValue.addEventListener('change', function () {
    textAreaValue.value;
  });
  feedbackForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (inputValue !== '' && textAreaValue !== '') {
      feedback.style.opacity = '0';
      setTimeout(function () {
        feedbackForm.style.display = 'none';
        feedbackTitle.innerHTML = "\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430 \u0432\u0430\u0448 \u043E\u0442\u0437\u044B\u0432, <br>\u043E\u043D \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 \u043F\u043E\u0441\u043B\u0435 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u043C\u043E\u0434\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u043C";
      }, 500);
      setTimeout(function () {
        feedback.style.opacity = '1';
      }, 600);
    }
  });
  openFeedback.addEventListener('click', function () {
    toggleFeedback(false);
  });
  closeFeedback.addEventListener('click', function () {
    toggleFeedback(true);
  });
  bodyFilter.addEventListener('click', function () {
    toggleFeedback(true);
  });
  /*
      toggle bucket
   */

  var toggleBucket = function toggleBucket() {
    var bucket = document.querySelector('.bucket'),
        topOfWindow = window.pageYOffset + innerHeight,
        catalogTopPosition = document.querySelector('.catalog').offsetTop,
        reviewTopPosition = document.querySelector('.review').offsetTop,
        footerLink = $('.footer a.to-order').offset().top;

    if (topOfWindow >= catalogTopPosition && topOfWindow <= reviewTopPosition || topOfWindow >= footerLink) {
      bucket.style.cssText = 'opacity: 0; z-index: -5';
    } else {
      bucket.style.cssText = 'opacity: 1; z-index: 999';
    }
  };

  if (/iPhone|iPod|Android/i.test(navigator.userAgent)) {
    var href = $('#mobile-order').offset().top - innerHeight;
    $('a.to-order, a.bucket').on('click', function () {
      $('html, body').animate({
        scrollTop: href
      }, 800);
    });
    window.addEventListener('scroll', function () {
      toggleBucket();
    });
    window.addEventListener('resize', function () {
      toggleBucket();
    });
  } else {
    var _href = $('#catalog').offset().top;
    $('a.to-order, a.bucket').on('click', function () {
      $('html, body').animate({
        scrollTop: _href
      }, 800);
    });
  }
};