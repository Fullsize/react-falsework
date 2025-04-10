/**
 * 快速排序算法的默认实现
 *
 * 此函数使用分治法对数组进行排序，通过递归方式将数组分为较小的部分并进行排序
 * 它选取一个基准值，然后将数组分为两部分：一部分包含小于基准值的元素，另一部分包含大于基准值的元素
 * 这个过程一直重复，直到整个数组变得有序
 *
 * @param arr 要排序的数组
 * @param left 排序开始的索引，默认为数组的起始位置
 * @param right 排序结束的索引，默认为数组的结束位置
 */
export default function quickSort(
  arr: number[],
  left: number = 0,
  right: number,
) {
  // 检查递归的终止条件，如果左指针大于右指针，则终止递归
  if (left > right) return;

  // 选取基准值，这里选择数组最左边的元素作为基准
  const base = arr[left];
  let i = left,
    j = right;

  // 开始寻找基准值的正确位置，直到i和j相遇
  while (i != j) {
    // 从右向左找到第一个小于基准值的元素
    while (arr[j] >= base && i < j) {
      j--;
    }
    // 从左向右找到第一个大于基准值的元素
    while (arr[i] <= base && i < j) {
      i++;
    }
    // 如果找到的两个元素不满足条件，则交换它们的位置
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  // 将基准值放到正确的位置上
  arr[left] = arr[i];
  arr[i] = base;

  // 递归对基准值左边的数组进行排序
  quickSort(arr, left, i - 1);
  // 递归对基准值右边的数组进行排序
  quickSort(arr, i + 1, right);
}
