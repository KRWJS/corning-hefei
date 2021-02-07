import { Meteor } from 'meteor/meteor';

import { Vacancies } from '../vacancies';

Meteor.publish("vacancies.get", function (_id) {
    return Vacancies.find({_id: _id});
});

Meteor.publish("vacancies.all", function (_id) {
    return Vacancies.find({});
});

Meteor.publish("vacancies", function (limit, filters) {

    if (!filters) {
        filters = {};
    }

    if (!limit) {
        limit = 15;
    }

    return Vacancies.find(filters, {sort: {title: 1}, limit: limit});
});