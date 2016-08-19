console.log('image plugin');
CKEDITOR.plugins.add('imageCaptions',
{
    init: function(editor) {

        var pluginName = 'imageCaptions';

		editor.addCommand( pluginName, new CKEDITOR.dialogCommand( pluginName + 'Dialog' ) );

		editor.ui.addButton('ImageCaptions', {
			label: 'Insert Image with Captions',
			command: pluginName,
			toolbar: 'styles'
		});

        // CKEDITOR.dialog.add(pluginName, this.path + 'dialogs/footnote.js');
     
    }
});
