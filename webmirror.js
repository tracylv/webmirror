

/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
* Licensed under the MIT License (LICENSE.txt).
*
* Version: 3.1.12
*
* Requires: jQuery 1.2.2+
*/
/* jquery mousewheel plugin */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});

/* jquery.cookie.js */
jQuery.cookie=function(name,value,options){if(typeof value!='undefined'){options=options||{};if(value===null){value='';options.expires=-1;}
var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000));}else{date=options.expires;}
expires='; expires='+date.toUTCString();}
var path=options.path?'; path='+(options.path):'';var domain=options.domain?'; domain='+(options.domain):'';var secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('');}else{var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}
return cookieValue;}};



/* --------------------------------------- for design layer --------------------------------------- */

// default parameters
var webmirror_defaults = 
{
	// design default layer opacity
	opacity: 0.5,
	
	// design layer width
	width: "100%",
	
	// -1 or <=0 means keep the same height as body; while if height > 0, use the specified value
	height: -1,
	
	// design layer offset
	offset: { top: 0, left: 0},
	
	//design screenshot path
	imgpath : "design.jpg"
};

// this is used to override the above default options.
$.webmirror_options = {};

// for design layer
$(function(){

    // get the settings
	var settings = $.extend(true, {}, webmirror_defaults, $.webmirror_options||{});
	
	// initial the design layer
	var dom = "<div style='position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: url(dev_design.jpg) no-repeat scroll center top transparent; opacity: 0.5;z-index: 10000'></div>";	
	var $dom = $(dom);
	var offset = getOffset();
	var opacity = getOpacity();
	settings.height <= 0 ? $dom.height($(document).height()) : $dom.height(settings.height);	
	$dom.width(settings.width);	
	$dom.css("opacity", opacity);
	$dom.css("filter","alpha(opacity=" + opacity*100 +")").css("-ms-filter","progid:DXImageTransform.Microsoft.Alpha(Opacity="+ opacity*100 + ")");
	$dom.css({"position": "absolute", "top": offset.top + "px", "left": offset.left + "px", "background-image" : "url(" + settings.imgpath + ")"});
	
	// double click close the design layer
	$dom.dblclick(function(e){ $(this).hide(); e.stopPropagation();});
	
	// double click in the page open the design layer
	$(document).dblclick(function(){ 
	    var currentOpa = getOpacity();
		if(currentOpa == 0)
		{
			alert("The opacity is 0, please press 'Alt' + [mouse wheel scroll down] to enable it!");
		}
		else
		{
			$dom.css("opacity", currentOpa);
			$dom.css("filter","alpha(opacity=" + currentOpa*100 +")").css("-ms-filter","progid:DXImageTransform.Microsoft.Alpha(Opacity="+ currentOpa*100 + ")");
			$dom.show();
		}
	});
	
	// press "Alt + mousewheel scrolldown" to update the design layer opacity property
	// press "Alt + [up/down/left/right]" key to adjust the design layer position
	var pressAlt = false;
	$(document).keydown(function(e){
	    // "Alt" key
		if(e.keyCode == 18)
		{
			pressAlt = true;
		}
		
		// use "Alt + [up/down/left/right]" key to adjust the design layer position
		if(pressAlt)
		{
		    var left = parseInt($dom.css("left"));
			var top = parseInt($dom.css("top"))
			
			// "Left" key
			if(e.keyCode == 37){ left--; }
			
			// "Up" key
			if(e.keyCode == 38){ top--; }
			
			// "Right" key
			if(e.keyCode == 39){ left++; }
			
			// "Down" key
			if(e.keyCode == 40){ top++; }
			
			$dom.css({"top": top + "px", "left": left + "px"});
			$.cookie("tl_ofstop", top,  {expires: 7, path: '/'});
			$.cookie("tl_ofsleft", left,  {expires: 7, path: '/'});	
			
			e.preventDefault();
		}
		
	});

	$(document).keyup(function(e){
	    // "Alt" key
		if(e.keyCode == 18)
		{
			pressAlt = false;
		}
	});
	
	// when press "Alt" and mousewheel scroll up, opacity - 0.1 ; while press "Alt" and mousewheel scroll down, opacity + 0.1
	$(document).mousewheel(function(event, delta) {  
		
		if(pressAlt)
		{
			var opacity = parseFloat($dom.css("opacity"));
			
		    // when mouse scroll up, opacity - 0.1 ; while when mouse scroll down, opacity + 0.1			
			opacity += delta > 0 ? -0.1 : 0.1;

			opacity <= 0 ? $dom.hide() : $dom.show();
			
			// make sure opacity value is between 0~1
			opacity = opacity < 0 ? 0 : opacity;
			opacity = opacity > 1 ? 1 : opacity;

			$dom.css("opacity", opacity);
			$.cookie("tl_opa", opacity,  {expires: 7, path: '/'});
			
			event.preventDefault();
		}
	});  
	
	// add design layer into the page
	$("body").append($dom);

	
	// first read from cookie, if cookie is null, use default value
	function getOpacity()
	{
	    var opavalue = settings.opacity;
		
		// check if cookie has the opacity value, if cookie is null, use default value
		var cookieOpa = $.cookie("tl_opa");	
		if(cookieOpa && cookieOpa.length > 0)
		{
			cookieOpa = parseFloat(cookieOpa);
			if(cookieOpa >= 0 && cookieOpa <= 1)
			{
				opavalue = cookieOpa;
			}
		}
		
		return opavalue;
	}
	
	
	// first read from cookie, if cookie is null, use default value
	function getOffset()
	{
	    var offset = settings.offset;
		
		// check if cookie has value, if cookie is null, use default value
		var cookietop = $.cookie("tl_ofstop");	
		if(cookietop && cookietop.length > 0)
		{
			offset.top = parseInt(cookietop);
		}
		
		var cookieleft = $.cookie("tl_ofsleft");	
		if(cookieleft && cookieleft.length > 0)
		{
			offset.left = parseInt(cookieleft);
		}
		
		return offset;
	}
});