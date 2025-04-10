/**
 * 找出字符串中出现频率最高的字符
 * @param ls 输入的字符串
 * @returns 出现频率最高的字符
 */
export default function findMostFrequentChar(ls: string) {
  // 创建一个哈希表来记录每个字符的出现次数
  const hash: { [x: string]: number } = {};
  // 初始化最大出现次数为0
  let maxCount = 0;
  // 初始化出现频率最高的字符为空字符串
  let mostFrequentChar = '';
  // 遍历字符串中的每个字符
  for (const i of ls) {
    // 在哈希表中更新字符的出现次数，如果字符不存在则初始化为0后加1
    hash[i] = (hash[i] || 0) + 1;
    // 如果当前字符的出现次数超过了最大出现次数
    if (hash[i] > maxCount) {
      // 更新出现频率最高的字符为当前字符
      mostFrequentChar = i;
      // 更新最大出现次数为当前字符的出现次数
      maxCount = hash[i];
    }
  }
  // 返回出现频率最高的字符
  return mostFrequentChar;
}
