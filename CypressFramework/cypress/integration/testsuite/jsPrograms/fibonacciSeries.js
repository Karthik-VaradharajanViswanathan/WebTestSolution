function fibonacciSeries(n) {
  const fibSeries = [0, 1];

  for (let i = 2; i <= n; i++) {
    fibSeries[i] = fibSeries[i - 1] + fibSeries[i - 2];
  }

  return fibSeries;
}
// O(n) Time complexity

const output = fibonacciSeries(10);
console.log("1. The Fibonacci Series Output is " + output);
