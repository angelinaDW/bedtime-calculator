const wakeUpTimeUI = document.getElementById('wakeUpTime');
const hoursOfSleepUI = document.getElementById("hoursOfSleepUI");

console.log(wakeUpTimeUI);
console.log(hoursOfSleepUI);
wakeUpTimeUI.addEventListener('change', onFormChanged);
hoursOfSleepUI.addEventListener('change', onFormChanged);

const timeD = document.getElementById("timeD");
function onFormChanged(event)
{
  console.log("Form changed!")
  let wakeUpTimeStr = wakeUpTimeUI.value;
  let hoursOfSleepStr = hoursOfSleepUI.value;
  console.log(`hoursOfSleep:${hoursOfSleepStr} wakeUpTime:${wakeUpTimeStr}`);
  
  let bt = getBedtime(hoursOfSleepStr, wakeUpTimeStr);
  
  console.log(bt);
  timeD.innerHTML = twentyFourHourToTwelveHour(bt);

}

function twentyFourHourToTwelveHour(twentyFour)
{
  // twentyFour should be a string in the form 00:00
  if (twentyFour.substring(0, 2).includes(":"))
    {
      twentyFour = padZeroes(twentyFour.substring(0,1)).toString() + twentyFour.substring(1)
    }
  console.log(`twentyFour: ${twentyFour}`);
  let ampm = "";
  let h = parseInt(twentyFour.substring(0, 2));
  if (h < 12)
    {
      if (h == 0) { h = 12; }
      // else h remains unchanged
      ampm = "AM";
    }
  else
    {
      ampm = "PM";
      if (h != 12) { h = h - 12; }
    }
  return padZeroes(h.toString()) + twentyFour.substring(2) + " " + ampm;
}

function padZeroes(s)
{
  if (s.length == 1) { s = "0" + s;}
  return s;
}
// Note: assumes wakeUpTime is given in 4 hour time
// Gives back bedtime in 24 hour time
function getBedtime(hoursOfSleep, wakeUpTimeStr)
{
  //hoursOfSleep = toString(hoursOfSleep);
  //wakeUpTimeStr = toString(wakeUpTimeStr);
  console.log(`hoursOfSleep: ${hoursOfSleep}`);
    if (isWhole(hoursOfSleep))
    {
      console.log("here");
      let hour = parseInt(wakeUpTimeStr.substring(0, 2)) - parseInt(hoursOfSleep);
      // This might be a negative number...we should handle that case
      console.log(hour);
      if (hour < 0)
        { hour = 24 + parseInt(hour)}
      
      return hour.toString() + wakeUpTimeStr.substring(2);
    }
  else // If we are dealing with a non-whole number of hours...
    {
      console.log("not here");
      // Split into hours and minutes
      let sleepHours = (Math.trunc(hoursOfSleep));
      let sleepMin = 60 * (hoursOfSleep - sleepHours)
      console.log(`sleepHours: ${sleepHours} sleepMin: ${sleepMin}`);
      let wakeHours = parseInt(wakeUpTimeStr.substring(0, 2));
      let wakeMin = parseInt(wakeUpTimeStr.substring(3));
      
      let h = wakeHours - sleepHours;
      console.log(`h: ${h}`)
      if (h < 0) { h = 24 + h}
      let m =  wakeMin - sleepMin;
      console.log(`m: ${m}`)
      if (m < 0) { 
        m = 60 + m;
        h -= 1;
      }
      // This should be tested, I am not entirely confident that it will work
      h = h.toString();
      if (h.length == 1) { h = "0" + h;}
      m = m.toString();
      if (m.length == 1) { m = "0" + m;}
      return h + ":" + m;
    }
}
// This should be robust enough to handle floating point hoursOfSleep
// Let's assume both hoursOfSleep and wakeUpTime are initially strings
function isWhole(n)
{
   var result = (n - Math.floor(n)) !== 0; 
   
  if (result)
    return false;
   else
     return true;
  }