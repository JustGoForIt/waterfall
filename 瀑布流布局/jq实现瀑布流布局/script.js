$(window).on('load',function(){
	waterfall();
	var dateInt ={"data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'}]};
	$(window).on('scroll',function(){
		if(checkScrollSlide()){
			$.each(dateInt.data,function(key,value){
				var oBox = $('<div>').addClass('box').appendTo($("#main"));
				var oPic = $('<div>').addClass('pic').appendTo($(oBox));
				//此处的value是js原生对象
				$('<img>').attr('src','images/'+$(value)
					.attr('src')).appendTo($(oPic));
			})
			waterfall();
		}
	})
})

function waterfall(){
	var $boxs = $('#main>div');
	var w = $boxs.eq(0).outerWidth();//width值获取定义的宽度
	var cols = Math.floor($(window).width()/w);
	$('#main').width(w*cols).css('margin',"0 auto");
	var hArr = [];
	$boxs.each(function(index,value){
		var h = $boxs.eq(index).outerHeight();
		if(index<cols){
			hArr[index]=h;
		}else{
			var minH = Math.min.apply(null,hArr);
			var minHIndex = $.inArray(minH,hArr);
			//value是DOM元素
			$(value).css({
				"position":"absolute",
				'top':minH +'px',
				'left':minHIndex*w+'px'

			});
			hArr[minHIndex] += $boxs.eq(index).outerHeight();
		}
	});
}
function checkScrollSlide(){
	//取得最后一个元素
	var $lastBox = $('#main>.box').last();
	var lastBoxDis = $lastBox.get(0).offsetTop + Math.floor($lastBox.height()/2);
	// var lastBoxDis = $lastBox.offset().top+Math.floor($lastBox.height()/2);
	var scrollTop = $(window).scrollTop();
	var documentH= $(window).height();
	return(lastBoxDis<scrollTop+documentH)?true:false;
}