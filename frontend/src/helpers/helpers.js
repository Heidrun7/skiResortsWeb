// Convert integer weekday value to day name in Icelandic
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

// Convert integer month value to month name in Icelandic
export function getMonthString(monthInt) {
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

export function getConditionsValue(conditionsString) {
  let conditions;
  // Use Fibonacci sequence to assign values to weather conditions
  if (conditionsString === "sunny" || conditionsString === "clear") {
    conditions = 0;
  } else if (
    conditionsString === "mostlycloudy" ||
    conditionsString === "partlycloudy"
  ) {
    conditions = 1;
  } else if (conditionsString === "cloudy") {
    conditions = 2;
  } else if (conditionsString === "chanceflurries") {
    conditions = 3;
  } else if (conditionsString === "chancesnow") {
    conditions = 3;
  } else if (conditionsString === "snow") {
    conditions = 5;
  } else if (conditionsString === "rain") {
    conditions = 8;
  } else if (conditionsString === "fog") {
    conditions = 13;
  } else {
    conditions = 21; // If unknown/new conditions sign
  }
  return conditions;
}

// Find the best resort or day of week
export function findBest(array, type) {
  let currBest = [1000, 1000, 1000, 0]; // [weatherSum, conditions, wind, arrayPosition of day in weatherArray]

  array.forEach(function (arrayItem) {
    var conditions;
    var wind;
    if (type === "week") {
      // If the page calling the function is BestThisWeek
      conditions = getConditionsValue(arrayItem.merki); // Is it sunny, rain etc?
      wind = Number(arrayItem.f10.toFixed(0));
    } else if (type === "resort") {
      // If the page calling the function is BestToday
      conditions = getConditionsValue(arrayItem[0].merki); // Is it sunny, rain etc?
      wind = Number(arrayItem[0].f10.toFixed(0));
    }

    var weatherSum = conditions + wind;

    // If the conditions are better
    if (currBest[0] > weatherSum) {
      currBest = [weatherSum, conditions, wind, array.indexOf(arrayItem)];
    } // Else keep the current best day
  });
  return currBest;
}
