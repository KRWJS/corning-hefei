# Autoform-TinyMCE

## Description

The following package creates a new input type for [Aldeed's meteor-autoform](https://github.com/aldeed/meteor-autoform) package using the [TinyMCE](https://www.tinymce.com/) WYSIWYG text editor. ![autoform-tinymce editor](https://raw.githubusercontent.com/oohaysmlm/autoform-tinymce/master/readme/tinymce.png)

## Usage

```
meteor add skehoe1989:autoform-tinymce
```

Add the 'tinyMCE' input type to the autoform property in your collection's SimpleSchema:

```javascript
BlogPosts = new SimpleSchema({
    title: {
        type: String,
        max: 100
    },
    content: {
        type: String,
        autoform: {
            afFieldInput: {
                type: 'tinyMCE',
                data: {
                    /**  
                    *   tinyMCE initialization options
                    *   "skin_url" is not customizable for now*
                    *   See https://www.tinymce.com/docs/configure/editor-appearance/
                    */                
                    height: 300,
                    statusbar: false,
                    menubar: false
                    ...
                    ...
                }
            }
        }
    }
});
```

Maintained by [BitTiger](http://bittiger.io)

![BitTiger Logo](https://raw.githubusercontent.com/oohaysmlm/autoform-tinymce/master/readme/small_logo.png)
