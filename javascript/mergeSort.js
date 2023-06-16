// 归并排序（Merge Sort）
// 归并排序，是创建在归并操作上的一种有效的排序算法。
// 算法是采用分治法（Divide and Conquer）的一个非常典型的应用，且各层分治递归可以同时进行。
// 归并排序思路简单，速度仅次于快速排序，为稳定排序算法，一般用于对总体无序，但是各子项相对有序的数列。
const mergeSort = (arr) => {
  if (arr.length === 1) {
    return arr;
  }
  const middle = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, middle));
  const right = mergeSort(arr.slice(middle));

  return merge(left, right);
}

const merge = (left, right) => {
  let temp = [];
  let leftIndex = 0, rightIndex = 0;
  
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      temp.push(left[leftIndex++]);
    } else {
      temp.push(right[rightIndex++]);
    }
  }

  if (leftIndex < left.length) {
    temp = temp.concat(left.slice(leftIndex));
  }
  if (rightIndex < right.length) {
    temp = temp.concat(right.slice(rightIndex));
  }

  return temp;
}
