// 冒泡排序算法
// 它重复地走访过要排序的元素列，依次比较两个相邻的元素，
// 如果顺序（如从大到小、首字母从Z到A）错误就把他们交换过来。
// 走访元素的工作是重复地进行，直到没有相邻元素需要交换，也就是说该元素列已经排序完成。
// 这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端（升序或降序排列），
// 就如同碳酸饮料中二氧化碳的气泡最终会上浮到顶端一样，故名“冒泡排序”。
const bubbleSort = (arr) => {
  let temp = null;
  let newArr = [...arr];
  for(let i = 0; i < newArr.length -1; i++) {
    for (let j = 0; j < newArr.length - 1 - i; j++) {
      if (newArr[j] > newArr[j + 1]) {
        temp = newArr[j];
        newArr[j] = newArr[j + 1];
        newArr[j + 1] = temp;
      }
    }
  }
  return newArr;
}
