import './filter.html';

Template.filter.onRendered(function() {
    if (!_.isEmpty(localStorage.getItem('hefei.expertise'))) {
        $('.js-category-filter').val(localStorage.getItem('hefei.expertise'));
    }

    if (!_.isEmpty(localStorage.getItem('hefei.experience'))) {
        $('.js-experience-filter').val(localStorage.getItem('hefei.experience'));
    }
});

Template.filter.helpers({
    translationKey(k,f){
        return `${k}.${f}`;
    }
});

Template.filter.events({
    'change .js-experience-filter, change .js-category-filter'(event, template) {
        const experience = $('.js-experience-filter').val();
        const category = $('.js-category-filter').val();
        this.updateFilters({experience, category});
    }
});