CKEDITOR.dialog.add( 'imgCaptionDialog', function( editor ) {

    return {
        title: 'Image Caption',
        minWidth: 400,
        minHeight: 200,
        contents: [
            {
                id: 'image-caption',
                label: '',
                elements: [
                    {
                        type: 'radio',
                        id: 'caption-type',
                        label: 'Type',
						items: [ [ 'Full', 'caption-full' ], [ 'Aside', 'caption-aside' ] ],
						style: 'color: green',
						'default': 'caption-full',
                    },
                    {
                        type: 'textarea',
                        id: 'caption-text',
                        label: 'Caption'
                    }
                ]
            }        
		],
		onShow: function() {

			// get selection

			console.log('onshow');

			function ingestSelection() {

				var selection = editor.getSelection().getSelectedElement().$;

				var img, figure, figurecaption;

				if (!selection || selection.nodeName !== "IMG" ) new Error('Select an Image');

				img = selection;

				if (img.parentNode.nodeName === "FIGURE") {
					figure = img.parentNode;
					figurecaption = figure.querySelectorAll('figurecaption')[0];
				}

				return {
					img: img,
					figure: figure,
					figurecaption: figurecaption
				};
			}

			try {

				this.selection = window.blah = ingestSelection();

				if (this.selection.figurecaption) {
					this.setValueOf('image-caption', 'caption-text', this.selection.figurecaption.innerText);
				}

				if (this.selection.figure) {
					this.setValueOf('image-caption', 'caption-type', this.selection.figure.dataset.type);
				}


			} catch (error) {
				this.selection = null;
			}

		},

        onOk: function() {

			if (this.selection) {
				// create elements
				var figure = editor.document.createElement( 'figure' ),
					caption = editor.document.createElement('figurecaption');

				// add inputs
				figure.setAttribute( 'class', this.getValueOf( 'image-caption', 'caption-type' ) );
				figure.setAttribute('data-type', this.getValueOf( 'image-caption', 'caption-type' ));

				caption.setText(this.getValueOf( 'image-caption', 'caption-text' ).trim());
			
				// wrap highlighted image, checking that it's an img tag
				// insert

				if (this.selection.figure) {
					this.selection.figure.remove();
				}

				figure.append(new CKEDITOR.dom.element(this.selection.img));
				figure.append(caption);

				editor.insertElement(figure);
			}
        }
    };
});


