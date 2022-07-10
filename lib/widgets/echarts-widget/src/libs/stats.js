export const cumulativeSumArray = (array) =>
  array.reduce((acc, element) => {
    acc.push(acc.length === 0 ? element : element + acc[acc.length - 1]);
    return acc;
  }, []);
