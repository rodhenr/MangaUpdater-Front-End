// Checa se o dia é hoje, ontem ou anterior
export const checkDate = (date: Date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const to2Digits = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  const formatDate = (d: Date) => {
    return [
      to2Digits(d.getDate()),
      to2Digits(d.getMonth() + 1),
      d.getFullYear(),
    ].join("/");
  };

  const tDate = formatDate(today);
  const yDate = formatDate(yesterday);
  const dDate = formatDate(new Date(date));

  if (dDate === tDate) {
    return "Hoje";
  } else if (dDate === yDate) {
    return "Ontem";
  } else {
    return dDate;
  }
};