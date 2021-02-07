/****************************************
 * Basic modules
 ****************************************/

import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';





/****************************************
 * Import view templates - general
 ****************************************/

import '../../ui/layouts/backendLayout';
import '../../ui/layouts/appLayout';
import '../../ui/layouts/questionLayout';
import '../../ui/layouts/appLayout';

import '../../ui/components/admin/nav';
import '../../ui/components/navtabs';

import '../../ui/pages/admin/vacancies/index';
import '../../ui/pages/admin/vacancies/new';
import '../../ui/pages/admin/vacancies/edit';

import '../../ui/components/header';
import '../../ui/components/glass-header';
import '../../ui/components/footer';
import '../../ui/components/filter';
import '../../ui/components/pagination';

// QUESTIONS
import '../../ui/pages/questions/questions';

// VACANCIES
import '../../ui/pages/vacancies/index';
import '../../ui/pages/vacancies/show';

import '../../ui/pages/why/index';
import '../../ui/pages/why/persona';

// STYLE GUIDE
import '../../ui/pages/style-guide/components';
import '../../ui/pages/style-guide/intro';

// HEFEI LIVING (CITY BOOK)
import '../../ui/pages/hefei-living/hefei-living';


/****************************************
 * App routes
 ****************************************/

FlowRouter.triggers.enter([function(context) {
    const langParam = context.queryParams.lang;

    if (langParam) {
        TAPi18n.setLanguage(langParam);
    }

    // possibility to move window.scrollTo from child template rendered function to here
    // window.scrollTo(0,0);

    function removeEvents() {
        window.removeEventListener('scroll', sendInteractionEvent);
    }

    function sendInteractionEvent() {
        analytics.track(context.path, {
            category: 'scrolled'
            // label: ''
        });
        removeEvents();
    }

    // add a small timeout before binding the event listener, so we don't trigger
    // the scroll on the window.scrollTo(0,0)
    setTimeout(function() {
        window.addEventListener('scroll', sendInteractionEvent);
    }, 50);
}]);

FlowRouter.route('/', {
    name: 'homepage',

    action(params, queryParams) {
        BlazeLayout.render('appLayout', {
            nav: 'header',
            main: 'Questions_layout',
            background: 'Background_1',
            question: 'Questions_1',
            answers: 'Answers_1',
            footer: 'footer',
            questionId: '1'
        });
    }

});

FlowRouter.route('/questions/:questionId', {
    name: 'questions.get',

    action(params, queryParams) {

        const questionsTemplate = `Questions_${params.questionId}`;
        const backgroundTemplate = `Background_${params.questionId}`;

        let footer = 'footer';

        if (_.contains(['5','6','7'], params.questionId)) {
            footer = '';
        }

        BlazeLayout.render('appLayout', {
            nav: 'header',
            main: 'Questions_layout',
            background: backgroundTemplate,
            question: questionsTemplate,
            footer: footer,
            questionId: params.questionId
        });
    }
});

FlowRouter.route('/why-corning/:id', {
    name: 'why.profile',

    action(params, queryParams) {
        BlazeLayout.render('appLayout', {
            nav: 'Header_glass',
            main: 'Why_persona',
            profile: params.id,
            backUrl: FlowRouter.path('why.index'),
            section: 'why'
        });
    }
});

FlowRouter.route('/why-corning/', {
    name: 'why.index',

    action(params, queryParams) {
        BlazeLayout.render('appLayout', {
            nav: 'Header_glass',
            main: 'Why_index',
            section: 'why'
        });
    }
});



/****************************************
 * Admin routes
 ****************************************/

const adminRoutes = FlowRouter.group({
    prefix: '/admin',
    name: 'admin',
    triggersEnter: [AccountsTemplates.ensureSignedIn]
});

adminRoutes.route('/', {
    name: 'admin.vacancies.index',

    action(params, queryParams) {
        BlazeLayout.render('backendLayout', {
            nav: 'backendNav',
            main: 'Vacancies_index'
        });
    }

});

adminRoutes.route('/vacancies/new', {
    name: 'admin.vacancies.new',

    action(params, queryParams) {
        BlazeLayout.render('backendLayout', {
            nav: 'backendNav',
            main: 'Vacancies_insert'
        });
    }
});

