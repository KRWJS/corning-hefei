import './persona.html';
import { analytics } from 'meteor/okgrow:analytics';

Template.Why_persona.onCreated(function() {
    this.getProfileId = () => FlowRouter.getParam('id');
});

Template.Why_persona.onRendered(function() {
    window.scrollTo(0,0);
});

Template.Why_persona.helpers({
    personaImage() {
        const profileId = Template.instance().getProfileId();
        return `/images/personas/${profileId}-large.jpg`;
    },

    profileText(key) {
        const profileId = Template.instance().getProfileId();
        return `personas.${profileId}.${key}`;
    },

    isMatched() {
        return FlowRouter.getQueryParam('matched') == 'true';
    }
});

Template.Why_persona.events({
    'click .js-vacancies-link'(event) {
        //event.preventDefault();
        // TODO: add persona name in the label
        analytics.track('Clicked Vacancies Link', {
            category: 'Persona CTA'
            // label: ''
        });
    }
});

