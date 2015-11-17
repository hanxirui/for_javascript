function log(){
	try{
		console.log.apply(console,arguments);
	}catch(e){
		try{
			opera.postError.apply(opera,arguments);
		}catch(e){
			alert(Array.prototype.join.call(arguments,' '));
		}
	}
};

function assert(value,desc){
	var li = document.createElement("li");
	li.className = value ? "pass":"fail";
	li.appendChild(document.createTextNode(desc));
	document.getElementById("results").appendChild(li);

	return li;
};

function test(name,fn){
	var results = document.getElementById("results");
	results = assert(true,name).appendChild(document.createElement("ul"));
	fn();
}