function calculatePace() {
  // Get input values
  const timeInput = document.getElementById("timeInput").value;
  const distanceInputValue = parseFloat(
    document.getElementById("distanceInput").value
  );
  const unitSelectValue = document.getElementById("unitSelect").value;
  const eventSelectValue = document.getElementById("eventSelect").value;

  const eventSelect = document.getElementById("eventSelect");
  const distanceInput = document.getElementById("distanceInput");
  const unitSelect = document.getElementById("unitSelect");

  const selectedEvent = eventSelect.value;
  const eventDistances = {
    "5k": 5,
    "10k": 10,
    halfMarathon: 21.0975, // Half marathon in kilometers
    marathon: 42.195, // Marathon in kilometers
  };

  if (selectedEvent in eventDistances) {
    distanceInput.value = eventDistances[selectedEvent];
    unitSelect.value = "km"; // Default to kilometers
  } else {
    distanceInput.value = "";
    unitSelect.value = "";
  }
  // If distance is provided, use it; otherwise, use the event distance
  const distance = distanceInputValue || getEventDistance(eventSelectValue);

  // Convert time to seconds
  const timeInSeconds = convertTimeToSeconds(timeInput);

  // Calculate pace
  const paceInSeconds = timeInSeconds / distance;

  // Convert pace back to time format
  const paceFormatted = convertSecondsToTime(paceInSeconds);

  // Display result
  const resultElement = document.getElementById("result");
  resultElement.textContent = ` ${paceFormatted} per ${unitSelectValue}.`;
}

function getEventDistance(eventSelect) {
  // Define distances for each event
  const eventDistances = {
    "5k": 5,
    "10k": 10,
    halfMarathon: 21.0975, // Half marathon in kilometers
    marathon: 42.195, // Marathon in kilometers
  };

  return eventDistances[eventSelect] || 0; // Default to 0 if the event is not found
}

function convertTimeToSeconds(time) {
  const parts = time.split(":");
  return parts[0] * 3600 + parts[1] * 60 + parts[2] * 1;
}

function convertSecondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours > 0 ? hours:"" } ${hours > 0 ? "Hrs":"" } ${String(minutes)} min. `;
}

// bmi

function updateTextFI(radio) {
  // Get the selected value
  var selectedValue = radio.value;
  console.log(selectedValue);
  // Get the result div
  // var resultDiv = document.getElementById("heightFeet");
  const heightFeet = document.getElementById("heightFeet");
  const heightInches = document.getElementById("heightInches");
  const heightInchHide = document.getElementsByClassName("height-inch-hide");
  const heightCss = document.getElementsByClassName("height-css");

  // Update the text in the result div based on the selected value
  if (selectedValue === "english") {
    heightFeet.innerHTML = "Ft";
    heightInches.innerHTML = "In";
    heightInchHide[0].style.display = "block";
    heightCss[0].classList.add("col-md-6");
    heightCss[0].classList.remove("col-md-12");
  } else {
    // Switch to English units
    heightFeet.innerHTML = "cm";
    heightInches.innerText = "cm";
    heightInchHide[0].style.display = "none";
    heightCss[0].classList.add("col-md-12");
    heightCss[0].classList.remove("col-md-6");
  }
}
// BMR
function updateTextF(radio) {
  // Get the selected value
  var selectedValue = radio.value;
  console.log(selectedValue);
  // Get the result div
  // var resultDiv = document.getElementById("heightFeet");
  const heightFeet = document.getElementById("heightFeet");
  const heightInches = document.getElementsByClassName("height-inch-hide");
  const heightCss = document.getElementsByClassName("height-css");
  // Update the text in the result div based on the selected value
  if (selectedValue === "english") {
    heightFeet.innerHTML = "Ft";
    heightInches[0].style.display = "block";
    heightCss[0].classList.add("col-md-6");
    heightCss[0].classList.remove("col-md-12");
    // heightInches.innerHTML = "In";
  } else {
    // Switch to English units
    heightFeet.innerHTML = "cm";
    heightInches[0].style.display = "none";
    heightCss[0].classList.add("col-md-12");
    heightCss[0].classList.remove("col-md-6");
    // heightInches.innerText = "cm";
  }
}

function calculateBMI(event) {
  // event.preventDefault();
  const unitSystem = document.querySelector(
    'input[name="unitSystem"]:checked'
  ).value;
  const age = parseFloat(document.getElementById("age").value);
  const weight = parseFloat(document.getElementById("weight").value);
  console.log(age);
  let heightInMeters;
  let weightInKg;
  if (unitSystem === "english") {
    const heightFeet = parseFloat(
      document.getElementById("heightFeetinput").value
    );
    const heightInches =
      parseFloat(document.getElementById("heightInchesinput").value) | 0;
    heightInMeters = heightFeet * 0.3048 + heightInches * 0.0254;
    weightInKg = weight * 0.453592; // Convert pounds to kilograms
  } else {
    const heightFeet = parseFloat(
      document.getElementById("heightFeetinput").value
    );
    
    heightInMeters = heightFeet / 100;
    weightInKg = weight; // Weight is already in kilograms
  }
  console.log("age", age, weight, "heightInMeters", heightInMeters);
  if (isNaN(age) || isNaN(weight) || isNaN(heightInMeters)) {
    alert("Please enter  valid values.");

    return;
  }

  // Calculate BMI
  const bmi = weightInKg / (heightInMeters * heightInMeters);
  console.log(bmi);
  // Display result
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = `${bmi.toFixed(2)} kg/m2 <br>`;
  resultElement.innerHTML += `(${getBMICategory(bmi)})`;
}

function getBMICategory(bmi) {
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return "Normal ";
  } else if (bmi >= 25 && bmi < 29.9) {
    return "Overweight";
  } else {
    return "Obese";
  }
}

// BMR calculator
function calculateBMR() {
  const unitSystem = document.querySelector(
    'input[name="unitSystem"]:checked'
  ).value;
  const age = parseFloat(document.getElementById("age").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const gender = document.querySelector('input[name="gender"]:checked').value;
  console.log(unitSystem, age, weight, gender);
  let heightInMeters;
  let weightInKg;
  if (unitSystem === "english") {
    const heightFeet = parseFloat(
      document.getElementById("heightFeetinput").value
    );
    const heightInches = parseFloat(document.getElementById('heightInchesinput').value)|0;
    heightInMeters = heightFeet * 0.3048 + heightInches * 0.0254;
    weightInKg = weight * 0.453592; // Convert pounds to kilograms
  } else {
    // const heightMeters = parseFloat(document.getElementById('heightFeetinput').value);
    const heightCentimeters = parseFloat(
      document.getElementById("heightFeetinput").value
    );
    heightInMeters = heightCentimeters / 100;
    weightInKg = weight; // Weight is already in kilograms
  }

  // Calculate BMR based on Mifflin-St Jeor Equation
  let bmr;
  if (gender === "male") {
    bmr = 10 * weightInKg + 6.25 * heightInMeters * 100 - 5 * age + 5;
  } else {
    bmr = 10 * weightInKg + 6.25 * heightInMeters * 100 - 5 * age - 161;
  }
  if (isNaN(age) || isNaN(weight) || isNaN(weightInKg)) {
    alert("Please enter  valid values.");

    return;
  }

  // Display result
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = ` ${bmr.toFixed(2)} calories per day`;
}

// body fat

function updateHip(radio) {
  // Get the selected value
  var selectedValue = radio.value;
  console.log(selectedValue);
  const hipHide = document.getElementsByClassName("hipHide");

  if (selectedValue === "female") {
    hipHide[0].classList.remove("d-none");
    hipHide[1].classList.remove("d-none");
  }else{
    hipHide[0].classList.add("d-none");
    hipHide[1].classList.add("d-none");
  }
}
function updateTextBodyFat(radio) {
  // Get the selected value
  var selectedValue = radio.value;
  console.log(selectedValue);
  // Get the result div
  const heightFeet = document.getElementById("heightFeet");
  const heightFeetMetric = document.getElementById("heightFeetMetric");
  const weightUnit = document.getElementById("weightUnit");
  const weightUnitMetric = document.getElementById("weightUnitMetric");
  const neckLabelFt = document.getElementById("neckLabelFt");
  const neckLabelIn = document.getElementById("neckLabelIn");
  const neckLabelMetric = document.getElementById("neckLabelMetric");
  const waistLabelFt = document.getElementById("waistLabelFt");
  const waistLabelIn = document.getElementById("waistLabelIn");
  const waistLabelMetric = document.getElementById("waistLabelMetric");
  const hipLabelFt = document.getElementById("hipLabelFt");
  const hipLabelIn = document.getElementById("hipLabelIn");
  const hipLabelMetric = document.getElementById("hipLabelMetric");
  const lowerDivMetric = document.getElementById("body-fat-div-metric");
  const lowerDivEnglish = document.getElementById("body-fat-div-english");
  if (selectedValue === "english") {
    heightFeet.innerHTML = "Ft";
    weightUnit.innerHTML = "Lb";
    neckLabelFt.innerHTML = "Ft";
    neckLabelIn.innerHTML = "In";
    waistLabelFt.innerHTML = "Ft";
    waistLabelIn.innerHTML = "In";
    hipLabelFt.innerHTML = "Ft";
    hipLabelIn.innerHTML = "In";
    // lowerDivMetric.style.display = "none";
    lowerDivMetric.classList.add("d-none");

    // lowerDivEnglish.style.display = "block";
    lowerDivEnglish.classList.remove("d-none");

  } else {
    heightFeetMetric.innerHTML = "cm";
    weightUnitMetric.innerHTML = "kg";
    neckLabelMetric.innerHTML = "cm";
    waistLabelMetric.innerHTML = "cm";
    hipLabelMetric.innerHTML = "cm";
    lowerDivMetric.classList.remove("d-none");
    lowerDivEnglish.classList.add("d-none");
  }
}

function calculateBodyFat() {
  const unitSystem = document.querySelector(
    'input[name="unitSystem"]:checked'
  ).value;
  const gender = document.querySelector('input[name="gender"]:checked').value ;
  const age = parseFloat(document.getElementById("age").value) | 0;
  const ageMetric = parseFloat(document.getElementById("ageMetric").value) | 0;
  const weight = parseFloat(document.getElementById("weight").value) | 0 | 0;
  const weightMetric = parseFloat(document.getElementById("weightMetric").value) | 0;
  const neckFt = parseFloat(document.getElementById("neckFt").value) | 0;
  const neckIn = parseFloat(document.getElementById("neckIn").value) | 0;
  const neckMetric = parseFloat(document.getElementById("neckMetric").value) | 0;
  const waistFt = parseFloat(document.getElementById("waistFt").value) | 0;
  const waistIn = parseFloat(document.getElementById("waistIn").value) | 0;
  const waistMetric = parseFloat(document.getElementById("waistMetric").value) | 0;
  const hipFt = parseFloat(document.getElementById("hipFt").value) | 0;
  const hipIn = parseFloat(document.getElementById("hipIn").value) | 0;
  const hipMetric = parseFloat(document.getElementById("hipMetric").value) | 0;
    console.log(gender,ageMetric,age,"gender,ageMetric,age");
  let heightInMeters;
  let weightInKg, neckInMeters, waistInMeters, hipInMeters, ageFinal;
  if (unitSystem === "english") {
    const heightFeetinput = parseFloat(
      document.getElementById("heightFeetinput").value
    ) | 0;
    const heightInchinput = parseFloat(
      document.getElementById("heightInchinput").value
    ) | 0;
    // heightInMeters = heightFeet * 0.3048 * 100;
    heightInMeters = (heightFeetinput * 12 + heightInchinput) * 0.0254;
    neckInMeters = (neckFt * 12 + neckIn) * 0.0254;
    waistInMeters = (waistFt * 12 + waistIn) * 0.0254;
    hipInMeters =  (hipFt * 12 + hipIn) * 0.0254;
    weightInKg = weight * 0.453592; // Convert pounds to kilograms
    ageFinal = age;
  } else {
    const heightCentimeters = parseFloat(
      document.getElementById("heightFeetinputMetric").value
    ) | 0;
    heightInMeters = heightCentimeters/100;
    neckInMeters = neckMetric/100;
    waistInMeters = waistMetric/100;
    hipInMeters = hipMetric/100;
    weightInKg = weightMetric; // Weight is already in kilograms
    ageFinal = ageMetric;
  }

  // Calculate Body Fat Percentage using the US Navy formula
  const bodyFatPercentage = calculateUSNavyBodyFat(
    gender,
    ageFinal,
    weightInKg,
    heightInMeters* 39.3701,
    neckInMeters* 39.3701,
    waistInMeters* 39.3701,
    hipInMeters* 39.3701
  );

  // Display result
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = ` ${bodyFatPercentage.toFixed(
    2
  )}%`;
}
// https://www.healthifyme.com/blog/body-fat-calculator/
function calculateUSNavyBodyFat(gender, age, weight, height, neck, waist, hip) {
  console.log(gender, age, weight, height, neck, waist, hip,"gender, age, weight, height, neck, waist, hip");
  let bodyFatPercentage;
  if (gender === "male") {
    bodyFatPercentage = 86.01 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    //  bodyFatPercentage = 4951.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height) - 450;
  } else {
    bodyFatPercentage =163.205 * Math.log10(waist + hip - neck) -97.684 * Math.log10(height) - 78.387;
    // bodyFatPercentage = 4951.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height) - 450;
    }
  return bodyFatPercentage;
}

// calculate Calories
// bmi

function updateTextCalories(radio) {
  // Get the selected value
  var selectedValue = radio.value;
  console.log(selectedValue);
  // Get the result div
  // var resultDiv = document.getElementById("heightFeet");
  const heightFeet = document.getElementById("heightFeet");
  const heightInches = document.getElementById("heightInches");
  const heightInchHide = document.getElementsByClassName("height-inch-hide");
  const heightCss = document.getElementsByClassName("height-css");

  // Update the text in the result div based on the selected value
  if (selectedValue === "english") {
    heightFeet.innerHTML = "Ft";
    heightInches.innerHTML = "In";
    heightInchHide[0].style.display = "block";
    heightCss[0].classList.add("col-md-6");
    heightCss[0].classList.remove("col-md-12");
  } else {
    // Switch to English units
    heightFeet.innerHTML = "cm";
    heightInches.innerText = "cm";
    heightInchHide[0].style.display = "none";
    heightCss[0].classList.add("col-md-12");
    heightCss[0].classList.remove("col-md-6");
  }
}
function calculateCalories() {
  const unitSystem = document.querySelector(
    'input[name="unitSystem"]:checked'
  ).value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const age = parseInt(document.getElementById("age").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const heightFeetinput = parseFloat(document.getElementById("heightFeetinput").value);
  const heightInchesinput = parseFloat(document.getElementById("heightInchesinput").value);
  const activityLevel = document.getElementById("activity").value;
  console.log(unitSystem, gender, age, weight, activityLevel);
  let heightInMeters;
  let weightInKg;
  if (unitSystem === "english") {
    heightInMeters = ((heightFeetinput * 12) + heightInchesinput) * 0.0254;
    weightInKg = weight * 0.453592; // Convert pounds to kilograms
  } else {
    heightInMeters = heightFeetinput / 100;
    weightInKg = weight; // Weight is already in kilograms
  }
  console.log(heightInMeters,"heightInMeters");
  // Calculate BMR using the Mifflin-St Jeor Equation
  let bmr;
  if (gender === "male") {
    bmr = 10 * weightInKg + 6.25 * heightInMeters * 100 - 5 * age + 5;
  } else {
    bmr = 10 * weightInKg + 6.25 * heightInMeters * 100 - 5 * age - 161;
  }

  // Calculate TDEE based on activity level
  let tdee;
  switch (activityLevel) {
    case "sedentary":
      tdee = bmr * 1.2;
      break;
    case "lightlyActive":
      tdee = bmr * 1.375;
      break;
    case "moderatelyActive":
      tdee = bmr * 1.55;
      break;
    case "veryActive":
      tdee = bmr * 1.725;
      break;
    case "superActive":
      tdee = bmr * 1.9;
      break;
    default:
      tdee = bmr;
  }

  // Display result
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = ` ${tdee.toFixed(
    2
  )} calories per day`;
}

// calories burned
function calculateCaloriesBurned() {
  // Get values from the form
  const unitSystem = document.querySelector(
    'input[name="unitSystem"]:checked'
  ).value;
  const activity = document.getElementById("activity").value;
  const hours = parseFloat(document.getElementById("hours").value | 0);
  const minutes = parseFloat(document.getElementById("minutes").value | 0);
  const age = parseFloat(document.getElementById("age").value | 0);
  const weight = parseFloat(document.getElementById("weight").value | 0);
  const weightUnit =
    document.getElementById("weightUnit").value === "kg" ? 1 : 0.453592; // Convert lbs to kg
  const distance = parseFloat(document.getElementById("distance").value);
  const distanceUnit =
    document.getElementById("distanceUnit").value === "km" ? 1.60934 : 1; // Convert miles to km
  const pace = parseFloat(document.getElementById("pace").value);
  const paceUnit =
    document.getElementById("paceUnit").value === "min/km" ? 1.60934 : 1; // Convert min/mile to min/km

  // Determine if distance is provided
  // const isDistanceProvided = !isNaN(distance) && !isNaN(pace);

  // Calculate calories burned based on input

  const caloriesBurned =
    unitSystem === "Distance"
      ? calculateCaloriesByDistance(
          activity,
          age,
          weight * weightUnit,
          distance * distanceUnit,
          pace * paceUnit
        )
      : calculateCaloriesByDuration(
          activity,
          hours,
          minutes,
          age,
          weight * weightUnit
        );

  // Display the result
  document.getElementById("result").innerHTML = ` ${caloriesBurned.toFixed(
    2
  )} calories`;
}

function calculateCaloriesByDistance(activity, age, weight, distance, pace) {
  // Simplified formula, actual calculations may vary
  const MET = getMETForActivity(activity);
  const totalMinutes = distance * pace;
  const caloriesBurned = ((MET * weight * 3.5) / 200) * totalMinutes;
  console.log(calculateCaloriesByDistance);
  return caloriesBurned;
}

function calculateCaloriesByDuration(activity, hours, minutes, age, weight) {
  // Simplified formula, actual calculations may vary
  const MET = getMETForActivity(activity);
  const totalMinutes = (hours ??= 0) * 60 + minutes;
  console.log("calculateCaloriesByDuration");
  console.log(totalMinutes);
  console.log("hours??=0", hours, "MET", MET);
  console.log(minutes);
  console.log(activity);
  const caloriesBurned = ((MET * weight * 3.5) / 200) * totalMinutes;

  return caloriesBurned;
}

function getMETForActivity(activity) {
  // MET values for different activities (simplified values)
  const METValues = {
    running: 9.8,
    cycling: 8.0,
    jogging: 7.0,
    jumping: 10,
    yoga: 3,
    // Add more activities as needed
  };

  return METValues[activity] || 1.0; // Default to 1.0 if MET value is not found
}

function toggleDuration(radio) {
  // Get the selected value
  var selectedValue = radio.value;
  console.log(selectedValue);
  // Get the result div
  const pace = document.getElementsByClassName("pace-tohide");
  const distance = document.getElementsByClassName("distance-tohide");
  const duration = document.getElementsByClassName("duration-tohide");
  const age = document.getElementById("age-box");
  console.log(pace, distance);
  // const distance = document.getElementsByClassName("distance-tohide");

  if (selectedValue === "Duration") {
    pace[0].style.display = "none";
    pace[1].style.display = "none";
    distance[0].style.display = "none";
    distance[1].style.display = "none";
    duration[0].style.display = "block";
    duration[1].style.display = "block";
    age.classList.add("col-lg-4");
    age.classList.remove("col-lg-12");
  } else {
    pace[0].style.display = "block";
    pace[1].style.display = "block";
    distance[0].style.display = "block";
    distance[1].style.display = "block";
    duration[0].style.display = "none";
    duration[1].style.display = "none";
    age.classList.add("col-lg-12");
    age.classList.remove("col-lg-4");
  }
}

// lean body mass
function updateTextLBM(radio) {
  // Get the selected value
  var selectedValue = radio.value;
  console.log(selectedValue);
  // Get the result div
  const heightFeet = document.getElementById("heightFeet");
  const weightUnit = document.getElementById("weightUnit");
  const heightInch = document.getElementById("height-inch-hide");
  const heightCss = document.getElementsByClassName("height-css");
  const weightCss = document.getElementsByClassName("weight-css");

  if (selectedValue === "english") {
    heightFeet.innerHTML = "Ft";
    weightUnit.innerHTML = "Lb";
    heightInch.style.display = "block";
    heightCss[0].classList.add("col-md-4");
    weightCss[0].classList.add("col-md-4");
    heightCss[0].classList.remove("col-md-6");
    weightCss[0].classList.remove("col-md-6");
  } else {
    heightFeet.innerHTML = "cm";
    weightUnit.innerHTML = "kg";
    heightInch.style.display = "none";
    heightCss[0].classList.add("col-md-6");
    weightCss[0].classList.add("col-md-6");
    heightCss[0].classList.remove("col-md-4");
    weightCss[0].classList.remove("col-md-4");
  }
}
function calculateLBM() {
  const unitSystem = document.querySelector(
    'input[name="unitSystem"]:checked'
  ).value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const formula = document.getElementById("formula").value;
  const heightFeet = parseFloat(document.getElementById("heightF").value);
  const heightInch = parseFloat(document.getElementById("heightI").value) | 0;
  let weight = parseFloat(document.getElementById("weight").value);
  let height;
  console.log("heightInch", heightInch);
  if (unitSystem === "english") {
    weight = weight * 0.453592;
    height = heightFeet * 30.48 + heightInch * 2.54;
  } else {
    height = heightFeet;
  }
  console.log("heightFeet", heightFeet);
  console.log("weight", weight);
  console.log("height", height);
  let lbm;

  if (formula === "boer") {
    lbm =
      gender === "male"
        ? 0.407 * weight + 0.267 * height - 19.2
        : 0.252 * weight + 0.473 * height - 48.3;
  } else if (formula === "james") {
    lbm =
      gender === "male"
        ? 1.1 * weight - 128 * Math.pow(weight / height, 2)
        : 1.07 * weight - 148 * Math.pow(weight / height, 2);
  } else if (formula === "hume") {
    lbm =
      gender === "male"
        ? 0.3281 * weight + 0.33929 * height - 29.5336
        : 0.29569 * weight + 0.41813 * height - 43.2933;
  }

  if (unitSystem === "english") {
    lbm = (lbm * 2.205) .toFixed(2);    
    document.getElementById("result").innerHTML = `${lbm} lbs`;
  } else{
    lbm = lbm  .toFixed(2);    
    document.getElementById("result").innerHTML = `${lbm} kg`;

  }
}

// Ideal Weight Calculator

function updateTextHW(radio) {
  // Get the selected value
  var selectedValue = radio.value;
  console.log(selectedValue);
  // Get the result div
  const heightFeet = document.getElementById("heightFeet");
  const heightInch = document.getElementById("height-inch-hide");
  const heightCss = document.getElementsByClassName("height-css");

  if (selectedValue === "english") {
    heightFeet.innerHTML = "Ft";
    heightInch.style.display = "block";
    heightCss[0].classList.add("col-md-6");
    heightCss[0].classList.remove("col-md-12");
  } else {
    heightFeet.innerHTML = "cm";
    heightInch.style.display = "none";
    heightCss[0].classList.add("col-md-12");
    heightCss[0].classList.remove("col-md-6");
  }
}

function calculateIdealWeight() {
  const unitSystem = document.querySelector(
    'input[name="unitSystem"]:checked'
  ).value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const heightFeet = parseFloat(document.getElementById("heightF").value);
  const heightInch = parseFloat(document.getElementById("heightI").value) | 0;
  let height;

  if (unitSystem === "english") {
    height = heightFeet * 30.48 + heightInch * 2.54; // Convert feet and inches to cm
  } else {
    height = heightFeet; // Convert feet and inches to cm
  }
  if (isNaN(height) || height <= 0) {
    alert("Please enter a valid height.");
    return;
  }

  let idealWeight;

  if (gender === "male") {
    idealWeight = 22 * Math.pow(height / 100, 2);
  } else {
    idealWeight = 21 * Math.pow(height / 100, 2);
  }

  if (unitSystem === "english") {
    document.getElementById("result").innerHTML = `${(idealWeight* 2.205).toFixed(2)} lbs`;
  } else{
    document.getElementById("result").innerHTML = ` ${idealWeight.toFixed(2)} kg`;
  }
}
