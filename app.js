const resultEl = document.querySelector("#result");
const lengthEl = document.querySelector("#length");
const uppercaseEl = document.querySelector("#uppercase");
const lowercaseEl = document.querySelector("#lowercase");
const symbolsEl = document.querySelector("#symbols");
const numberEl = document.querySelector("#numbers");
const generateEl = document.querySelector("#generate");
const clipboardEl = document.querySelector("#clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};
//Event Listener For Generate Button
generateEl.addEventListener("click", () => {
  let length = Number(lengthEl.value);
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numberEl.checked;
  const hasSymbol = symbolsEl.checked;
  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});
//Copy Password To Clipboard
clipboardEl.addEventListener("click", () => {
  const textArea = document.createElement("textarea");
  const password = resultEl.innerText;
  if (!password) return;
  textArea.value = password;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
  alert("Password Copied To Clipboard");
});

//Generate Password Function
let generatePassword = (lower, upper, number, symbol, length) => {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    item => {
      return Object.values(item)[0];
    }
  );
  if (typesCount === 0) {
    return "";
  }
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      // console.log(funcName);
      generatedPassword += randomFunc[funcName]();
    });
  }
  return generatedPassword.slice(0, length);
};

//LowerCase Letter
function getRandomLower() {
  return String.fromCharCode(Math.floor(96 + Math.random() * 26));
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(65 + Math.random() * 26));
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(48 + Math.random() * 10));
}
function getRandomSymbol() {
  let symbol = "!@#$%^&*<>?";
  let len = symbol.length;
  return symbol.charAt(Math.floor(Math.random() * len));
}
