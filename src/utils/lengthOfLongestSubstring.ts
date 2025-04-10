/**
 * 计算输入字符串中最长的不包含重复字符的子字符串的长度。
 * 使用滑动窗口和哈希表来记录字符的索引，从而提高效率。
 *
 * @param {string} ls - 输入字符串
 * @returns {number} - 最长的不包含重复字符的子字符串的长度
 */
export default function lengthOfLongestSubstring(ls: string): number {
  // 初始化最大长度为0
  let maxLength = 0;
  // 初始化滑动窗口的起始位置为0
  let start = 0;
  // 创建一个哈希表来存储字符及其对应的索引
  const charIndexMap: { [key: string]: number } = {};

  // 遍历输入字符串
  for (let end = 0; end < ls.length; end++) {
    // 获取当前字符
    const char = ls[end];
    // 如果当前字符已经在哈希表中，并且其索引在当前滑动窗口内
    if (charIndexMap[char] !== undefined && charIndexMap[char] >= start) {
      // 将滑动窗口的起始位置移动到重复字符的下一个位置
      start = charIndexMap[char] + 1;
    }
    // 更新或添加当前字符的索引到哈希表
    charIndexMap[char] = end;
    // 更新最大长度
    maxLength = Math.max(maxLength, end - start + 1);
  }

  // 返回最大长度
  return maxLength;
}
