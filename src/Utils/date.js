export const getYear = () => {
  return new Date().getFullYear();
};
export const getMonth = () => {
  const month = new Date().getMonth() + 1;
  return month < 10 ? `0${month}` : month;
};
export const getDate = () => {
  const date = new Date().getDate();
  return date < 10 ? `0${date}` : date;
};

export const todayDate = () => {
  return `${getYear()}-${getMonth()}-${getDate()}`;
};
