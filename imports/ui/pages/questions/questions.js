import './questions.html';
import { analytics } from 'meteor/okgrow:analytics';

Template.Questions_1.onRendered(function() {
    $('.js-questions-wrapper,.js-answers-wrapper').velocity('fadeIn', {delay: 1000, duration: 800});
});

const deviceSpecificMessageMixin = {
    getDeviceMessage(questionId) {
        return `${questionId}.${Session.get('device')}`;
    }
};


Template.Questions_2_1.helpers(deviceSpecificMessageMixin);
Template.Questions_2_2.helpers(deviceSpecificMessageMixin);


Template.Questions_3.events({
    'click .js-heard-of-hefei'(event, template) {
        const ans = $(event.currentTarget).data('answer');
        Session.set('heardOfHefei', ans == 'yes');
    }
});

Template.Questions_4_1.events({
    'click .js-born-in-hefei'(event, template) {
        const ans = $(event.currentTarget).data('answer');
        Session.set('bornInHefei', ans == 'yes');
    }
});

Template.Questions_4_1_1.events({
    'click .js-living-in-hefei'(event, template) {
        const ans = $(event.currentTarget).data('answer');
        Session.set('livingInHefei', ans == 'yes');
    }
});

Template.Questions_5.onRendered(function() {

    $.Velocity.RunSequence([
        {
            e: $('.js-primary-background'),
            p: {opacity: 0},
            options: {duration: 1000}
        },
        {
            e: $('.js-secondary-background, .js-door-left-background, .js-door-right-background'),
            p: {translateZ: 0, opacity: 1},
            options: {duration: 1000, sequenceQueue: false}
        },
        {
            e: $('.js-secondary-background, .js-door-left-background, .js-door-right-background'),
            p: {translateZ: 0, scale: 1.3   , translateY: "-=11%"},
            options: {duration: 500}
        },
        {
            e: $('.js-secondary-background'),
            p: {opacity: 0.5},
            options: {delay: 500, duration: 1000}
        },
        {
            e: $('.js-nologo-background'),
            p: {scale: 1.3, translateY: "-=11%"},
            options: {delay: 500, duration: 0.5, sequenceQueue: false}
        },
        {
            e: $('.js-nologo-background'),
            p: {opacity: 1},
            options: {duration: 1000, sequenceQueue: false}
        },
        {
            e: $('.js-questions-wrapper,.js-answers-wrapper'),
            p: 'fadeIn',
            options: {duration: 500}
        }
    ]);

});


Template.Questions_6.onRendered(function() {

    $.Velocity.RunSequence([
        {
            e: $('.js-nologo-background, .js-door-left-background, .js-door-right-background'),
            p: {opacity: 1, scale: 1.3 , translateY: "-=11%", translateZ: 0},
            options: {duration: 0}
        },
        {
            e: $('.js-door-left-background'),
            p: {translateX:'-210px', translateZ: 0},
            options: {duration: 1500, easing: 'ease-in-out' }
        },
        {
            e: $('.js-door-right-background'),
            p: {translateX:'210px', translateZ: 0},
            options: {duration: 1500, easing: 'ease-in-out', sequenceQueue: false}
        },
        {
            e: $('.js-questions-wrapper,.js-answers-wrapper'),
            p: 'fadeIn',
            options: {duration: 500}
        }
    ]);

});

Template.Questions_6.events({
    'click .js-experience'(event, template) {
        const ans = $(event.currentTarget).data('answer');
        Session.set('experience', ans);
        localStorage.setItem('hefei.experience', ans);
    }
});

Template.Questions_7.onRendered(function() {
    $.Velocity.RunSequence([
        {
            e: $('.js-questions-wrapper,.js-answers-wrapper'),
            p: 'fadeIn',
            options: {duration: 500}
        }
    ]);
});

Template.Questions_7.helpers({
    questionText() {
        const exp = Session.get('experience');
        return exp == 'graduate' ? 'q7.q1_graduate' : 'q7.q1_experienced';
    }
});

Template.Questions_7.events({
    'click .js-expertise'(event, template) {
        event.preventDefault();

        analytics.page({
            title: 'Question path complete',
            path: '/questions/complete',
            referrer: document.referrer
        });

        const ans = $(event.currentTarget).data('answer');
        Session.set('expertise', ans);
        localStorage.setItem('hefei.expertise', ans);

        const cond = (c) => Session.get(c);

        let profileMatched = null;

        if (cond('heardOfHefei') && cond('bornInHefei') && !cond('livingInHefei') && cond('experience') == '>4') {
            profileMatched = '2';
        } else if (cond('heardOfHefei') && cond('bornInHefei') && !cond('livingInHefei') && cond('experience') == 'graduate') {
            profileMatched = '2';
        } else if (cond('heardOfHefei') && cond('bornInHefei') && !cond('livingInHefei') && cond('experience') == '1-4') {
            profileMatched = '6';
        } else if (cond('heardOfHefei') && cond('bornInHefei') && cond('livingInHefei') && cond('experience') == '>4') {
            profileMatched = '1';
        } else if (cond('heardOfHefei') && cond('bornInHefei') && cond('livingInHefei') && cond('experience') == 'graduate') {
            profileMatched = '4';
        } else if (cond('heardOfHefei') && cond('bornInHefei') && cond('livingInHefei') && cond('experience') == '1-4') {
            profileMatched = '1';
        } else if (cond('heardOfHefei') && !cond('bornInHefei') && cond('experience') == '1-4') {
            profileMatched = '3';
        } else if (cond('heardOfHefei') && !cond('bornInHefei') && cond('experience') == 'graduate') {
            profileMatched = '5';
        } else if (cond('heardOfHefei') && !cond('bornInHefei') && cond('experience') == '>4') {
            profileMatched = '3';
        }

        if (profileMatched) {
            FlowRouter.go('why.profile', {id: profileMatched});
        } else {
            FlowRouter.go('citybook.index');
        }

    }
});
