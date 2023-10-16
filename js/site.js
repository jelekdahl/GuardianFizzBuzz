const MAX_VAL_STOP = 5000;
const COUNT_START = 1;
const COL_PER_ROW = 5;

const CLASS_FIZZ = 'fizz';
const CLASS_BUZZ = 'buzz';
const CLASS_FIZZBUZZ = 'fizzBuzz';
const CONTENT_FIZZ = "Fizz";
const CONTENT_BUZZ = 'Buzz';
const CONTENT_FIZZBUZZ = 'FizzBuzz';

let DEF_VAL_FIZZ = 3;
let DEF_VAL_BUZZ = 5;
let DEF_VAL_STOP = 100;

function populateTable(idTbody, idFizzInput, idBuzzInput, idStopInput) {
  let values = getValues(idFizzInput, idBuzzInput, idStopInput);

  if (isValidInput(values)) {
    let fizzBuzz = generateFizzBuzz(values);
    displayFizzBuzz(fizzBuzz, idTbody);
  }
}

function getValues(idFizzInput, idBuzzInput, idStopInput) {
  let values = {
    fizz: parseInt(document.getElementById(idFizzInput).value),
    buzz: parseInt(document.getElementById(idBuzzInput).value),
    stop: parseInt(document.getElementById(idStopInput).value)
  };

  return values;
}

function isValidInput(values) {
  let isValid = true;

  if (!Number.isInteger(values.fizz) || values.fizz < COUNT_START) {
    isValid = false;
    Swal.fire({
      icon: 'error',
      title: 'Invalid Fizz Value',
      text: `Please change Fizz Value to an integer between ${COUNT_START} and ${MAX_VAL_STOP}.`,
    });
  } else if (!Number.isInteger(values.buzz) || values.buzz < COUNT_START) {
    isValid = false;
    Swal.fire({
      icon: 'error',
      title: 'Invalid Buzz Value',
      text: `Please change Buzz Value to an integer between ${COUNT_START} and ${MAX_VAL_STOP}.`,
    });
  } else if (!Number.isInteger(values.stop) || values.stop < COUNT_START || values.stop > MAX_VAL_STOP) {
    isValid = false;
    Swal.fire({
      icon: 'error',
      title: 'Invalid Stop Value',
      text: `Please change Stop Value to an integer between ${COUNT_START} and ${MAX_VAL_STOP}.`,
    });
  }

  return isValid;
}

function generateFizzBuzz(values) {
  let fizzBuzz = new Array(values.stop - COUNT_START + 2); //Gonna do a 1-indexed array
  if (values.fizz == values.buzz) {
    fillEveryNthCell(fizzBuzz, values.fizz, CONTENT_FIZZBUZZ);
  } else {
    fillEveryNthCell(fizzBuzz, values.fizz * values.buzz, CONTENT_FIZZBUZZ);
    fillEveryNthCell(fizzBuzz, values.fizz, CONTENT_FIZZ);
    fillEveryNthCell(fizzBuzz, values.buzz, CONTENT_BUZZ);
  }

  for (let i = 1; i < fizzBuzz.length; i++) {
    if (!fizzBuzz[i]) fizzBuzz[i] = '' + i;
  }
  
  return fizzBuzz;
}

function fillEveryNthCell(arr, n, className) {
  for (let i = n; i < arr.length; i += n) {
    if (!arr[i]) arr[i] = className;
  }
}

function displayFizzBuzz(fizzBuzz, idTbody) {
  let html = fizzBuzzToHTML(fizzBuzz);
  let tbody = document.getElementById(idTbody);
  tbody.innerHTML = html;
}

function fizzBuzzToHTML(fizzBuzz) {
  let html = '';
  
  let i = 1;
  let j, rowStop;
  while (i < fizzBuzz.length) {
    j = i;
    rowStop = Math.min(j + COL_PER_ROW, fizzBuzz.length);

    html += '<tr>';
    while (j < rowStop) {
      if (fizzBuzz[j] == CONTENT_FIZZBUZZ) {
        html += `<td class="${CLASS_FIZZBUZZ}">${fizzBuzz[j]}</td>`;
      } else if (fizzBuzz[j] == CONTENT_FIZZ) {
        html += `<td class="${CLASS_FIZZ}">${fizzBuzz[j]}</td>`;
      } else if (fizzBuzz[j] == CONTENT_BUZZ) {
        html += `<td class="${CLASS_BUZZ}">${fizzBuzz[j]}</td>`;
      } else {
        html += `<td>${fizzBuzz[j]}</td>`;
      }

      j++;
    }
    html += '</tr>';
    i = rowStop;
  }

  return html;
}