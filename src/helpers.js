export const truncateText = (str, limit) =>
  str.length > limit ? `${str.substring(0, limit)} ...` : str;

export const formatDate = date => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
  date = new Date(date);
  date = `${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;

  return date;
};
