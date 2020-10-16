# Introduction
SkiResorts is a React web application that displays weather forecasting information for ski resorts in Iceland to aid the user in two purposes:
    1. Hunting down the best skiing weather in the country that day
    2. Finding the potential best skiing day in the next 7 days for a chosen resort.
The forecasting data is collected from the website [blika.is](https://www.blika.is "Blika").


# Calculations

The best skiing weather is found by considering multiple factors.
1. Conditions
    - sunny = 0 points
    - clear = 0 points
    - mostlycloudy = 1 points
    - partlycloudy = 1 points
    - cloudy = 2 point
    - chanceflurries = 4 points;
    - chancesnow = 5 points
    - snow = 7 points
    - rain = 9 points
    - fog = 11 points
    - other/unknown = 13 points
2. Wind speed \
    If two or more resorts/days are tied after the conditions have been checked, the one with the lowest wind speed will be chosen as the best. 
    <!-- If the wind speed is above 10 m/s there is no good skiing day. -->
<!-- 3. Temperature -->


<!-- If there is a tie, the first day is shown to minimize the likelihood of missing a good skiing day. -->

# Example response
The response from https://api.blika.is/GetBlikaForecast24klst/988/ is an array of objects where each object contains weather forecasting data for a single day:
<pre><code>
{ 
    dags_spar: "2020-10-04T19:00:00.000Z",
    dtexti: "sv",
    f10: 0.9231799245,
    merki: "cloudy",
    nafn: "Hlíðarfjall",
    r: 0.0000392034,
    slp: 1003.4985961914,
    stodid: 988,
    t2: 1.8557067871,
}
</pre></code>


# Possible additions:
- Choose which day to compare all the resorts
