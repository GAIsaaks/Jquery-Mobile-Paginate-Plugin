// JavaScript Document
/*
JQM Plugin
Geraldo Isaaks
2015
Pagination
*/
(function($) {
	
  $.widget( "mobile.grPaginate", $.mobile.widget, {
  // All widget code goes here.
  // These options will be used as defaults
		
	//the start init val
	
    options: { 
      start	: 0,
	  items	: 0,
	  next	: 0,
	  prev	: 0,
	  totalItems: 0
    },
 

    // Set up the widget
    _create: function()
	{
		var tstart = $('#next').val();
		if(tstart === 'undefined') {
			this.options.start = 0;	
		}
		
		if(this.options.start > 4) {
			this.options.prev = this.options.start - this.options.items;
			this.options.start += this.options.items;
		} else {
		
		this.options.next = 5;	
		this.options.prev = this.options.start;
		this.options.items = 4;
		}
		
		var pgiTxt = "<a href='' data-role='button' data-theme='b' class='prev ui-btn ui-icon-arrow-l ui-btn-icon-left' style='float:left;'>prev</a> &nbsp;	<a href='' data-role='button' data-theme='b' class='next ui-btn ui-icon-arrow-r ui-btn-icon-right' style='float:right;'>next</a>";
		$('.paginator').html(pgiTxt);
		
		this.doPaginate();
    },
 	
	doPaginate: function()
	{	
		var me = this;
		$.ajax({
				url: "imagesToLoad.html",
        		dataType: "html",
				type: "post",
				beforeSend: function(data) 
				{
					$('#loadImages').html('<img src="jqm/images/ajax-loader.png" height="80px" width="80px" />').fadeIn('slow');
				},
				success: function(data)
				{
					$('#loadImages').html(data).fadeIn('slow');
					me.PageIt()						
				}
			});
	},
	PageIt: function()
	{
		this.options.totalItems = $('#contents ul li').length;
		
		$('#contents ul li').each(function(index, element) {
            if($( element ).hasClass( "show" ))
				$( element ).removeClass('show');
        });
		var n = 0;
		var i = this.options.items;
		var s = this.options.start;
		
		$('.theData').slice(s).each(function(c, element) {
			//if(
			while(c < i) {
            	$( element ).removeClass('hide').addClass('show');
				c++;
			}
        });
	},
	//Force Page to refresh
	refreshPage: function()
	{
		jQuery.mobile.changePage(window.location.href, {
			allowSamePageTransition: true,
			transition: 'none',
			reloadPage: true
		});
	},

    // Use the _setOption method to respond to changes to options
    _setOption: function( key, value )
	{
    	switch( key ) {
		case "start":
          	key = this._constrain( value );
        break;
      	
		case "items":
          	key = this._constrain( value );
        break;
      	
		case "next":
          	key = this._constrain( value );
        break;
      	
		case "prev":
          	key = this._constrain( value );
        break;
      	
		
        case "clear":
          // handle changes to clear option
        break;
      	}
      // In jQuery UI 1.8, you have to manually invoke the _setOption method from the base widget
      $.Widget.prototype._setOption.apply( this, arguments );
      // In jQuery UI 1.9 and above, you use the _super method instead
      this._super( "_setOption", key, value );
    },
 	
	getPrevious: function(e,prev)
	{
		if(this.options.start > 0) {
			this.options.prev  = this.options.start - 5;
			this.options.start -= 5;
		//alert('start: '+this.options.start +' prev: '+ this.options.prev);
		} else {
			this.options.prev = 0;
		}
		this.doPaginate();
		e.preventDefault();
	},
	
	getNext: function(e, next)
	{
		var end = this.options.totalItems - 4;
		if(this.options.start <= end)
		{
			this.options.next = this.options.start + 5;
			this.options.start += 5;
			this.doPaginate();
		}
		e.preventDefault();
		
	},
	
    // Use the destroy method to clean up any modifications your widget has made to the DOM
    destroy: function()
	{
      // In jQuery UI 1.8, you must invoke the destroy method from the base widget
      $.Widget.prototype.destroy.call( this );
      // In jQuery UI 1.9 and above, you would define _destroy instead of destroy and not call the base method
    }
  });
  
})( jQuery );