import './glass-header.html';

Template.Header_glass.events({
    'click .js-change-locale'(event, template) {
        event.preventDefault();

        const routeName = FlowRouter.getRouteName();

        let lang = $(event.currentTarget).data('lang');
        FlowRouter.setQueryParams({lang});

        TAPi18n.setLanguage(lang).done(function () {
            if (routeName == 'vacancies.show' || routeName == 'homepage') {
                localStorage.setItem('hefei.locale', lang);
                location.reload();
            }

            $('.multi-site--selected').removeClass('multi-site--selected');
            $(`[data-lang=${lang}]`).addClass('multi-site--selected');
        }).fail(function(err) {
            console.log(`failed: ${err}`);
        });
    }
});

Template.Header_glass.helpers({
    isActiveLang(lang) {
        return TAPi18n.getLanguage() == lang ? "multi-site--selected" : "";
    },
    title() {
        return `bannerHeading.${this.section()}`;
    }
});

Template.Header_glass.onRendered(function () {
  $(window).scroll(function() {
  if ($(this).scrollTop() > 1){
      $('.container-sticky').addClass("sticky");
    }
    else{
      $('.container-sticky').removeClass("sticky");
    }
  });
});
