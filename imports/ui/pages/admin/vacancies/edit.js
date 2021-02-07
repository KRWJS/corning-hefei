import {Vacancies} from '../../../../api/vacancies/vacancies';

import './edit.html';

Template.Vacancies_edit.onCreated(function() {
    this.getVacancyId = () => FlowRouter.getParam('_id');

    this.autorun(() => {
        this.subscribe('vacancies.get', this.getVacancyId());
    });

    AutoForm.hooks({
        editVacancyForm: {
            onSuccess: function(formType, result) {
                FlowRouter.go('admin.vacancies.index');
            }
        }
    });
});




Template.Vacancies_edit.helpers({
    Vacancies() {
        return Vacancies;
    },
    vacancy() {
        const id = Template.instance().getVacancyId();
        return Vacancies.findOne(id);
    }
});
