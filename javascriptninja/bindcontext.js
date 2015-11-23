window.onload = function(){
		function bind(context,name){
			return function(){
				return context[name].apply(context,arguments);
			};
		}

		var button = {
			clicked:true,
			click:function(){
				this.clicked = true;
				assert(button.clicked,"The button has been clicked");
				console.log(this);
			}
		};
		
		var elem = document.getElementById("test");
		elem.addEventListener("click",bind(button,"click"),false);
	}