export const format = (d, type) => {
  const date = new Date(d);
  const yyyy = date.getFullYear();
  const MM =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const dd = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const HH = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const mm =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const ss =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  switch (type) {
    case "yyyy-MM-dd":
      return `${yyyy}-${MM}-${dd}`;
    case "yyyy-MM-dd HH:mm:ss":
      return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
    case "yyyy-MM-dd HH:mm":
      return `${yyyy}-${MM}-${dd} ${HH}:${mm}`;
    case "yyyy-MM":
      return `${yyyy}-${MM}`;
    case "MM-dd--zh":
      return `${MM}月${dd}日`;
    default:
      return `${yyyy}-${MM}-${dd}`;
  }
};
