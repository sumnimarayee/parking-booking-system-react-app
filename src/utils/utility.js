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
