//linia kodu spowalniająca animacje na stronie
document.getElementById("backgroundVid").playbackRate = 0.5;

//funkcja przeliczająca datę od dnia bieżącego + 14 dni, przekazuje wartość do HTML (wartość min) którą uniemożliwia 
//wybranie daty wcześniejszej za pomocą kaledarza 
let currentDate = new Date(Date.now() + 12096e5);
let currentDay, currentMonth, currentYear;
currentDay = currentDate.getDate();
currentMonth = currentDate.getMonth()+1;
currentYear = currentDate.getFullYear();
let myDate = `${currentYear}-0${currentMonth}-${currentDay}`;
let newDate = myDate;
document.getElementById("datePicker").min = myDate;
document.getElementById("datePicker").value = myDate;

//pobranie elementów HTML po id i przypisanie ich do stałych
const $Porsche = document.getElementById("Porsche");
const $Audi = document.getElementById("Audi");
const $BMW = document.getElementById("BMW");
const $Mercedes = document.getElementById("Mercedes");
const $Jaguar = document.getElementById("Jaguar");
const $Volvo = document.getElementById("Volvo");

//definicja zmiennych użytkownika zapisujących informacje w localStorage
let userString;
let userInLocalStorage;
//definicja uzytkownika zapisanego w localStorage

let storedUser = {
  firstName: "",
  lastName: "",
  street: "",
  number: "",
  zipCode: "",
  city: "",
  email: "",
  phone: "",
  date: "",
};

//definicja użytkownika i jego elementów w formie obiektu
let user = {
  firstName: "",
  lastName: "",
  street: "",
  number: "",
  zipCode: "",
  city: "",
  email: "",
  phone: "",
  date: "",
};
// Wyświetlenie informacji zapisanych w storedUser w formularzu z warunkiem wykonania jeśli są zapisane

userInLocalStorage = localStorage.getItem(storedUser); //wczytuje z local storage string
storedUser = JSON.parse(userInLocalStorage); // zamiana na tablice po zapisaniu w local storage

//funkcja która pobiera informacje o użytkowniku z localStorage i przypisauje je do odpowiednich pól w formularzu 
function locStorage() {
  userInLocalStorage = localStorage.getItem(storedUser); //wczytuje z local storage string
  storedUser = JSON.parse(userInLocalStorage); // zamiana na tablice po zapisaniu w local storage

  if (storedUser === null) {
    console.log("brak usera w localStorage");
  } else {
    document.getElementById("firstName").value = storedUser.firstName;
    document.getElementById("lastName").value = storedUser.lastName;
    document.getElementById("street").value = storedUser.street;
    document.getElementById("number").value = storedUser.number;
    document.getElementById("zipCode").value = storedUser.zipCode;
    document.getElementById("city").value = storedUser.city;
    document.getElementById("email").value = storedUser.email;
    document.getElementById("phone").value = storedUser.phone;
    document.getElementById("datePicker").value = storedUser.date
  }
}

const $optionBtn = document.getElementById("optionBtn");
const $summaryBtn = document.getElementById("summaryBtn");
let $carPrice = 0;
let $optionPrice = 0;
let $finalPrice = 0;

// funkcja która podczas wyboru auta zmienia widok strony oraz zapisuje w localstorage
function carPicker(car, desc) {
  let queryItem = `#`+ desc+ ` #carPrice`;
  car.addEventListener("click", () => {
    const sectionCars = document.querySelector(".sectionCars");
    sectionCars.style.display = "none";
    const sectionFormContainer = document.querySelector(".formContainer");
    sectionFormContainer.style.display = "flex";
    document.querySelector(".returnButton").style.display = "block";
    $carPrice = document.querySelector(queryItem).innerText;
    document.getElementById("selectedCar").innerHTML = document.getElementById(desc).innerHTML;
    locStorage();
  });
}

//wywołanie funkcji nasłuchiwania eventu wyboru auta i przejście do kolejnego widoku strony 
carPicker($Porsche, "Porsche");
carPicker($Audi, "Audi");
carPicker($BMW, "BMW");
carPicker($Mercedes, "Mercedes");
carPicker($Jaguar, "Jaguar");
carPicker($Volvo, "Volvo");

//działanie przycisku powrót do wyboru aut
const $returnBtn = document.getElementById("returnBtn");
$returnBtn.addEventListener("click", () => {
  document.querySelector(".sectionCars").style.display = "block";
  document.querySelector(".formContainer").style.display = "none";
  document.querySelector(".returnButton").style.display = "none";
});

