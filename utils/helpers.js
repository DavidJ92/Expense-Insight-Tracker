module.exports = {
  format_date: (date) => {
    return new Date().toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },
};
