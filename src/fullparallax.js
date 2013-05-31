/**
 * 
 * FullParallax jquery plugin
 *
 * Author: Oscar Chinellato
 * Version: 0.3
 *
 * Date: 2013.05.31
 *
 * Released undem MIT Licence
 * 
 */
(function( $, undefined, window, document ) {

	var plugin_name = "fullparallax",
		/**
		 * Plugin default options
		 * @type {Object}
		 */
		defaults = {
			/**
			 * Updates per second
			 * @type int
			 */
			frame_per_second : 20
		};

	function FullParallax( element, options ) {
		// callee element
		this.element = element;

		// jqwery callee object
		this.$element = $(element);

		// plugin options
		this.options = $.extend( {}, defaults, options );

		// private defaults
		this._defaults = defaults;
		this._name = plugin_name;

		this.update_rate = 1000 / this.options.frame_per_second;

		this.x_cursor = 0;
		this.y_cursor = 0;

		this.docDim = {
            height: $(document).height(),
            width: $(document).width()
        };

		// layers
		this.layers = [];

		this.init();

	}

	/**
	 * Initialization logic
	 * @return {[type]} [description]
	 */
	FullParallax.prototype.init = function() {
		// local reference
		var that = this;

		// pushing layers
		this.$element.find('div').each( function( i, item ) {
			var t = $(this);

			var pxBgX = 0,
				pxBgY = 0;

			var pxBgWidth = 0,
				pxBgHeight = 0;

			// image size adaptations form parameters passed by
			// data attributes
			if ( t.data('size') ) {
				var bgSize = t.data('size').split(';');
				var bgWidth = bgSize[0] ? bgSize[0].split(':')[1] : 'auto';
				var bgHeight = bgSize[1] ? bgSize[1].split(':')[1] : 'auto';

				if ( bgWidth.indexOf('%') > -1 ) {
					pxBgWidth = ( that.$element.width() / 100 ) * bgWidth.split('%')[0];
				} else {
					pxBgWidth = bgWidth.split('px')[0];
				}
				if ( bgHeight.indexOf('%') > -1 ) {
					pxBgHeight = ( that.$element.height() / 100 ) * bgHeight.split('%')[0];
				} else {
					pxBgHeight = bgHeight.split('px')[0];
				}
			}

			// image position adaptations
			if ( t.data('position') ) {
				var bgPosition = t.data('position').split(';');
				var bgX = bgPosition[0] ? bgPosition[0].split(':')[1] : '0';
				var bgY = bgPosition[1] ? bgPosition[1].split(':')[1] : '0';

				if ( bgX.indexOf('%') > -1 ) {
					pxBgX = ( that.$element.width() / 100 ) * bgX.split('%')[0];
				} else {
					pxBgX = bgX.split('px')[0];
				}
				if ( bgY.indexOf('%') > -1 ) {
					pxBgY = ( that.$element.height() / 100 ) * bgY.split('%')[0];
				} else {
					pxBgY = bgY.split('px')[0];
				}
			}

			// console.log(pxBgX + ' ' + pxBgY);

			var el = {
				HTMLobj : t,
				order : i,
				pxBgWidth : pxBgWidth,
				pxBgHeight : pxBgHeight,
				pxBgX : pxBgX,
				pxBgY : pxBgY,
				src : t.data( 'src' ),
				xrange : t.data( 'x-range' ) || 20,
				yrange : t.data( 'y-range' ) || 20
			};
			that.layers.push( el );

			t.css({
				backgroundSize: pxBgWidth + el.xrange * 2,
				backgroundPosition: '0 0',
				backgroundRepeat: 'no-repeat',
				position: 'relative',
				marginTop: ( el.order === 0 ) ? 0 : - that.$element.height() 
			});

		});

		// attach loading gif
		this.$element.append($('<div class="fp-loading"></div>').css({
			marginTop: - this.$element.height() / 2 - 20
		}));

		this.preloadImages();

		$(document).mousemove(function(ev) {
			that.x_cursor = ev.pageX;
			that.y_cursor = ev.pageY;
		});

	};

	/**
	 * preload all images
	 * @return {[type]} [description]
	 */
	FullParallax.prototype.preloadImages = function() {

		var that = this;
		var imgObjects = [];

		for ( var i = 0; i < this.layers.length; i++ ) {

			var imgObj = new Image();
			imgObj.src = this.layers[i].src;
			imgObj.i = i;

			imgObj.onload = function() {

				that.layers[this.i].HTMLobj.css({
					backgroundImage: 'url(' + this.src + ')'
				});

				that.layers[this.i].HTMLobj.fadeIn();

				imgObjects.push(this);
				if( imgObjects.length === that.layers.length ) {

					$('.fp-loading').fadeOut();

					that.main_interval = setInterval(function() {
						that.update();
					}, that.update_rate);

				}
			};
		}
	};

	/**
	 * update scene
	 * @return {[type]} [description]
	 */
	FullParallax.prototype.update = function() {

		// distance from the center of the screen
        var x = (this.docDim.width / 2) - this.x_cursor;
        var y = (this.docDim.height / 2) - this.y_cursor;

		for ( var i = 0; i < this.layers.length; i++ ) {

			var l = this.layers[i];

			var stepx = (this.docDim.width / 2) / l.xrange;
            var stepy = (this.docDim.height / 2) / l.yrange;

            var movX = this.layers[i].pxBgX - l.xrange + (x / stepx);
            var movY = this.layers[i].pxBgY - l.yrange + (y / stepy);

            var bgPos = movX + 'px ' + movY + 'px';

            l.HTMLobj.css({
				backgroundPosition: bgPos
            });

		}

	};

	$.fn[plugin_name] = function( options ) {

		// wrapper to prevent multiple instantiations
		return this.each( function() {
			if( !$.data( this, 'plugin_' + plugin_name ) ) {
				$.data( this, 'plugin_' + plugin_name, new FullParallax( this, options ) );
			}
		});
	};


})( jQuery, undefined, window, document );