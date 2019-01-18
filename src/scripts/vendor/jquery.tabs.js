//tabs plugin

/*
__________________________________________________

Created by NovaVovikov

github: https://github.com/novavovikov/
e-mail: novavovikov@gmail.com
__________________________________________________

*/


(function($) {
	
		var defaults = {
			controls: '.tabs-controls',
			content: '.tabs-content',
			className: 'active',
			callbackClick: '',
			activeTab: 0
		};
	
		$.fn.tabs = function(options) {
	
			if (this.length == 0) return this;
	
			// support mutltiple elements
			if (this.length > 1) {
				this.each(function() { $(this).tabs(options) });
				return this;
			}
	
			var tabs = {};
	
			var el = this;
	
			var settings = $.extend({}, defaults, options);
	
			var methods = {
				init: function() {
					tabs.root = el;
	
					// elements
					tabs.controlsWrap = tabs.root.children(settings.controls);
					tabs.contentWrap = tabs.root.children(settings.content);
					tabs.content = tabs.contentWrap.children();
					tabs.links = tabs.controlsWrap.find('a'); 
					tabs.controls =  tabs.links.parent();
	
					//events
					tabs.controls.bind('click', methods.show);
	
					//
					tabs.links.each(function() {
						var src = $(this).attr('href');
	
						if (window.location.hash == src) {
							$(this).trigger('click');
						} else {
							tabs.controls.eq(settings.activeTab).trigger('click');
						}
					});
					
					return false;
				},
	
				show: function() {
					var src = $('a', this).attr('href');
	
					tabs.content.hide();
					$(src).show();
	
					tabs.controls.removeClass(settings.className);
					$(this).addClass(settings.className);
					//
					if (settings.callbackClick != '') {
						settings.callbackClick();
					}
					
					return false;
				}
	
			};
	
			methods.init();
	
		};
	
	})(jQuery);