export const DateFormat = (originalDateString) => {
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate = new Date(originalDateString).toLocaleDateString(
    "id-ID",
    options
  );

  const formattedDateArray = formattedDate.split(" ");
  formattedDateArray[2] = formattedDateArray[2].slice(0, 3);

  return formattedDateArray.join(" ");
};

export const FormFormat = (timestamp) => {
  // Parsing the date string
  var date = new Date(timestamp);

  // Extracting date parts
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
  var day = ("0" + date.getDate()).slice(-2);

  // Formatted date
  var formattedDate = year + "-" + month + "-" + day;

  return formattedDate;
};
