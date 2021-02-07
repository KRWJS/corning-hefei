import './hefei-living.html';
import { analytics } from 'meteor/okgrow:analytics';

Template.living_page.events({
    'click .js-change-locale'(event, template) {
        event.preventDefault();

        let lang = $(event.currentTarget).data('lang');
        FlowRouter.setQueryParams({lang});

        TAPi18n.setLanguage(lang).done(function () {
            $('.multi-site--selected').removeClass('multi-site--selected');
            $(`[data-lang=${lang}]`).addClass('multi-site--selected');
        }).fail(function(err) {
            console.log(`failed: ${err}`);
        });
    }
});

Template.living_page.helpers({
    isActiveLang(lang) {
        return TAPi18n.getLanguage() == lang ? "multi-site--selected" : "";
    },
    displayIntro() {

        if (localStorage.getItem('hefei.displayedCityBookIntro') != 'true') {
            localStorage.setItem('hefei.displayedCityBookIntro', 'true');
            return true;
        }

        return localStorage.getItem('hefei.displayedCityBookIntro') != 'true';
    }
});

Template.living_page.onRendered(function () {
    window.scrollTo(0, 0);


  //Slick slider settings
  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    speed: 1000,
    dots: true,
    asNavFor: '.slider-nav'
  });


  //Slick slider navigation settings
  $('.slider-nav').slick({
    slidesToShow: 7,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    centerMode: false,
    focusOnSelect: true
  });

  //Set active class to first nav slide
  $('.slider-nav .slick-slide').eq(0).addClass('slide__button--active');


  //On before slide change match active nav to current slide
  $('.slider-for').on('beforeChange', function (event, slick, currentSlide, nextSlide) {

    event.preventDefault();

  	var mySlideNumber = nextSlide;

  	$('.slider-nav .slick-slide').removeClass('slide__button--active');

  	$('.slider-nav .slick-slide[data-slick-index='+mySlideNumber+']').addClass('slide__button--active');

  });


  //Slick slider navigation to scroll through content
  $('.slider-for').on('beforeChange', function(event, slick, currentSlide, nextSlide){

    event.preventDefault();

    $('.slide-content[data-id=' + (currentSlide) + ']').hide();
    $('.slide-content[data-id=' + (nextSlide) + ']').show();

    // only send GA pageview for currently visible slick slider (there is a mobile one and a desktop one)
    if ($(event.currentTarget).css('display') == 'block') {
        var label = $('.slick-slide--nav[data-index=' +  (nextSlide) + ']').data('label');

        analytics.page({
             title: 'citybook.index',
             path: '/citybook/' + label,
             referrer: document.referrer
         });
    }

  });





  //Sticky header
  $(window).scroll(function() {
  if ($(this).scrollTop() > 1){
      $('.container-sticky').addClass("sticky");
    }
    else{
      $('.container-sticky').removeClass("sticky");
    }
  });





  //Toggle citybook accordion
  $('.js-panel-heading-hefei').on('click', function () {

    //Toggle panel heading to show open styles
    $(this).toggleClass('js-panel-hefei--init');

  });




});
