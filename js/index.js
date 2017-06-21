$(function(){
	//先获取json中(网络接口)的数据
	//动态页面基于动态数据
	$.get("json/banner.json", function(data){
		//console.log("data: " + data.length); 
		
		//遍历数组, 动态添加li
		for (var i=0; i<data.length; i++) {
			var obj = data[i];
			
			//动态添加节点
			$("<li><img src=" + obj.img + " /></li>").appendTo(".banner-out .list1");
			$("<li></li>").appendTo(".banner-out .list2");
			
			//如果是list2中的第一个li, 则添加一个class=active
			if (i == 0) {
				$(".banner-out .list2 li").first().addClass("active");
			}
		}
		
		//轮播
		lunbo();
	})
	
	
	//轮播
	var timer=null;
	function lunbo(){	
				var _ul1 = $(".banner-out .list1");
				var _ul2 = $(".banner-out .list2");
				var _li1 = $(".banner-out .list1 li");
				var _li2 = $(".banner-out .list2 li");
				
				//初始化显示第一张图
				_li1.eq(0).show().siblings().hide();
				
				//图片总数量
				var size = $(".banner-out .list1 li").size(); //4
				
				//自动轮播
				var i = 0; //记录图片下标
				timer = setInterval(function(){
					i++;
					move(); 
				}, 2000);
				
				//移动的函数
				function move(){
					//如果i超出了图片总数量
					if (i == size) {
						i = 0; //即将移动到2张图
					}					
					//透明度切换到第i张图
					_li1.eq(i).stop().fadeIn().siblings().stop().fadeOut();					
					//改变ul2的按钮状态
					_li2.eq(i).removeClass().addClass("active").siblings().removeClass("active"); 
					
				}
								
				
				//li2上面的按钮
				_li2.hover(function(){
					var index = $(this).index();
					//console.log(index);
					i = index;
					move();
				})
				
				//移入box, 移出box
				$(".banner").hover(function(){
					//移入, 关闭定时器
					clearInterval(timer);
				},function(){
					//移出, 重新开启定时器
					clearInterval(timer);
					timer = setInterval(function(){
						i++;
						move();
					}, 2000);
				});
				$(".banner .prev").click(function(){
					clearInterval(timer);
					i--;
					if(i<0){
						i =3;
					}
					move();
				})
				$(".banner .next").click(function(){
					clearInterval(timer);
					i++;
					if(i==size){
						i =0;
					}
					move();
				})
	
	}
	
	//轮播右侧3小图
	$.get("json/goods.json",function(data){
		for (var i=0; i<3; i++) {			
			$("<li><a href='#'><img src=" + data[i].img + " /><span>" + data[i].id + "</span></a></li>").appendTo(".banner .list3");									
		}
		$(".banner .list3 li").hover(
			function(){
				$(this).stop().animate({left:"-5"});
			},
			function(){
				$(this).stop().animate({left:0});
		});
		
	})
	
	//限时推荐右侧小图放大
	$(".comic-choose img").hover(
		function(){
			$(this).stop().animate({top:-10,left:-10,width: 270,height: 220})
		},
		function(){
			$(this).stop().animate({top:0,left:0,width: 250,height: 200})
		}
	);
	
	
	//楼层F1
	$.get("json/goods.json",function(data){
		for(var i=3;i<11;i++){
			var li = $("<li><a><img src=" + data[i].img +"></a></li>");
			var p1 = $("<p class='product-title'>"+data[i].text+"</p>").appendTo(li.find("a"));
			var p2 = $("<p class='price'><span><span>¥</span><span>"+data[i].pay+"</span></p>").appendTo(li.find("a"))
			$(".f1 .bd-r").append(li);
		}
	});
	//楼层F2
	$.get("json/goods.json",function(data){
		for(var i=11;i<19;i++){
			var li = $("<li><a><img src=" + data[i].img +"></a></li>");
			var p1 = $("<p class='product-title'>"+data[i].text+"</p>").appendTo(li.find("a"));
			var p2 = $("<p class='price'><span><span>¥</span><span>"+data[i].pay+"</span></p>").appendTo(li.find("a"))
			$(".f2 .bd-r").append(li);
		}
	});
	//楼层F3
	$.get("json/goods.json",function(data){
		for(var i=19;i<27;i++){
			var li = $("<li><a><img src=" + data[i].img +"></a></li>");
			var p1 = $("<p class='product-title'>"+data[i].text+"</p>").appendTo(li.find("a"));
			var p2 = $("<p class='price'><span><span>¥</span><span>"+data[i].pay+"</span></p>").appendTo(li.find("a"))
			$(".f3 .bd-r").append(li);
		}
	});
	//楼层F4
	$.get("json/goods.json",function(data){
		for(var i=27;i<35;i++){
			var li = $("<li><a><img src=" + data[i].img +"></a></li>");
			var p1 = $("<p class='product-title'>"+data[i].text+"</p>").appendTo(li.find("a"));
			var p2 = $("<p class='price'><span><span>¥</span><span>"+data[i].pay+"</span></p>").appendTo(li.find("a"))
			$(".f4 .bd-r").append(li);
		}
	});
	//楼层F5
	$.get("json/goods.json",function(data){
		for(var i=35;i<43;i++){
			var li = $("<li><a><img src=" + data[i].img +"></a></li>");
			var p1 = $("<p class='product-title'>"+data[i].text+"</p>").appendTo(li.find("a"));
			var p2 = $("<p class='price'><span><span>¥</span><span>"+data[i].pay+"</span></p>").appendTo(li.find("a"))
			$(".f5 .bd-r").append(li);
		}
	});
	
	//楼梯
	//是否点击了按钮正在动画移动
	var isMoving = false; 
	
	//楼层按钮添加点击事件
	$(".loutiNav li").click(function(){
		
		//改变按钮的选中状态
		$(this).find("span").addClass("active")
		.parent().siblings().find("span").removeClass("active");
		
		//让页面移动到对应的楼层
		var index = $(this).index();
		var _top = $(".floor").eq(index).offset().top;
		//动画移动页面到对应的楼层
		isMoving = true; //即将动画移动
		$("html,body").stop().animate({scrollTop: _top}, 500, function(){
			isMoving = false; //动画移动结束
		});
		
	})
	
	//滚动页面时, 让按钮的选中状态跟着改变
	$(window).scroll(function(){
		var _scrollTop = $(window).scrollTop();
			if(_scrollTop>=$(".floor").eq(0).offset().top){

				$(".loutiNav").show();
			}else{

				$(".loutiNav").hide();
			}
		//当isMoving=false时, 当动画结束后才能判断成功
		if (!isMoving) {			
			var index = 0;
			
			$(".floor").each(function(){
				//每个floor的top值
				var _top = $(this).offset().top;
				if (_scrollTop >= _top) {
					index = $(this).index() - 2;
				}
			})
			
			//使用index改变按钮的选中状态
			$(".loutiNav li").eq(index).find("span").addClass("active")
			.parent().siblings().find("span").removeClass("active");
			
		}
	})
	
	
	//点击商品传递ID跳转
	$(".bd .bd-r").on("click","li a",function(){
		//获取当前商品IMG的id
		var id = $(this).find("img").attr("src").slice(4,7);
		console.log(id);
		location.href = "product.html?" + id;
	})
	
})
