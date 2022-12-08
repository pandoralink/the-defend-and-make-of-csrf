let originName = "杰尼龟";

const useName = () => {
  const name = originName;
  /**
   * 重新赋值用户名称
   * @param {string} [newName="杰尼龟"]
   */
  const setName = (newName = "杰尼龟") => {
    originName = newName;
    return originName;
  };

  return [name, setName];
};

module.exports = useName;
