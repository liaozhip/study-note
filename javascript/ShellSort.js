// 希尔排序(Shell's Sort)是插入排序的一种又称“缩小增量排序”（Diminishing Increment Sort），
// 是直接插入排序算法的一种更高效的改进版本。
// 希尔排序是非稳定排序算法。该方法因 D.L.Shell 于 1959 年提出而得名。
// 希尔排序是把记录按下标的一定增量分组，对每组使用直接插入排序算法排序；
// 随着增量逐渐减少，每组包含的关键词越来越多，当增量减至 1 时，整个文件恰被分成一组，算法便终止。
const shellSort = (arr) => {
  const newArr = [...arr];
  let temp = null
  for (let gap = Math.floor(newArr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < newArr.length; i++) {
      let j = i;
      temp = newArr[j];
      while(j >= 0 && newArr[j - gap] > temp) {
        newArr[j] = newArr[j - gap];
        j -= gap;
      }
      newArr[j] = temp;
    }
  }
  return newArr;
}
