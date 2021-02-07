import 'jquery-match-height';

import {Vacancies} from '../../../api/vacancies/vacancies';
import {ReactiveVar} from 'meteor/reactive-var';
import { analytics } from 'meteor/okgrow:analytics';

import './index.html';

const PAGE_ITEMS = 30;

Template.App_Vacancies_index.onCreated(function () {
    this.categoryFilter = new ReactiveVar();
    this.experienceFilter = new ReactiveVar();

    if (!_.isEmpty(localStorage.getItem('hefei.expertise'))) {
        this.categoryFilter.set(localStorage.getItem('hefei.expertise'));
    }

    if (!_.isEmpty(localStorage.getItem('hefei.experience'))) {
        this.experienceFilter.set(localStorage.getItem('hefei.experience'));
    }


    this.vacanciesLimit = new ReactiveVar(PAGE_ITEMS);

    this.autorun(() => {
        let cleanFilters = {};

        if (!_.isEmpty(this.categoryFilter.get('expertise'))) {
            cleanFilters.fieldOfExpertise = this.categoryFilter.get('expertise');
        }

        if (!_.isEmpty(this.experienceFilter.get('experience'))) {
            cleanFilters.experience = this.experienceFilter.get('experience');
        }

        this.subscribe('vacancies', this.vacanciesLimit.get(), cleanFilters);
    });
});

Template.App_Vacancies_index.onRendered(function() {
    window.scrollTo(0,0);

    const instance = Template.instance();

    const loadMoreContent = function() {
        instance.vacanciesLimit.set(
            instance.vacanciesLimit.get() + PAGE_ITEMS
        );
    };

    function showMoreVisible() {

        var scrollTop = $(document).scrollTop();
        var windowHeight = $(window).height();
        var bodyHeight = $(document).height() - windowHeight;
        var scrollPercentage = (scrollTop / bodyHeight);

        let filters = {};

        if (!_.isEmpty(instance.categoryFilter.get())) {
            filters.fieldOfExpertise = instance.categoryFilter.get();
        }

        if (!_.isEmpty(instance.experienceFilter.get())) {
            filters.experience = instance.experienceFilter.get();
        }

         const hasMore = !(Vacancies.find(filters, {sort: {title: 1}}).count() < instance.vacanciesLimit.get());

        // if the scroll is more than 50% from the top, load more content.
        if (scrollPercentage > 0.5 && hasMore && instance.subscriptionsReady()) {
            loadMoreContent();
        }
    }

    showMoreVisible();
    $(window).scroll(showMoreVisible);
});

Template.App_Vacancies_index.helpers({
    vacancies() {
        const instance = Template.instance();

        let filters = {};

        if (!_.isEmpty(instance.categoryFilter.get())) {
            filters.fieldOfExpertise = instance.categoryFilter.get();
        }

        if (!_.isEmpty(instance.experienceFilter.get())) {
            filters.experience = instance.experienceFilter.get();
        }

        return Vacancies.find(filters, {sort: {title: 1}});
    },

    categories() {
        return Vacancies.categories;
    },

    experiences() {
        return Vacancies.experiences;
    },

    updateFilters() {
        const instance = Template.instance();

        return function(filters) {
            const {category, experience} = filters;
            instance.categoryFilter.set(category);
            instance.experienceFilter.set(experience);
            instance.vacanciesLimit.set(PAGE_ITEMS);
        };
    },

    moreResults() {
        const instance = Template.instance();

        let filters = {};

        if (!_.isEmpty(instance.categoryFilter.get())) {
            filters.fieldOfExpertise = instance.categoryFilter.get();
        }

        if (!_.isEmpty(instance.experienceFilter.get())) {
            filters.experience = instance.experienceFilter.get();
        }

        return !instance.subscriptionsReady() || !(Vacancies.find(filters, {sort: {title: 1}}).count() < instance.vacanciesLimit.get());
    }
});





Template.App_Vacancies_card.helpers({
    experienceLabel(vacancy) {
        return TAPi18n.__(`experienceLevel.${vacancy.experience}`);
    }
});

Template.App_Vacancies_card.events({
    'click .js-vacancy-card'(event) {
        event.preventDefault();

        analytics.track('Clicked Vacancy Detailed Link', {
            category: 'Vacancy CTA'
            // label: ''
        });

        const url = event.currentTarget.href;
        document.location.href = url;
    }
});

