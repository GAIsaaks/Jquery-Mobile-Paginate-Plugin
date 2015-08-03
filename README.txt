Everything is set
just beware of the JQuery '$' if you have other noConflict instances created...

Rather wrap or include it - the instantiation code - in your app

# Init code
$( document ).bind( "pagecreate create", function( e ){
	$.mobile.grPaginate();
	
	var obj = $.mobile.grPaginate();
	var prev = obj.options.prev;
	
		$('.prev').on('click', function(prev) {
			//obj.refreshPage();
			obj.getPrevious(event, prev);
		});
		
		var next = obj.options.next;
		
		$('.next').on("click", function(next) {
			//obj.refreshPage();
			obj.getNext(event, next);
		});
});

Make sure not to forget the css classes if you chose not to include the file