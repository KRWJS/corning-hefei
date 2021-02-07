const kjua = require('kjua');

import {Vacancies} from '../../../api/vacancies/vacancies';
import { analytics } from 'meteor/okgrow:analytics';

import './show.html';

Template.App_Vacancies_detail.onRendered(function() {
    window.scrollTo(0,0);

    $('button').tooltip({
      trigger: 'click',
      placement: 'bottom'
    });

    function setTooltip(btn, message) {
      $(btn).tooltip('hide')
        .attr('data-original-title', message)
        .tooltip('show');
    }

    function hideTooltip(btn) {
      setTimeout(function() {
        $(btn).tooltip('hide');
      }, 2000);
    }

    // Clipboard

    var clipboard = new Clipboard('button');

    clipboard.on('success', function(e) {
      setTooltip(e.trigger, 'Copied!');
      hideTooltip(e.trigger);
    });

    clipboard.on('error', function(e) {
      setTooltip(e.trigger, 'Failed!');
      hideTooltip(e.trigger);
    });

  });



Template.App_Vacancies_detail.onCreated(function() {
    this.getVacancyId = () => FlowRouter.getParam('_id');

    this.autorun(() => {
        this.subscribe('vacancies.get', this.getVacancyId());
    });
});


Template.App_Vacancies_detail.helpers({

    applyUrl() {
        const instance = Template.instance();
        const  vacancy = Vacancies.findOne({_id: instance.getVacancyId()});

        if (Session.get('device') == 'desktop') {
            return `http://jobs.51job.com/hefei/${vacancy['mobileAtsId']}.html`;
        }

        return `http://mco.51job.com/jobdetail.php?jobid=${vacancy['mobileAtsId']}&ctmid=107588`;
    },

    vacancy() {
        const instance = Template.instance();
        return Vacancies.findOne({_id: instance.getVacancyId()});
    },

    vacancyUrl() {
        const instance = Template.instance();
        const id = instance.getVacancyId();
        const lang = TAPi18n.getLanguage();
        return FlowRouter.url('vacancies.show', {_id: id}, {lang: lang});
    },

    emailUrl() {
        const subject = TAPi18n.__('social.share-message');
        const instance = Template.instance();
        const id = instance.getVacancyId();
        const lang = TAPi18n.getLanguage();
        const pageUrl = FlowRouter.url('vacancies.show', {_id: id}, {lang: lang});
        return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(pageUrl)}`;
    },

    translationKey(k, f) {
        return `${k}.${f}`;
    },

    qrCode() {
        const instance = Template.instance();
        const id = instance.getVacancyId();
        const lang = TAPi18n.getLanguage();
        const url = FlowRouter.url('vacancies.show', {_id: id}, {lang: lang});

        return $(kjua({text: url})).addClass('img-responsive').attr('crossOrigin', null).prop('outerHTML');
    },

    socialSharingTitle() {
        return TAPi18n.__('social.share-message');
    },

    displayEmail() {
        return !window.navigator.userAgent.match('MicroMessenger');
    },

    experienceLevel(vacancy) {
        return TAPi18n.__(`experienceLevel.${vacancy.experience}`);
    },

    subsReady() {
        return Template.instance().subscriptionsReady();
    }
});

Template.App_Vacancies_detail.events({
    'click .js-vacancy-apply'(event) {
    //event.preventDefault();

        analytics.page({
            title: 'Vacancy Apply',
            path: window.location.pathname + '/apply',
            referrer: document.referrer
        });

        // use same check as for applyUrl to determine ATS
        var ats = '51jobs';

        if (Session.get('device') == 'desktop') {
            ats = 'peopleSoft';
        }

        analytics.track('Clicked Vacancy Application Link', {
            category: 'Vacancy CTA',
            label: ats
        });
    }
});

function PopupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }

    return false;
}

window.shareToFacebookPopup = function(url) {
    var shareUrl = "https://www.facebook.com/sharer/sharer.php?u="+url;
    return PopupCenter(shareUrl,null,600,400);
}

window.shareToLinkedin = function(url) {
    var shareUrl = "https://www.linkedin.com/shareArticle?mini=true&url="+url;
    return PopupCenter(shareUrl,null,570,520);
}

window.shareToWeibo = function(url, content) {
    var shareUrl = "http://v.t.sina.com.cn/share/share.php?url="+url+"&title="+encodeURIComponent(content);
    return PopupCenter(shareUrl,null,570,520);
}
