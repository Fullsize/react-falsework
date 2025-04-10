/**
 * 计算第 n 个斐波那契数。
 *
 * 斐波那契序列是一个由数字组成的系列，其中每个数字是前两个数字的和，通常从 0 和 1 开始。
 * 在此函数中，使用迭代方法计算第 n 个斐波那契数，避免了递归调用带来的性能问题。
 *
 * @param n 斐波那契序列中的位置，从 0 开始。
 * @returns 第 n 个斐波那契数。
 * @throws {Error} 如果输入为负整数，则抛出错误。
 */
export default function fibonacci(n: number): number {
  // 验证输入以确保其为非负数
  if (n < 0) throw new Error('输入必须是非负整数');

  // 如果 n 小于等于 1，则直接返回 n，因为结果就是输入本身
  if (n <= 1) return n;

  // 初始化前两个斐波那契数
  let a = 0,
    b = 1;

  // 通过循环计算第 n 个斐波那契数
  for (let i = 2; i <= n; i++) {
    // 使用解构赋值更新 a 和 b 的值，实现数值的交换与更新
    [a, b] = [b, a + b];
  }

  // 返回计算得到的第 n 个斐波那契数
  return b;
}
