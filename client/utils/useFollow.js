let originCount = 0;

const useFollow = () => {
  const count = originCount;
  /**
   * 重新赋值关注总数
   * @param {number} [newCount=0]
   */
  const setFollow = (newCount = 0) => {
    originCount = newCount;
    return originCount;
  };

  return [count, setFollow];
};

module.exports = useFollow;
