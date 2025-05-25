function multiplyBy5(nums) {
  const cache = {};

  const multipliedValues = [];

  nums.forEach((num) => {
    if (cache[num]) {
      multipliedValues.push(cache[num]);
    } else {
      const expensiveOperation = num * 5;
      cache[num] = expensiveOperation;
      multipliedValues.push(expensiveOperation); // num * 5 is a expensive operation
    }
  });

  console.log('runs expensive operation');

  // return multipliedValues;
}

const nums = [1, 2, 3, 2, 1];

multiplyBy5(nums);
