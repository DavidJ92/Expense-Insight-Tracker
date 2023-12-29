module.exports = {
  format_date: (date) => {
    // Format date as Month DD, YYYY
    return date.toLocaleDateString("en-US", {
      month: "long", // Full month name
      day: "numeric", // Day of the month
      year: "numeric", // Full year
    });
  },
};
