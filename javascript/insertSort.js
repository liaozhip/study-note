// 插入排序，一般也被称为直接插入排序。
// 对于少量元素的排序，它是一个有效的算法 。
// 插入排序是一种最简单的排序方法，它的基本思想是将一个记录插入到已经排好序的有序表中，从而一个新的、记录数增1的有序表。
// 在其实现过程使用双层循环，外层循环对除了第一个元素之外的所有元素，内层循环对当前元素前面有序表进行待插入位置查找，并进行移动
const insertSort = (arr) => {
  const newArr = [...arr];
  let temp = null;
  for (let i = 1; i < newArr.length; i++) {
    for (let j = i; j > 0; j--) {
      if (newArr[j - 1] > newArr[j]) {
        temp = newArr[j - 1];
        newArr[j - 1] = newArr[j];
        newArr[j] = temp;
      }
    }
  }
  return newArr;
}
