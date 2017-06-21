$(function(){
	var myCart = $.cookie("cart") ? JSON.parse($.cookie("cart")) : null;
	if(myCart == null || myCart.length==0){//购物车无商品时
		$(".container .spare").show();
		$(".container .cart").hide();
		
	}else{//购物车有商品时
		$(".container .spare").hide();
		$(".container .cart").show();
		showMyCart();
	}
	//点击减少
	$(".cart-panel .bd").on("click",".num .first",function(){
		//获取当前商品id
		var thisId = $(this).parent().parent().find(".product").find("img").attr("src").slice(4,7);
		
		var myCart = JSON.parse($.cookie("cart"));
		for(var i=0;i<myCart.length;i++){
			if(myCart[i].id == thisId){
				if(myCart[i].num>1){
					myCart[i].num--;					
					$.cookie("cart", JSON.stringify(myCart), {expires:30, path:"/"});
					userGoods(myCart);
					topshow();
					$(this).parent().find("input").val(myCart[i].num);
					sell();
				}				
			}
		}		
	})
	//点击增加
	$(".cart-panel .bd").on("click",".num .last",function(){
		//获取当前商品id
		var thisId = $(this).parent().parent().find(".product").find("img").attr("src").slice(4,7);
		
		var myCart = JSON.parse($.cookie("cart"));
		for(var i=0;i<myCart.length;i++){
			if(myCart[i].id == thisId){
				
					myCart[i].num++;					
					$.cookie("cart", JSON.stringify(myCart), {expires:30, path:"/"});
					userGoods(myCart);
					topshow();
					$(this).parent().find("input").val(myCart[i].num);
					sell();			
			}
		}		
	})
	
	//点击删除
	$(".cart-panel .bd").on("click",".operate .remove",function(){
		//获取当前商品id
		var thisId = $(this).parent().parent().find(".product").find("img").attr("src").slice(4,7);
		
		var myCart = JSON.parse($.cookie("cart"));
		for(var i=0;i<myCart.length;i++){
			if(myCart[i].id == thisId){				
					myCart.splice(i,1);//删除当前商品			
					$.cookie("cart", JSON.stringify(myCart), {expires:30, path:"/"});
					cartNum();
					userGoods(myCart);
					topshow();
					if(myCart.length==0){
						location.reload();
						return;
					};
					//a>li>ul>div
					$(this).parent().parent().remove();
					sell();								
			}
		}		
	})
	
	//输入数字事件
	$(".cart-panel .bd").on("blur",".num .goods-num",function(){
		//获取当前商品id
		var thisId = $(this).parent().parent().find(".product").find("img").attr("src").slice(4,7);
		var num = $(this).val();
		var myCart = JSON.parse($.cookie("cart"));
		for(var i=0;i<myCart.length;i++){
			if(myCart[i].id == thisId){				
					
					if(num <=0){
						myCart.splice(i,1);//删除当前商品	
						$(this).parent().parent().remove();
						
					}else{
						myCart[i].num = num;
					}
					$.cookie("cart", JSON.stringify(myCart), {expires:30, path:"/"});
					sell();
					cartNum();
					userGoods(myCart);
					topshow();
					if(myCart.length==0){
						location.reload();
						return;
					}							
			}
		}	
	})
	
	//取消a的默认点击事件
	$(".cart-panel .bd").on("click",".operate a",function(e){
		e.preventDefault();
	});
	
	
	
	
})

//以下为工具函数




//动态加载购物车信息函数
function showMyCart(){
	var myCart = JSON.parse($.cookie("cart"));
	console.log(myCart);
	var sell = 0;
	$(".container .cart-panel .bd").empty();//清空原有商品信息
	$.get("json/goods.json",function(data){
		for(var i=0;i<data.length;i++){//遍历所有商品
			for(var j=0;j<myCart.length;j++){//遍历所有购物车商品
				if(data[i].id == myCart[j].id){//匹配购物车商品详细信息
					var ul  = $("<ul></ul>");
					var li1 = $("<li class='product'><a href='#'><img src="+data[i].img+"/></a><p><a href='#'>["+data[i].type+"]"+data[i].title+"</a></p></li>");
					var li2 = $("<li class='market-price'><span class='price-sign'>¥</span><span class='price-num'>"+data[i].oldpay+"</span></li>");
					var li3 = $("<li class='order-price'><span class='price-sign'>¥</span><span class='price-num'>"+data[i].pay+"</span></li>");
					var li4 = $("<li class='num'><span class='first'></span> <input type='text' class='goods-num' value="+myCart[j].num+" /> <span class='last'></span></li>");
					var li5 = $('<li class="operate"><a href="#" class="remove">删除</a><a href="#">移到我的关注</a></li>');
					ul.append(li1).append(li2).append(li3).append(li4).append(li5);
					$(".container .cart-panel .bd").append(ul);
					sell += data[i].pay * myCart[j].num;
					
					//添加点击跳转事件
					li1.find("a").eq(0).click(function(){
						var id = $(this).find("img").attr("src").slice(4,7);
						location.href ="product.html?"+id;
					});
					li1.find("a").eq(1).click(function(){
						var id = $(this).parent().parent().find("img").attr("src").slice(4,7);
						location.href ="product.html?"+id;
					});
					
				}
			}
		}
		$(".set-bar .price-num").html(sell);
	})
}

//总价函数
function sell(){
	var myCart = JSON.parse($.cookie("cart"));
	var sell = 0;
	$.get("json/goods.json",function(data){
		for(var i=0;i<data.length;i++){
			for(var j=0;j<myCart.length;j++){
				if(data[i].id == myCart[j].id){
					sell += data[i].pay * myCart[j].num;
				}
			}
		}
		$(".set-bar .price-num").html(sell);
	})
}
