import './useraccounts-configuration';
import './browser-detection';
import './routes';

const lang = localStorage.getItem('hefei.locale');

if (lang) {
    TAPi18n.setLanguage(lang)
        .done(function () {
            console.log('Preferred language restored');
        })
        .fail(function (error_message) {
            console.log(error_message);
        });
} else {
    TAPi18n.setLanguage('zh')
}
