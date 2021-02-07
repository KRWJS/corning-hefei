import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Vacancies } from '../../../../api/vacancies/vacancies';
import './index.html';




Template.Vacancies_index.helpers({
    table() {
        return VacanciesTable;
    }
});




Template.vacanciesControlCell.events({
    'click .js-admin-remove-vacancy'(event, template) {

        if (confirm('Remove this vacancy?')) {
            Vacancies.remove({_id: this._id});
        }
    }
});
