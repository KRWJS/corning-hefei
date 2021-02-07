import '../../api/api';
import './fixtures';
import { Vacancies } from '../../api/vacancies/vacancies';

Picker.route('/', (params, req, res, next) => {
    let lang = params.query.lang;

    lang = lang || 'zh';

    const title = (req.headers['user-agent'].match('MicroMessenger')) ? 'social.share-message-wechat': 'social.share-message';

    req.dynamicHead = (req.dynamicHead || "");
    req.dynamicHead += `
    <meta property="og:title" content="${TAPi18n.__('social.share-message', {}, lang)}" />
    <meta property="og:image" content="${Meteor.absoluteUrl('images/corning-logo-opengraph-180x110.jpg')}" />
    <meta property="og:description" content="" />
    <meta property="og:image:width" content="180" />
    <meta property="og:image:height" content="110" />
    <title>${TAPi18n.__(title, {}, lang)}</title>`;

    req.dynamicBody = (req.dynamicBody || "");
    req.dynamicBody += `
    <img src='${Meteor.absoluteUrl('images/corning-logo-opengraph.jpg')}' alt="Corning logo" width="600" height="600" class="sr-only"/>`;

    next();
});


Picker.route('/vacancies/:_id', (params, req, res, next) => {
    let lang = params.query.lang;

    lang = lang || 'zh';

    const vacancy = Vacancies.findOne({_id: params._id});
    const title = (req.headers['user-agent'].match('MicroMessenger')) ? 'social.share-message-wechat': 'social.share-message';

    req.dynamicHead = (req.dynamicHead || "");
    req.dynamicHead += `
    <meta property="og:title" content="${TAPi18n.__('social.share-message', {}, lang)}" />
    <meta property="og:image" content="${Meteor.absoluteUrl('images/corning-logo-opengraph-180x110.jpg')}" />
    <meta property="og:description" content="${vacancy.title}" />
    <meta property="og:image:width" content="180" />
    <meta property="og:image:height" content="110" />
    <title>${TAPi18n.__(title, {}, lang)}</title>`;

    req.dynamicBody = (req.dynamicBody || "");
    req.dynamicBody += `
    <img src='${Meteor.absoluteUrl('images/corning-logo-opengraph.jpg')}' alt="Corning logo" width="600" height="600" class="sr-only"/>`;

    next();
});