let payMethod = "Gotówka";
let $payMethodRadio = document.querySelector("#cash");
let $OCinsuranceCheck = document.getElementById("OCinsurance");
let $ACinsuranceCheck = document.getElementById("ACinsurance");
let $ceramicCoatCheck = document.getElementById("ceramicCoat");

$optionBtn.addEventListener("click", () => {
  let OCinsurancePrice = 0;
  let ACinsurancePrice = 0;
  let ceramicCoatPrice = 0;

  if ($OCinsuranceCheck.checked) {
    OCinsurancePrice = 4.6;
  } else {
    OCinsurancePrice = 0;
  }
  if ($ACinsuranceCheck.checked) {
    ACinsurancePrice = 17.5;
  } else {
    ACinsurancePrice = 0;
  }
  if ($ceramicCoatCheck.checked) {
    ceramicCoatPrice = 6;
  } else {
    ceramicCoatPrice = 0;
  }

  $optionPrice = +OCinsurancePrice + ACinsurancePrice + ceramicCoatPrice;
  $carPrice = document.querySelector("#selectedCar #carPrice").innerText;
  $finalPrice = +$carPrice + $optionPrice;

  document.getElementById("optionsPrice").innerText = $optionPrice;
  document.getElementById("finalPrice").innerText = $finalPrice;
  document.querySelector(".button").style.display = "block";
});

$summaryBtn.addEventListener("click", () => {
  //zapisywanie informacji o metodzie płatności oraz zapisywanie wartości auta i opcji
  if ($payMethodRadio.checked) {
    payMethod = "Gotówka";
  } else {
    payMethod = "Leasing";
  }
  $carPrice = document.querySelector("#selectedCar #carPrice").innerText;
  $optionPrice = document.getElementById("optionsPrice").innerText;
  $finalPrice = document.getElementById("finalPrice").innerText;
  //pobieranie wartości z formularza i przypisywanie ich do odpowiednich kluczy w obiekcie user
  user.firstName = document.getElementById("firstName").value;
  user.lastName = document.getElementById("lastName").value;
  user.street = document.getElementById("street").value;
  user.number = document.getElementById("number").value;
  user.zipCode = document.getElementById("zipCode").value;
  user.city = document.getElementById("city").value;
  user.email = document.getElementById("email").value;
  user.phone = document.getElementById("phone").value;
  user.date = document.getElementById("datePicker").value;
  let validate;

  console.log(user);
  for (let [key, value] of Object.entries(user)) {
    if (`${value}` === "") {
      validate = true;
    }
  }
  //stała pobierajaca stylowanie dla klasy.warning
  const warningMes = document.querySelector(".warning");
  //warunek kiedy jakiekolwiek pole jest puste to pojawi się ostrzeżenie
  if (validate === true) {
    //pojawienie sie informacji o niewypełnionym w pełni formularzu z warunkiem (walidacja)
    warningMes.style.visibility = "visible";
  } else {
    warningMes.style.visibility = "hidden";
    document.querySelector(".formContainer").style.display = "none";
    document.querySelector(".button").style.display = "none";
    document.querySelector(".summaryContainer").style.display = "flex";
    document.querySelector(".returnButton").style.display = "none";
    document.querySelector(".clearButton").style.display = "block";
    document.getElementById("mainText").innerText = "Dziękujemy za zakup! oto podsumowanie!"

    storedUser;
    userString = JSON.stringify(user); //zamieniam tablice z userem na string przed zapisaniem w local storage
    localStorage.setItem(storedUser, userString); //zapisuje w local storage string
    document.getElementById("summaryCar").innerHTML = document.getElementById("selectedCar").innerHTML
    document.getElementById("payMethod").innerText = payMethod;
    document.getElementById("sumOptionsPrice").innerText = $optionPrice;
    document.getElementById("sumFinalPrice").innerText = $finalPrice;

    document.getElementById("sumFName").innerText = user.firstName;
    document.getElementById("sumLName").innerText = user.lastName;
    document.getElementById("sumStreet").innerText = user.street;
    document.getElementById("sumNumber").innerText = user.number;
    document.getElementById("sumZipCode").innerText = user.zipCode; 
    document.getElementById("sumCity").innerText = user.city;
    document.getElementById("sumEmail").innerText = user.email;
    document.getElementById("sumPhone").innerText = user.phone;
    document.getElementById("sumDate").innerText = user.date;
  }

});
// funkcja czyszcząca localStorage i przenosi użytkownika do strony głównej 
const $clearBtn = document.getElementById("clearBtn");
$clearBtn.addEventListener("click", () => {
  window.localStorage.clear(storedUser);
  window.location.href = "index.html";
});
