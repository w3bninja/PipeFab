// Developer: Aaron Landry
// Firm: RedSixMedia.com


$.fn.makeItFit = function() {
	$(this).each(function() {
		var set = $(this);
		set.fitVids();		
	});
};

$.fn.accordionSlider = function(item,nextLink,prevLink){
	// ACCORDION
	var $slider = $(this);
	var $prev = $(prevLink);
	var $next = $(nextLink);
	var $slide = $slider.find(item);
	var currentSlide = 0;
	var allSlides = $slider.find(item).length - 1; // index start from 0

	$slider.find(item).eq(0).show();
	
	
	
	// NEXT
	function nextSlide(e) {
		e.preventDefault();
	  if(currentSlide <= allSlides) {
		$(item).removeClass('hover');
		$slide.eq(currentSlide).removeClass('hover'); 
		if(currentSlide == allSlides){
			$slide.eq(currentSlide - allSlides).addClass('hover');
			currentSlide -= allSlides;
		} else {
			$slide.eq(currentSlide + 1).addClass('hover');
			currentSlide += 1;
		}
	  }
	}
	
	// PREV
	function prevSlide(e) {
		e.preventDefault();
	  if(currentSlide >= 0) {
		$(item).removeClass('hover');
		$slide.eq(currentSlide).removeClass('hover');
		if(currentSlide == 0){
			$slide.eq(currentSlide + allSlides).addClass('hover');
			currentSlide += allSlides;
		} else {
			$slide.eq(currentSlide - 1).addClass('hover');
			currentSlide -= 1;
		}
	  }
	}
	
	// CLICK EVENT
	$(item).click(function(e){
		e.preventDefault();
		$(item).removeClass('hover');
		$(this).addClass('hover');
		currentSlide = $(this).index();
		
		$('.video1').get(0).pause(); 
		$('.video1').get(0).currentTime = 0;
		$('.video1').get(0).load();
	});
	
	

	$next.on('click', nextSlide);
	$prev.on('click', prevSlide);
	
	// HOVER EVENT
	//$(item + ', ' + nextLink + ', ' + prevLink ).hover(function() {
//	  interval = clearInterval(interval);
//	}, function() {
//	  interval = setInterval(nextSlide, 10000);
//	});
	
	
};
function carouselResize(number){ 
	var slider = $('.timeline .cycle-slideshow'); 
	slider.attr('data-cycle-carousel-visible',number); 
	slider.cycle('destroy'); 
	slider.cycle({
		carouselVisible : number
	});      
}
	



$(function () {	
	
	if(jQuery.browser.mobile == true){
		
	}else{
		var sources = document.querySelectorAll('video.video-header source, video.video1 source');
		// Define the video object this source is contained inside
		var video = document.querySelector('video.video-header, video.video1');
		for(var i = 0; i<sources.length;i++) {
		  sources[i].setAttribute('src', sources[i].getAttribute('data-src'));
		}
		// If for some reason we do want to load the video after, for desktop as opposed to mobile (I'd imagine), use videojs API to load
		video.load();
	}
	
	$(".loader").css({'opacity':'1'});
	//Hide the site until it is ready and then fade it in
	// Add class for external links
	$('a').filter(function() {
	   return this.hostname && this.hostname !== location.hostname;
	}).addClass("external");

	// Hide the site until it is ready and then fade it in
	$(".bg").css({'opacity':'0'});
	

	// When a link is clicked it will fade and redirect unless it is external
	$('a:not([href*="#"])').addClass('link');
	$('.fancy, .mobile-navigation a, .nav-mobile a').removeClass('link');
	$('.link').click(function(e){
	  var redirect = $(this).attr('href');
	  e.preventDefault();
	  $('.bg').animate({'opacity': '0'}, 500, function(){
		document.location.href = redirect;
	  });
	});
	
	$('.flex-container').accordionSlider('.flex-slide','.next-flex','.prev-flex');
	
	$('.section').height($(window).height());
	
	
	
	
	
	setTimeout(function(){
		$(".inset").addClass("inset-none");
	}, 1000);
	
	
	if ($('.video-container').length > 0) {
		$('.video-container').makeItFit();

	}
	
	$('.slide2').click(function(){
		$('.video1').get(0).play();
	});

	//Navigation helper
    $(".navigation-inner ul li").hover(function(){
        $(this).addClass("hover");
        $('ul:first',this).css('visibility', 'visible');
    }, function(){
        $(this).removeClass("hover");
        $('ul:first',this).css('visibility', 'hidden');
    });
	
	// Sticky Element - Sticks the element to the top of the site
	$(".sticky").wrap("<div class='sticky-container'></div>");
	$(".sticky").wrap("<div class='sticky-container-inner'></div>");
	$(window).on('scroll', function () {
		if($('.sticky-container').length > 0){
			var scrollTop = $(window).scrollTop();
			var elementOffset = $('.sticky-container').offset().top;
			var distance	= (elementOffset - scrollTop);
			$(".sticky-container").height($(".sticky-container-inner").height());
			if(distance < 0){
				$('.sticky-container-inner').addClass('container-fixed');
			} else {
				$('.sticky-container-inner').removeClass('container-fixed');
			}
		}
	});
	
	// SMOOTH SCROLL
	if ($('.scroll').length > 0) {
		$(".scroll").on("click", function(event){
			 event.preventDefault();
			 //calculate destination place
			 var dest=0;
			 var destOffset = 0;
			 if($(this.hash).offset().top > $(document).height()-$(window).height()){
				  dest=$(document).height()-$(window).height();
			 }else{
				  dest=$(this.hash).offset().top;
			 }
			 //go to destination
			setTimeout(function(){
						 $('html,body').animate({scrollTop:dest-destOffset}, 1000,'swing');
			}, 0);
			
		 });
	 }
	
	
	// LAYOUT
	
	//Push Navigation Menu
	$('.toggle-menu').jPushMenu({
		closeOnClickLink   : true,
		closeOnClickOutside: true
	});
	
	$(".fancy").fancybox({
		fitToView	: true,
		autoSize	: true,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		padding		: 0,
		margin		: 0,
		helpers: {
			overlay: {
			  locked: false
			}
	  	},
		tpl: {
			wrap     : '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
			image    : '<img class="fancybox-image" src="{href}" alt="" />',
			error    : '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
			closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
			next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
			prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
		}
		
	});
	
	

});
$(window).resize(function() {
	$('.section').height($(window).height());
	if ($(window).width() <= 800){	
		carouselResize(1);
	}else{
		carouselResize(3);
	}
});

