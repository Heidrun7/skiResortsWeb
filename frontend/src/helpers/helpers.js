export function getWeekday(weekdayInt) {
  let weekday = "";

  if (weekdayInt === 0) {
    weekday = "sunnudagur";
  } else if (weekdayInt === 1) {
    weekday = "mánudagur";
  } else if (weekdayInt === 2) {
    weekday = "þriðjudagur";
  } else if (weekdayInt === 3) {
    weekday = "miðvikudagur";
  } else if (weekdayInt === 4) {
    weekday = "fimmtudagur";
  } else if (weekdayInt === 5) {
    weekday = "föstudagur";
  } else if (weekdayInt === 6) {
    weekday = "laugardagur";
  }

  return weekday;
}

export function getMonthString(monthInt) {
  console.log("Monthint: ", monthInt);
  let month = "";

  if (monthInt === 0) {
    month = "janúar";
  } else if (monthInt === 1) {
    month = "febrúar";
  } else if (monthInt === 2) {
    month = "mars";
  } else if (monthInt === 3) {
    month = "apríl";
  } else if (monthInt === 4) {
    month = "maí";
  } else if (monthInt === 5) {
    month = "júní";
  } else if (monthInt === 6) {
    month = "júlí";
  } else if (monthInt === 7) {
    month = "ágúst";
  } else if (monthInt === 8) {
    month = "september";
  } else if (monthInt === 9) {
    month = "október";
  } else if (monthInt === 10) {
    month = "nóvember";
  } else if (monthInt === 11) {
    month = "desember";
  }
  return month;
}
