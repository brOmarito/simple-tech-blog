module.exports = {
    format_datetime: (date) => {
      return date.toLocaleString("en-US", {timeZone: "America/New_York"});
    },
};
