Template.autoformTinyMCE.onCreated(function() {
    this.value = new ReactiveVar(this.data.value);
});

Template.autoformTinyMCE.onRendered(function() {
    var initOptions = this.data || {};
    initOptions.selector = '#' + this.firstNode.id;
    initOptions.skin_url = '/packages/teamon_tinymce/skins/lightgray';
    const editor = tinymce.init(initOptions);

    this.autorun(() => {
        const val = this.value.get();
        editor.then(function(editors) {
            tinymce.get(editors[0].id).setContent(val);
        });
    });

});

Template.autoformTinyMCE.helpers({
    schemaKey: function() {
        return this.atts['data-schema-key'];
    },
    text: function() {
        Tracker.nonreactive(() => {
            const t = Template.instance();
            if (t.value.get() !== this.value) {
                t.value.set(this.value);
            }
        });

        return this.value;
    },
    id: function() {
        return Math.random().toString(36).substring(7);
    }
});

AutoForm.addInputType('tinyMCE', {
    template: "autoformTinyMCE",
    valueOut: function() {
        return this.val();
    }
});
