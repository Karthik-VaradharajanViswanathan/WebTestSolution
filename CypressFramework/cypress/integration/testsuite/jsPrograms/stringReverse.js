function reverseAString(val) {
  if (val === null) {
    return "";
  }

  const charArray = val.split("");
  const length = charArray.length;

  for (let i = 0; i <= length / 2; i++) {
    const temp = charArray[i];
    charArray[i] = charArray[length - 1 - i];
    charArray[length - 1 - i] = temp;
  }
  return charArray.join("");
}

console.log(reverseAString("Welcome to javascript")); // O(n) Time complexity

function invertCheck(input) {
  if (typeof input === "string") {
    return input.split("").reverse().join("");
  } else if (input === null) {
    return "";
  } else {
    // Handle other data types or unexpected input
    return String(input);
  }
}

// Validate the invert function
console.log(invertCheck("a")); // Expected output: "a"
console.log(invertCheck(null)); // Expected output: ""
console.log(invertCheck("abcd")); // Expected output: "dcba"
