import { Mongo } from 'meteor/mongo';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Vacancies = new Mongo.Collection('Vacancies');

Vacancies.categories = ['finance', 'admin', 'engineering', 'it', 'manufacturing', 'scm'];
Vacancies.experiences = ['graduate', '1-4', '>4'];

Vacancies.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: 'Title'
    },
    location: {
        type: String,
        label: 'Location',
        autoform: {
            afFieldInput: {
                type: "hidden"
            },
            defaultValue: 'Hefei',
            label: false
        }
    },
    fieldOfExpertise: {
        type: String,
        label: 'Field of Expertise',
        allowedValues: Vacancies.categories,
        autoform: {
            options: [
                {label: "Finance", value: "finance"},
                {label: "HR/Admin/Security", value: "admin"},
                {label: "Engineering", value: "engineering"},
                {label: "Information Technology", value: "it"},
                {label: "Manufacturing & Operations", value: "manufacturing"},
                {label: "Supply Chain", value: "scm"}
            ]
        }
    },
    experience: {
        type: String,
        label: 'Experience',
        allowedValues: ['graduate', '1-4', '>4'],
        autoform: {
            options: [
                {label: "Graduate", value: "graduate"},
                {label: "1-4 years", value: "1-4"},
                {label: ">4 years", value: ">4"}
            ]
        }
    },
    peopleSoftId: {
        type: String,
        label: 'PeopleSoft Job ID',
        optional: true
    },
    'mobileAtsId': {
        type: String,
        label: '51Job ID',
        optional: true
    },
    purpose: {
        type: String,
        label: 'Purpose of the Position',
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'tinyMCE',
                data: {
                    height: 100,
                    plugins: "paste"
                }
            }
        }
    },
    responsibility: {
        type: String,
        label: 'Day to Day Responsibilities',
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'tinyMCE',
                data: {
                    height: 100,
                    plugins: "paste"
                }
            }
        }
    },
    'educationAndExperience': {
        type: String,
        label: 'Education & Experience',
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'tinyMCE',
                data: {
                    height: 100,
                    plugins: "paste"
                }
            }
        }
    },
    requiredSkills: {
        type: String,
        label: 'Required Skills',
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'tinyMCE',
                data: {
                    height: 100,
                    plugins: "paste"
                }
            }
        }
    },
    desiredSkills: {
        type: String,
        label: 'Desired Skills',
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'tinyMCE',
                data: {
                    height: 100,
                    plugins: "paste"
                }
            }
        }
    },
    softSkills: {
        type: String,
        label: 'Soft Skills',
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'tinyMCE',
                data: {
                    height: 100,
                    plugins: "paste"
                }
            }
        }
    }
}));


if (Meteor.isServer) {
    Vacancies.deny({
        insert(userId) { return !userId; },
        update(userId) { return !userId; },
        remove(userId) { return !userId; }
    });
}

Meteor.startup(() => {
    VacanciesTable = new Tabular.Table({
        name: "Vacancies",
        collection: Vacancies,
        columns: [
            {data: "title", title: "Position Title"},
            {
                data: "fieldOfExpertise",
                title: "Vacancy Category",
                render(val, type, doc) {
                    return TAPi18n.__(`vacancyCategories.${val}`);
                }
            },
            {data: "experience", title: "Experience"},
            {data: "mobileAtsId", title: "51Job Posting ID"},
            {data: "peopleSoftId", title: "PeopleSoft Posting ID"},
            {data: "location", title: "Location"},
            {
                tmpl: Meteor.isClient && Template.vacanciesControlCell
            }
        ],
        order: [[0,"asc"]]
    });
});
