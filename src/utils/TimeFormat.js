export const TimeFormat = (originalTimeString) => {
  const options = { hour: "numeric", minute: "numeric" };
  const formattedTime = new Date(originalTimeString).toLocaleTimeString(
    "id-ID",
    options
  );
  const formattedTimeCustom = formattedTime.replace(".", ":");
  return formattedTimeCustom;
};

export const formatTwoDigits = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};

export const formatThreeDigits = (value) => {
  if (value < 10) return `00${value}`;
  if (value < 100) return `0${value}`;
  return `${value}`;
};
