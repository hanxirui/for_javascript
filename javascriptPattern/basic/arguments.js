function format(string) {   

  var args = arguments;   

  var pattern = new RegExp("%([1-" + arguments.length + "])", "g");   

  return String(string).replace(pattern, function(match, index) {   

    return args[index];   

  });   

}; 

function makeFunc() {   

  var args = Array.prototype.slice.call(arguments);   

  var func = args.shift();   

  return function() {   

    return func.apply(null, args.concat(Array.prototype.slice.call(arguments)));   

  };   

};

var majorTom = makeFunc(format, "This is Major Tom to ground control. I’m %1.");

majorTom("stepping through the door");   

majorTom("floating in a most peculiar way");