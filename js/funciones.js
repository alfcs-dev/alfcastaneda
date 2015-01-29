$( document ).ready(function (){

    $(this).scrollTop(0);

	$(function() {
		$('a[href*=#]:not([href=#])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({ scrollTop: target.offset().top}, 1000);
					return false;
				}
			}
		});
	});
	
	$(window).scroll(function(){
		var scroll = $(window).scrollTop();
		if(scroll >= 430){
			$(".menu").fadeIn(800);
			$('#presentacion').css('display', 'none');
		}else{
			$(".menu").fadeOut(300);
			$('#presentacion').show();
		}
		
	});
	
	$(".front").click(function(){
		$(".programming .skills").css('transform', 'rotateY(180deg)');
		console.log('Clic');
	});	
	$(".back").click(function(){
		$(".programming .skills").css('transform', 'rotateY(0deg)');
		console.log('Clic');
	});

});