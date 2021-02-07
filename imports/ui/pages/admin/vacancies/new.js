import {Vacancies} from '../../../../api/vacancies/vacancies';

import './new.html';

Template.Vacancies_insert.onCreated(function() {
    AutoForm.hooks({
        insertVacancyForm: {
            onSuccess: function(formType, result) {
                FlowRouter.go('admin.vacancies.index');
            }
        }
    });
});




Template.Vacancies_insert.helpers({
    Vacancies() {
        return Vacancies;
    }
});
