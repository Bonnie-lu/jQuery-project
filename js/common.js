$(function(){
	//顶部导航栏左边鼠标滑过事件
	$(".site-nav-left .dropdown").mouseover(function(){
		$(this).find("a").addClass("hover");
		$(this).find(".dropdown-menu").show();
	})
	$(".site-nav-left .dropdown").mouseout(function(){
		$(this).find("a").removeClass("hover");
		$(this).find(".dropdown-menu").hide();
	})
	//顶部导航栏右边鼠标滑过事件
	$(".site-nav-right .dropdown").mouseover(function(){
		$(this).find("a").addClass("hover");
		$(this).find(".dropdown-service").show();
		$(this).find("#CartInfo").show();
		
	})
	$(".site-nav-right .dropdown").mouseout(function(){
		$(this).find("a").removeClass("hover");
		$(this).find(".dropdown-service").hide();
		$(this).find("#CartInfo").hide();
	})
	
	//右边固定栏事件
	$(".r-fixde .list li, .r-fixde .return-top ").mouseenter(function(){

		$(this).find(".mp_tooltip").show().stop().animate({left:-102}).parent().siblings().find(".mp_tooltip").hide();
	})
	$(".r-fixde .list li, .r-fixde .return-top ").mouseleave(function(){
		$(this).find(".mp_tooltip").stop().animate({left:-152},function(){
			$(this).hide();
		});
	})

	
	//固定栏滚动事件
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		if(scrollTop>=$(window).height()/5){
			$(".r-fixde .footer").css("bottom",40);
			$(".r-fixde .return-top").show();
		}else{
			$(".r-fixde .footer").css("bottom",10);
			$(".r-fixde .return-top").hide();
		}
	})
	//回到顶部事件
	$(".r-fixde .return-top").click(function(){
		$("html,body").stop().animate({scrollTop: 0})
	})
	
	//生成一个随机4位验证码
	var Code = RanmdomCode();//存储验证码 
	$(".refresh span").html(Code);//初次生成并赋值
	
	function RanmdomCode(){
		var str = "";
		for(var i=0;i<4;i++){
			var a = parseInt(Math.random()*10);
			str += a;
		}		
		return str;
	}
	//阻止.refresh的默认行为
	$(".refresh").click(function(e){
		e.preventDefault(); //阻止超链接的默认行为
	})
	
	//点击生成验证码
	$(".refresh").click(function(){
		Code = RanmdomCode();
		$(".refresh span").html(Code);
	})
	
	
	//注册事件
	var allUser = $.cookie("user") ? JSON.parse($.cookie("user")) : [];//保存注册用户
	$("#register").click(function(){
		
		var isEmail = Check_Email();
		var isPassword = ChangePassword();
		var isRePassWord = Check_RePassWord(); 
		var isCode = CheckValidateCode();
		if(!isEmail || !isPassword || !isRePassWord || !isCode){
			$("#Enr").show();
		}else if(isEmail && isPassword && isRePassWord && isCode){
			$("#Enr").hide();
			
			var newUser ={
				UserName : $("#Email").val(),
				PassWord : $("#PassWord").val(),
				goods    : []
			}
			console.log("注册成功");
			allUser.push(newUser); 
			//json序列化
			var allUserStr = JSON.stringify(allUser);
			$.cookie("user", allUserStr, {expires:7, path:"/"});
			console.log($.cookie("user"));
			alert("恭喜您注册成功");
			location.href = "logon.html";
		}
	})
	
	//检查EMAIL
    function Check_Email() {
        if (document.getElementById("Email").value.length < 1) {
            $("#Enr-1").html("请输入你的Email地址!");
            return false;
        } else if ((/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/gi).test($("#Email").val()) == false) {
            $("#Enr-1").html("请输入有效的Email地址!");
            return false;
        }
        else {
        	if(!$.cookie("user")){//如果cookie里无用户则返回true
        		return true;
        	}
            var email = $("#Email").val();
            var user = JSON.parse($.cookie("user"));
            for(var i=0;i<user.length;i++){
            	if(email == user[i].UserName){
            		$("#Enr-1").html("对不起，该用户名已经被人占用!");
                	return false;
            	}
            }            
        }
        return true;
    }
	//检查密码
        function ChangePassword() {

            var pwd = document.getElementById("PassWord").value;
            if (pwd == null || pwd.length < 6) {
                $("#Enr-1").html("此项为必填项，密码不能小于6位");
                return false;
            }
            return true;
        }
        //检查重新输出密码
        function Check_RePassWord() {

            var PassWord = document.getElementById("PassWord");
            var RexPassWord = document.getElementById("RexPassWord");
            if ((RexPassWord.value == "") || (PassWord.value != RexPassWord.value)) {
                $("#Enr-1").html("两次输入密码不一致，请重新输入！");
                return false;
            } else {
            }
            return true;
        }
	
	//检查验证码
        function CheckValidateCode() {
			
            var Validate_Code = document.getElementById("Validate_Code");
            if ((Validate_Code.value == "") || (Validate_Code.value.length < 4)) {
                $("#Enr-1").html("请输入正确的验证码");
                return false;
            }
            if(Validate_Code.value == Code){
            	return true;
            }            
        }
	//注册页面失去焦点事件
	$("#Email").blur(function(){
		if(!Check_Email()){
			$("#Enr").show();
		}else{
			$("#Enr").hide();
		}
	})
	$("#PassWord").blur(function(){
		if(!ChangePassword()){
			$("#Enr").show();
		}else{
			$("#Enr").hide();
		}
	})
	$("#RexPassWord").blur(function(){
		if(!Check_RePassWord()){
			$("#Enr").show();
		}else{
			$("#Enr").hide();
		}
	})
	$("#Validate_Code").blur(function(){
		if(!CheckValidateCode()){
			$("#Enr").show();
		}else{
			$("#Enr").hide();
		}
	})
	
	//登录事件
	
	$("#dosubmit").click(function(){
		var userName = $("#UserName").val();
		var passward = $("#PassWord1").val();
		
		//获取cookie中的所有用户
		var arr = $.cookie("user");
		if (arr) {
			arr = JSON.parse(arr); 
			
			//遍历, 查找是否存在匹配的用户名和密码
			var isExist = false; //表示是否存在匹配的用户名和密码
			for (var i=0; i<arr.length; i++) {
				//如果存在匹配的用户名和密码, 则表示登录成功!
				if (userName == arr[i].UserName && passward == arr[i].PassWord) {
					alert("恭喜您, 登录成功!");
					isExist = true; //存在匹配的
					
					//保存登录成功后的用户名,密码
					var loginUser = {
						username: userName, 
						passward: passward,
						goods:arr[i].goods
					};
					$.cookie("loginUser", JSON.stringify(loginUser), {expires:30, path:"/"});
					location.href="index.html";
				}
			}
			
			if (isExist == false) {
				alert("用户名或密码错误, 请重新登录!");
				console.log("用户名或密码错误, 请重新登录!");
			}
		}
		else {
			alert("请先注册!");
			location.href = "Register.html";
		}
	})
	
	//注销事件
	$("#LoginInfo, .ibar_login_box").on("click","#zhuxiao",function(){
		$.cookie("loginUser", "", {expires:0, path:"/"});
		$.cookie("cart","",{expires:0,path:"/"})//清空购物车
		location.reload();
	})
	
	
	//登录
	denlu();	
	//顶部购物栏
	topshow();
	$("")
})

