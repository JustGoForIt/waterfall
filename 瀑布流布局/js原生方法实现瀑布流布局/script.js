window.onload = function(){
	waterfall('main','box');
	var dataInt ={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"}
	,{"src":"4.jpg"},{"src":"5.jpg"}]};
	window.onscroll = function(){
		if(checkScrollSlide()){
			var oParent = document.getElementById('main');
			//将数据块渲染到页面尾部
			for(var i =0;i<dataInt.data.length;i++){
				var oBox = document.createElement('div');
				oBox.className="box";
				oParent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = "images/" + dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');
		}
	}
}
//让图片显示在该显示的位置
function waterfall(parent,box){
	//将main下的所有class为box的元素取出来
	var oParent = document.getElementById(parent);
	var oBoxs = getByClass(oParent,box);
	var oBoxW = oBoxs[0].offsetWidth;//获取box的宽度
	//计算整个页面显示的列数（页面的宽度/box的宽度）
	var clientwidth = document.documentElement.clientWidth || document.body.clientWidth;
	var cols =Math.floor(clientwidth/oBoxW);
	//设置main的宽度
	oParent.style.cssText = "width:"+oBoxW*cols+'px;margin:0 auto';
	//存放每一列高度的数组
	var hArr = [];
	//遍历所有的数组
	for(var i = 0;i<oBoxs.length;i++){
		//遍历第一排
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			//第二行的第一张图片应该放在哪里
			//Math.min(12,74,58);//12
			var minH = Math.min.apply(null,hArr);
			var index = getMinhIndex(hArr,minH);
			oBoxs[i].style.position = "absolute";
			oBoxs[i].style.top = minH + "px";
			//第一种做法 oBoxs[i].style.left = oBoxW*index+"px";
			oBoxs[i].style.left = oBoxs[index].offsetLeft+'px';//第二种做法
			//加上图片后的高度数组
			hArr[index] += oBoxs[i].offsetHeight;
		}
	}
}
//根据class获取元素
function getByClass(parent,clsName){
	//用来存储获取到的所有class为box的数组
	var boxArr = [];
	//获取父元素下所有的子元素
	var oElements = parent.getElementsByTagName('*');
	for(var i = 0;i<oElements.length;i++){
		if(oElements[i].className == clsName){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}

//获取高度最小的图片的下标
function getMinhIndex(arr,val){
	for(var i in arr){
		if(arr[i] == val){
			 return i;
		}
	}
}

//检测是否具备了滚动加载数据块的条件
//当最后一张图片进入窗口一半的时候开始加载滚动条
function checkScrollSlide(){
	var oParent = document.getElementById('main');
	var oBoxs = getByClass(oParent,'box');
	var lastBoxH = oBoxs[oBoxs.length-1].offsetTop
	+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	//滚动条滚走的距离
	var scrolltop = document.body.scrollTop 
	|| document.documentElement.scrollTop;
	//窗口可视区域的距离
	var height =document.documentElement.clientHeight;
	var finallHeight = scrolltop + height;
	//根据返回值判断是否需要加载
	return (lastBoxH<finallHeight) ? true : false;
}