adminRoutes.route('/vacancies/edit/:_id', {
    name: 'admin.vacancies.edit',

    action(params, queryParams) {
        BlazeLayout.render('backendLayout', {
            nav: 'backendNav',
            main: 'Vacancies_edit'
        });
    }
});



/****************************************
 * Style guide routes
 ****************************************/

//const styleRoutes = FlowRouter.group({
//    prefix: '/style-guide',
//    name: 'style'
//});
//
//styleRoutes.route('/components', {
//    action(params, queryParams) {
//        BlazeLayout.render('backendLayout', {
//            main: 'components'
//        });
//    }
//
//});
//
//styleRoutes.route('/introLayout', {
//    action(params, queryParams) {
//        BlazeLayout.render('appLayout', {
//            nav: 'header',
//            main: 'intro-page',
//            footer: 'footer'
//        });
//    }
//
//});



/****************************************
 * Hefei living routes
 ****************************************/

const citybookRoutes = FlowRouter.group({
    prefix: '/citybook',
    name: 'citybook'
});

citybookRoutes.route('/', {
    name: 'citybook.index',
    action(params, queryParams) {
        BlazeLayout.render('appLayout', {
            main: 'living_page',
        });
    }

});

// citybookRoutes.route('/living', {
//     name: 'citybook.living',
//     action(params, queryParams) {
//         BlazeLayout.render('appLayout', {
//             nav: 'header',
//             main: 'livingliving-page',
//             backUrl: FlowRouter.path('citybook.index')
//         });
//     }
//
// });
//
// citybookRoutes.route('/transportation', {
//     name: 'citybook.transportation',
//     action(params, queryParams) {
//         BlazeLayout.render('appLayout', {
//             nav: 'header',
//             main: 'livingtransportation-page',
//             backUrl: FlowRouter.path('citybook.index')
//         });
//     }
//
// });
//
// citybookRoutes.route('/leisure', {
//     name: 'citybook.leisure',
//     action(params, queryParams) {
//         BlazeLayout.render('appLayout', {
//             nav: 'header',
//             main: 'livingleisure-page',
//             backUrl: FlowRouter.path('citybook.index')
//         });
//     }
//
// });
//
// citybookRoutes.route('/education', {
//     name: 'citybook.education',
//     action(params, queryParams) {
//         BlazeLayout.render('appLayout', {
//             nav: 'header',
//             main: 'livingeducation-page',
//             backUrl: FlowRouter.path('citybook.index')
//         });
//     }
//
// });
//
// citybookRoutes.route('/dining', {
//     name: 'citybook.dining',
//     action(params, queryParams) {
//         BlazeLayout.render('appLayout', {
//             nav: 'header',
//             main: 'livingdining-page',
//             backUrl: FlowRouter.path('citybook.index')
//         });
//     }
//
// });
//
// citybookRoutes.route('/sandt', {
//     name: 'citybook.sandt',
//     action(params, queryParams) {
//         BlazeLayout.render('appLayout', {
//             nav: 'header',
//             main: 'livingsandt-page',
//             backUrl: FlowRouter.path('citybook.index')
//         });
//     }
//
// });
//
// citybookRoutes.route('/culture', {
//     name: 'citybook.culture',
//     action(params, queryParams) {
//         BlazeLayout.render('appLayout', {
//             nav: 'header',
//             main: 'livingculture-page',
//             backUrl: FlowRouter.path('citybook.index')
//         });
//     }
//
// });
//


/****************************************
 * Vacancies routes
 ****************************************/

FlowRouter.route('/vacancies', {
    name: 'vacancies.index',

    action(params, queryParams) {
        BlazeLayout.render('appLayout', {
            nav: 'Header_glass',
            main: 'App_Vacancies_index',
            section: 'vacancies'
        });
    }
});

FlowRouter.route('/vacancies/:_id', {
    name: 'vacancies.show',

    action(params, queryParams) {
        BlazeLayout.render('appLayout', {
            nav: 'Header_glass',
            main: 'App_Vacancies_detail',
            section: 'vacancies'
        });
    }
});
