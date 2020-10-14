export default function getWeekday(weekdayInt) {
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