$(window).bind("load", function() {
	
	setTimeout(function(){
		$(".bg").animate({'opacity': '1'}, 1000);
		$('.loader').animate({'opacity': '0'}, 1000, function(){
			$(this).css({'display': 'none'});
		});
		if ($(window).width() <= 800){	
			carouselResize(1);
		}else{
			carouselResize(3);
		}
		
	}, 0);
	$('.fancybox-nav').wrapAll('<div class="control"/>');
	
	
	
	if ($(window).width() >= 992){	
	
	
	// init controller
	var controller = new ScrollMagic.Controller({
		globalSceneOptions: {
			triggerHook: 'onLeave'
			//,addIndicators: true
		}
	});
	
	var defaultDuration = '500';
	
	var tween1 = new TimelineMax()
	.add(TweenMax.set([".map-usa"], {top: 300}))
	.add(TweenMax.to([".map-usa"], 0.2, {top: 250}))
	.add(TweenMax.to([".map-usa"], 0.2, {top: 200}))
	.add(TweenMax.to([".map-usa"], 0.2, {top: 150}))
	.add(TweenMax.to([".map-usa"], 0.2, {top: 100}))
	.add(TweenMax.to([".map-usa"], 0.2, {top: 50}))
	.add(TweenMax.to([".map-usa"], 0.2, {top: -300}))

	new ScrollMagic.Scene({triggerElement: '.section0', duration: 400})
		.setPin(".section0")
		.addTo(controller)
		.on("enter", function (e) {
			$('.video-header').get(0).play();
		})
		.on("leave", function (e) {
			
		});
	new ScrollMagic.Scene({triggerElement: '.section1', duration: defaultDuration})
		.setPin(".section1")
		.addTo(controller)
		.on("enter", function (e) {
			
		})
		.on("leave", function (e) {
			
		});
	new ScrollMagic.Scene({triggerElement: '.section2', duration: defaultDuration})
		.setPin(".section2")
		.addTo(controller)
		.on("enter", function (e) {
			$('.video1').get(0).play();
		})
		.on("leave", function (e) {
			$('.video1').get(0).pause(); 
			$('.video1').get(0).currentTime = 0;
			$('.video1').get(0).load();
		});
	new ScrollMagic.Scene({triggerElement: '.section3', duration: defaultDuration})
		.setTween(tween1)
		.setPin(".section3")
		.addTo(controller)
		.on("enter", function (e) {
			
		})
		.on("leave", function (e) {
		
		});
	new ScrollMagic.Scene({triggerElement: '.section4', duration: defaultDuration})
		.setPin(".section4")
		.addTo(controller)
		.on("enter", function (e) {
		
		})
		.on("leave", function (e) {
		
		});

	
	}
	
	
	
	
});

 window.alert = function(msg) {
	var msg = msg.replace('ERROR: ','');
	$('body').append('<div class="msg text-center"></div>');
	$('.msg').text(msg);
	$('.msg').fadeIn().delay(5000).fadeOut();
	$('.msg').prepend('<i class="fa fa-warning"></i>');
 };

$(document).ready(function() {
	$('.cycle-slide-active').next().addClass('active');
	$('.active').next().addClass('next-active');
	$('.cycle-slideshow').on('cycle-after', function() {
		$('.item').removeClass('active');
		$('.item').removeClass('next-active');
		$('.cycle-slide-active').next().addClass('active');
		$('.active').next().addClass('next-active');
	});
	$('.cycle-slideshow').on('cycle-before', function() {
		$('.item').removeClass('active');
		$('.item').removeClass('next-active');
		$('.cycle-slide-active').next().addClass('active');
		$('.active').next().addClass('next-active');
	});
	
	
	
	if ($('.nav-accordion').length > 0) {
		$(".nav-accordion li:has(ul li)").find("a:first").addClass("subs");
		$( "<i class='fa fa-angle-down'></i>" ).appendTo( ".nav-accordion .subs" );
		$('.nav-accordion .subs i').on("click",function(e){
			e.preventDefault();
			$(this).parent().parent().find('ul:first').toggle();
		});
	}
	
    $("img").error(function(){
        $(this).remove();
    });
	
	
	
	var offset = 220;
    var duration = 500;
    jQuery(window).on("scroll",function() {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.sticky-bottom-menu').fadeIn(duration);
        } else {
            jQuery('.sticky-bottom-menu').fadeOut(duration);
        }
    });
    
    jQuery('.back-to-top').on("click",function(event) {
        event.preventDefault();
        jQuery('html, body').animate({scrollTop: 0}, duration);
        return false;
    });
});

