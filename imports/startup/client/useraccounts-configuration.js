AccountsTemplates.configure({

    defaultLayout: 'backendLayout',

    defaultLayoutRegions: {
        nav: 'nav',
        footer: 'footer'
    },

    defaultContentRegion: 'main',

    showForgotPasswordLink: false,
    forbidClientAccountCreation: false,
    enablePasswordChange: true
});

AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');