$(function(){
	//导航栏下拉界面
	$(".categorys").hover(
		function(){
			$(".categorys .dropdown-menu").stop().slideDown();
		},
		function(){
			$(".categorys .dropdown-menu").stop().slideUp();
		}
	);

	//滑过小图切换大图
	$(".pro-thumb img").mouseenter(function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(".pro-bigimage img").attr("src",$(this).attr("src"));
		$(".bigArea img").attr("src",$(this).attr("src"));
	})


	//放大镜
	var _smallImg = $(".smallImg"); //小图
	var _smallArea = $(".smallArea"); //小区域
	var _bigImg = $(".bigImg"); //大图
	var _bigArea = $(".bigArea"); //大区域


	//放大系数
	var scale = _bigImg.width()/_smallImg.width();
	//鼠标移动

	$(".pro-bigimage").mouseover(function(){
		_smallArea.show(); //显示小区域
		_bigArea.stop().animate({'width':430,'height':470,'left':500,'opacity':1},function(){
			_smallArea.width( _smallImg.width()/_bigImg.width() * _bigArea.width() );
			_smallArea.height( _smallImg.height()/_bigImg.height() * _bigArea.height() );
		});

	});
	$(".pro-bigimage").mousemove(function(e){


		//计算得到小区域应该移动到的位置
		var x = e.pageX - _smallImg.offset().left - _smallArea.width()/2;
		var y = e.pageY - _smallImg.offset().top - _smallArea.height()/2;

		if (x <= 0) { //控制不超出左边界
			x = 0;
		}
		else if (x >= _smallImg.width()-_smallArea.width()){ //控制不超出右边界
			x = _smallImg.width()-_smallArea.width();
		}
		if (y <= 0 ) { //控制不超出上边界
			y = 0;
		}
		else if (y >= _smallImg.height()-_smallArea.height()) { //控制不超出下边界
			y = _smallImg.height()-_smallArea.height();
		}

		//让小区域移动
		_smallArea.css({left:x, top:y});

		//让大图移动
		_bigImg.css({left:-scale*x, top:-scale*y});
	})
	//移出小图

	$(".pro-bigimage").mouseout(function(){
		_smallArea.hide(); //隐藏小区域
		_bigArea.stop().animate({'width':0,'height':0,'left':0,'opacity':0});
	})


	//吸顶效果
	$(window).scroll(function(){
		var _scrollTop = $(window).scrollTop();
		var _top = $(".hot-goods h4").offset().top;
		if(_scrollTop>=_top){

				$(".f1 .hd").css({"position":"fixed","top":0})
			}else {

				$(".f1 .hd").css({"position":"static"});
			}
	})

	//
	//先获取商品id
	var myId = location.search.slice(1);
	//console.log(myId); //商品id

	//遍历goods.json, 获取当前商品的信息
	$.get("json/goods.json", function(data){

		for (var i=0; i<data.length; i++) {
			//找到对应的商品
			if (myId == data[i].id) {
				var obj = data[i];
				//此时的obj就是当前商品的信息
				//开始使用当前商品信息
				$(".breadcrumbs .type1").html(obj.type);
				$(".breadcrumbs .type2").html(obj.type1);
				$(".breadcrumbs .text-primary").html(obj.name);
				$(".pro-bigimage .smallImg").attr("src",obj.img1);
				$(".pro-thumb img").eq(0).attr("src",obj.img1);
				$(".pro-thumb img").eq(1).attr("src",obj.img2);
				$(".pro-thumb img").eq(2).attr("src",obj.img3);
				$(".pro-thumb img").eq(3).attr("src",obj.img4);
				$(".bigArea .bigImg").attr("src",obj.img1);
				$(".title .product-title").html(obj.title);
				$(".price .price-original").html(obj.oldpay);
				$(".price-sell").html(obj.pay);
				$(".attribute .span1").html(obj.span1);
				$(".attribute .span2").html(obj.span2);
				$(".attribute .span3").html(obj.span3);
				$(".attribute .span4").html(obj.span4);

			}
		}
	})


	//点击飞入
	//取消a默认事件
	$(".Btn_AddToCart").click(function(e){
		e.preventDefault();
	});

	//点击加入购物车
	$(".Btn_AddToCart").click(function(e){
		addToCart();//调用购物车函数
		fly(e);//调用商品飞入函数
	});

	//购物保障鼠标滑过事件

	$(".tab-indicators li").mouseover(function(){
		var index = $(this).index();
		$(this).find("span").css("background-position-y","-60px").parent().parent().siblings().find("span").css("background-position-y",0);
		$(".tab-content .tab-pane").eq(index).stop().fadeIn().siblings().stop().fadeOut();
	})

	//吸顶点击事件
	$(".goods .hd-l li").click(function(){
		var index = $(this).index();
		var top = $(".goods").eq(index).offset().top;
		$("html,body").stop().animate({scrollTop: top})
	});
	$(".goods .hd-l li a").click(function(e){
		e.preventDefault();
	});
	//页面滚动
	$(window).scroll(function(){
		var _scrollTop = $(window).scrollTop();


			var index = 0;

			$(".goods").each(function(){
				//每个floor的top值
				var _top = $(this).offset().top;
				if (_scrollTop >= _top) {
					index = $(this).index(".goods") ;
				}
			})

			//使用index改变按钮的选中状态
			$(".f1 .hd-l li").eq(index).addClass("active").siblings().removeClass("active");


	})
})