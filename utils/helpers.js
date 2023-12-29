module.exports = {
  format_date: (date) => {
    // format date as Month DD, YYYY
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  },
};
