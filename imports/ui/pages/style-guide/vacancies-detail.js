import './vacancies-detail.html';

Template.App_Vacancies_detail.onRendered(function() {

  var isVisible = false;

    var hideAllPopovers = function() {
       $('#wechat-invite').each(function() {
            $(this).popover('hide');
        });
    };

    $('#wechat-invite').popover({
        html: true,
        trigger: 'manual'
    }).on('click', function(e) {
        // if any other popovers are visible, hide them
        if(isVisible) {
            hideAllPopovers();
        }

        $(this).popover('show');

        isVisible = true;
        e.stopPropagation();
    });


    $(document).on('click', function(e) {
        hideAllPopovers();
        isVisible = false;
    });
});


Template.App_Vacancies_detail.helpers({
    emailUrl() {


        const subject = TAPi18n.__('social.share-message');
        const pageUrl = `${Meteor.absoluteUrl(FlowRouter.current().path)}`;

        return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(pageUrl)}`;
    }
});



Template.App_Vacancies_detail.onRendered(function() {

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

  function shareToFacebookPopup(url) {
    var shareUrl = "https://www.facebook.com/sharer/sharer.php?u="+url;
    return PopupCenter(shareUrl,null,600,400);
  }

  function shareToLinkedin(url) {
    var shareUrl = "https://www.linkedin.com/shareArticle?mini=true&url="+url;
    return PopupCenter(shareUrl,null,570,520);
  }

  function shareToWeibo(url, content) {
    var shareUrl = "http://v.t.sina.com.cn/share/share.php?url="+url+"&title="+encodeURIComponent(content);
    return PopupCenter(shareUrl,null,570,520);
  }


});
