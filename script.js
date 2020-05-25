const textfield = document.getElementById("textfield");
let field = [];
clearField();

function clearField() {
  textfield.value = "";
  field = [];
}

/**
 *   Splits up current display and pops off the rightmost character,
 *   then rejoins it together to be redisplayed in the textfield.
 *
 *   Also updates the final element of the field
 *
 * */
function backspaceField() {
  if (field.length === 0) {
    return;
  }
  let lastElem = field.pop();
  if (lastElem.length === 1) {
    textfield.value = field.join(" ");
    return;
  }
  let newLastElem = lastElem.toString().split("");
  newLastElem.pop();
  field.push(newLastElem.join(""));
  textfield.value = field.join(" ");
}

function swapSign() {
  if (field.length === 0) {
    return;
  }
  let lastElem = field.pop();
  if (isOperator(lastElem) || lastElem == 0) {
    field.push(lastElem);
    return;
  } else if (lastElem.toString().includes("-")) {
    lastElem = lastElem.toString().replace("-", "");
    field.push(lastElem);
    textfield.value = textfield.value.replace(/-([^-]*)$/, lastElem);
  } else {
    lastElem = "-" + lastElem.toString();
    field.push(lastElem);
    textfield.value = field.join(" ");
  }
}

function isOperator(id) {
  switch (id) {
    case "+":
    case "-":
    case "/":
    case "x":
      return true;

    default:
      return false;
  }
}

function endsInPeriod(e) {
  if (e === undefined) {
    return false;
  }
  let tempArr = e.toString().split("");
  if (tempArr[tempArr.length - 1] == ".") {
    return true;
  }
  return false;
}

function addToField(id) {
  let lastElem = field[field.length - 1];
  if (lastElem === undefined && !isOperator(id)) {
    field.push(id);
    textfield.value = id;
  } else if (id == "." && lastElem.includes(".")) {
    return;
  } else if (
    lastElem.toString().length > 1 &&
    endsInPeriod(lastElem) &&
    isOperator(id)
  ) {
    backspaceField();
    field.push(id);
    textfield.value = field.join(" ");
  } else if (
    (!isOperator(lastElem) && !isOperator(id)) ||
    (lastElem.toString().includes(".0") && !isOperator(id))
  ) {
    field.pop();
    field.push(lastElem + id);
    textfield.value = field.join(" ");
  } else if (lastElem == 0 && !isOperator(id)) {
    field.pop();
    field.push(id);
    textfield.value = field.join(" ");
  } else if (field.length === 0 && isOperator(id)) {
    return;
  } else if (
    (!isOperator(lastElem) && isOperator(id) && lastElem.toString() !== ".") ||
    (isOperator(lastElem) && !isOperator(id))
  ) {
    field.push(id);
    textfield.value = field.join(" ");
  } else {
    return;
  }
}

function operateAll() {
  while (field.length > 1) {
    let result = operate();
    if (result == -1) {
      break;
    }
  }
}

function operate() {
  let tempField = field.slice();
  let lastElem = field[field.length - 1];
  if (isOperator(lastElem) || endsInPeriod(lastElem)) {
    field = tempField;
    return -1;
  }
  const num1 = parseFloat(field.shift());
  const operator = field.shift();
  const num2 = parseFloat(field.shift());
  let result;
  switch (operator) {
    case "+":
      value = num1 + num2;
      textfield.value = value;
      field.unshift(value);
      break;
    case "-":
      value = num1 - num2;
      textfield.value = value;
      field.unshift(value);
      break;
    case "/":
      if (num2 === 0) {
        clearField();
        textfield.value = "Can't divide by 0";
        break;
      }
      value = num1 / num2;
      textfield.value = value;
      field.unshift(value);
      break;
    case "x":
      value = num1 * num2;
      textfield.value = value;
      field.unshift(value);
      break;
    default:
      field = tempField;
      break;
  }
}

function oneDivideByX() {
  let lastElem = field[field.length - 1];
  if (isOperator(lastElem) || field.length == 0) {
    return;
  } else if (lastElem == 0) {
    textfield.value = "Can't divide by 0";
    return;
  }
  field.pop();
  lastElem = 1 / lastElem;
  field.push(lastElem);
  textfield.value = field.join(" ");
}

function xSquared() {
  let lastElem = field[field.length - 1];
  if (isOperator(lastElem) || field.length === 0) {
    return;
  }
  field.pop();
  lastElem = Math.pow(lastElem, 2);
  field.push(lastElem);
  textfield.value = field.join(" ");
}

function squareRootOfX() {
  let lastElem = field[field.length - 1];
  if (isOperator(lastElem) || field.length === 0) {
    return;
  }
  field.pop();
  lastElem = Math.sqrt(lastElem);
  field.push(lastElem);
  textfield.value = field.join(" ");
}
