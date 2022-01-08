//This function puts colons between the arguments passed
//Quality of life function for making redis calls
module.exports = function(){
  return Array.prototype.slice.call(arguments).join(':');
};
