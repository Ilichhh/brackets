module.exports = function check(str, bracketsConfig) {
  let stack = [];

  function isOpen(bracket) {
    const openBrackets = []; 
    bracketsConfig.forEach(pair => openBrackets.push(pair[0]))
    return openBrackets.includes(bracket);
  }

  function isDoubled(bracket) {
    let isDoubled;
    for(let pair of bracketsConfig) {
      if (pair[0] === bracket && pair[1] === bracket) isDoubled = true;
    }
    return isDoubled;
  }

  function isPaired(closeBracket, openBracket) {
    let isPaired;
    for(let pair of bracketsConfig) {
      if (pair[0] === openBracket && pair[1] === closeBracket) isPaired = true;
    }
    return isPaired;
  }


  for (let bracket of str) {
    if (stack) {
      if (isOpen(bracket) && !isDoubled(bracket)) {
        stack.push(bracket);
      } else if (isDoubled(bracket)) {
        if (!isPaired(bracket, stack[stack.length-1])) stack.push(bracket);
          else stack.pop();
      } else if (isPaired(bracket, stack[stack.length-1])) stack.pop(); 
        else return false
    } 
    else {
      if (isOpen(bracket)) stack.push(bracket); 
      else return false;
    }
  }

  return stack.length === 0;
}
