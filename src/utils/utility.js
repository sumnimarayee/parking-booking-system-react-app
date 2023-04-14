const { ResetTvRounded, CurrencyBitcoin } = require("@mui/icons-material");

exports.computeStaffProfileUpdatePercentage = (updatedItems) => {
  let percentage = 0;

  if (updatedItems.bikeParkingCapacity) {
    percentage += 10;
  }
  if (updatedItems.carParkingCapacity) {
    percentage += 10;
  }
  if (updatedItems.bikeParkingCostPerHour) {
    percentage += 10;
  }
  if (updatedItems.carParkingCostPerHour) {
    percentage += 10;
  }
  if (updatedItems.openingTime) {
    percentage += 10;
  }
  if (updatedItems.closingTime) {
    percentage += 10;
  }
  if (updatedItems.name) {
    percentage += 10;
  }
  if (updatedItems.location) {
    percentage += 10;
  }
  if (updatedItems.password) {
    percentage += 10;
  }

  if (updatedItems.imageURLs) {
    percentage += 10;
  }

  console.log("COMPUTED PERCENTAGE =  " + percentage);

  return percentage;
};

exports.getCurrentTimeInHHMMFormat = () => {
  const currentDate = new Date();
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const currentTime = `${hours}:${minutes}`;
  return currentTime;
};

exports.getFormattedDate = (dateString) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();
  return `${month} ${dayOfMonth}, ${year}`;
};

exports.getTimeAgoFromDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (diff < minute) {
    return "just now";
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diff < week) {
    const days = Math.floor(diff / day);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (diff < month) {
    const weeks = Math.floor(diff / week);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (diff < year) {
    const months = Math.floor(diff / month);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(diff / year);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
};
