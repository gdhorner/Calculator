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

  let newDisplay = textfield.value.split("");
  newDisplay.pop();
  if (newDisplay[newDisplay.length - 1] == " ") {
    newDisplay.pop();
  }
  textfield.value = newDisplay.join("");

  let lastElem = field.pop();
  if (lastElem.length === 1) {
    return;
  }
  let newLastElem = lastElem.toString().split("");
  newLastElem.pop();
  field.push(newLastElem.join(""));
}

function swapSign() {
  if (field.length === 0) {
    return;
  }
  let lastElem = field.pop();
  if (isOperator(lastElem)) {
    field.push(lastElem);
    return;
  } else if (lastElem.toString().includes("-")) {
    lastElem = lastElem.toString().replace("-", "");
    field.push(lastElem);
    textfield.value = textfield.value.replace(/-([^-]*)$/, lastElem);
  } else {
    lastElem = "-" + lastElem.toString();
    field.push(lastElem);
    let newDisplay = textfield.value.split(" ");
    newDisplay.pop();
    newDisplay.push(lastElem);
    textfield.value = newDisplay.join(" ");
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

function addToField(id) {
  let lastElem = field[field.length - 1];
  if (lastElem === undefined && !isOperator(id)) {
    field.push(id);
    textfield.value = id;
  } else if (!isOperator(lastElem) && !isOperator(id)) {
    field.pop();
    field.push(lastElem + id);
    textfield.value = textfield.value + id;
  } else if (field.length === 0 && isOperator(id)) {
    return;
  } else if (
    (!isOperator(lastElem) && isOperator(id)) ||
    (isOperator(lastElem) && !isOperator(id))
  ) {
    field.push(id);
    textfield.value = textfield.value + " " + id;
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
  if (isOperator(lastElem)) {
    field = tempField;
    return -1;
  }
  const num1 = parseInt(field.shift());
  const operator = field.shift();
  const num2 = parseInt(field.shift());
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