//以下为工具函数
	//登录函数
	function denlu(){
		//获取登陆用户
		var onUser = $.cookie("loginUser") ? JSON.parse($.cookie("loginUser")) : null ; 
		if(onUser){
			var zhuxiao = $("<a id='zhuxiao' href='#'> 注销</a>");
			$("#LoginInfo").html("欢迎您"+onUser.username);
			$.cookie("cart",JSON.stringify(onUser.goods),{expires:30,path:"/"})//加载用户购物车
			
			$("#LoginInfo").append(zhuxiao);
			$(".ibar_login_box p").html("欢迎您"+onUser.username);
			zhuxiao.clone().appendTo(".ibar_login_box p");
			$("#gwcCount").html("("+onUser.goods.length+")");
			$(".secend .ico8").html(onUser.goods.length);
		};
		cartNum();
		
	}


	//购物车函数
	function addToCart(){
		//获取当前商品id
		var goodsId = location.search.slice(1);
		//使用cookie存储商品id信息
		var arr = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
		//遍历arr, 查找原来购物车中是否存在相同的商品,如果存在,则增加商品数量
		var isExist = false; //表示是否存在相同的商品
		for (var i=0; i<arr.length; i++) {
			var obj = arr[i]; //原购物车的每个商品
			if (obj.id == goodsId) {
				//如果存在相同商品, 则增加数量
				obj.num++; 
				isExist = true; //存在相同商品
			}
		}
		
		//如果不存在相同的商品, 则添加该新商品到购物车数组arr中
		if (isExist == false) {
			//对象, 商品信息
			var goods = {
				id: goodsId,
				num: 1
			}
			arr.push(goods); //将新的商品加入数组arr中
		}
		
		//json序列化
		var arrStr = JSON.stringify(arr);
		//保存到cookie中
		$.cookie("cart", arrStr, {expires: 30, path:"/"});
		
		userGoods(arr);
	}
	
	
	//商品加入当前用户函数
	function userGoods(arr){
		var user = $.cookie("user");//获取所有用户信息
		var oUser = $.cookie("loginUser") ? JSON.parse($.cookie("loginUser")) : null ;//获取当前用户
		if(oUser){//如果有则执行
			user = JSON.parse(user);
			//遍历找到当前用户名的信息
			for(var i=0;i<user.length;i++){
				if(oUser.username == user[i].UserName){
					user[i].goods = arr;//添加商品信息
					oUser.goods = arr;
					//json序列化
					var allUserStr = JSON.stringify(user);
					$.cookie("user", allUserStr, {expires:7, path:"/"});//重新保存到cookie										
					$.cookie("loginUser", JSON.stringify(oUser), {expires:30, path:"/"});
				}
			}
		}
		
	}
	
	//商品飞入函数
	function fly(e){
		var offset = $(".ico9").offset();	//结束的地方的元素
		var img = $(".pro-bigimage").find('img').eq(0).attr('src');
		var flyer = $('<img class="u-flyer" src="'+img+'">');
		flyer.css({width:80,height:80});
		//var chushi = $("docmument").offset();//
		console.log("left:"+e.clientX+",top:"+e.clientY);
		flyer.fly({
			//开始位置
			start: {
				left: e.clientX - 80,
				top: e.clientY - 80
			},
			//结束位置
			end: {
				left: offset.left,
				top: 250,
				width: 0,
				height: 0
			},
			//结束后
			onEnd: function(){
				//location.reload();
				cartNum();
				topshow();
			}
		});
	}
	//更改商品种类数量函数
	function  cartNum(){
		
		var myCart = $.cookie("cart") ? JSON.parse($.cookie("cart")) : null;
		if(myCart){
			$("#gwcCount").html("("+myCart.length+")");
			$(".secend .ico8").html(myCart.length);
			
		}
		
				
	}
	

	//顶部购物栏动态添加函数
	function topCart(){
		var myCart = JSON.parse($.cookie("cart"));
		var sell = 0;
		$(".CartInfo .cart").empty();//清空原有商品信息
		$.get("json/goods.json",function(data){
			for(var i=0;i<data.length;i++){//遍历所有商品
				for(var j=0;j<myCart.length;j++){//遍历所有购物车商品
					if(data[i].id == myCart[j].id){//匹配购物车商品详细信息
						var div  = $('<div class="com-list"></div>');
						var div1 = $("<div class='img-box'><a href='#'><img src="+data[i].img+"/></a></div>");
						var div2 = $('<div class="title"><a href="#">'+data[i].title+'</a></div>');
						var div3 = $('<div class="num">'+myCart[j].num+'</div>');
						var div4 = $('<div class="price"><span>¥</span><span>'+data[i].pay+'</span></div>');
						div.append(div1).append(div2).append(div3).append(div4);
						$(".CartInfo .cart").append(div);
						sell += data[i].pay * myCart[j].num;
						
						div.find("a").click(function(){
							var id = $(this).parent().parent().find("img").attr("src").slice(4,7);
							location.href = "product.html?"+id;
						})
					}
				}
			}
			$(".CartInfo .first").html(myCart.length);
			$(".CartInfo .price-num").html(sell);
		})
	}

	//顶部购物栏显示
	function topshow(){
			var myCart = $.cookie("cart") ? JSON.parse($.cookie("cart")) : null;
		if(myCart == null || myCart.length==0){//购物车无商品时
			$(".CartInfo .spare").show();
			$(".CartInfo .settlement").hide();
			
		}else{//购物车有商品时
			$(".CartInfo .spare").hide();
			$(".CartInfo .settlement").show();
			topCart();
		}
	}