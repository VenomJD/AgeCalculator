document.getElementById("send").addEventListener("click", function(){
  var dataY = document.querySelector(".dataY");
  var dataM = document.querySelector(".dataM");
  var dataD = document.querySelector(".dataD");

  var dayInput = document.getElementById("day");
  var monthInput = document.getElementById("month");
  var yearInput = document.getElementById("year");

  var labelDay = document.getElementById("labelDay");
  var labelMonth = document.getElementById("labelMonth");
  var labelYear = document.getElementById("labelYear");

  var dayValue = document.getElementById("day").value.trim();  
  var monthValue = document.getElementById("month").value.trim();
  var yearValue = document.getElementById("year").value.trim();

  var errorDay = document.getElementById("errorDay");
  var errorMonth = document.getElementById("errorMonth");
  var errorYear = document.getElementById("errorYear");

  // Verificar si los campos están vacíos
  if (dayValue === "") {
    errorDay.style.opacity = "1";
    errorDay.textContent = "This field is required";
    dayInput.classList.add("campo_invalido");
    labelDay.style.color = "red";
  } else {
    errorDay.style.opacity = "0";
    dayInput.classList.remove("campo_invalido");
    labelDay.style.color = "";
  }

  if (monthValue === "") {
    errorMonth.textContent = "This field is required";
    errorMonth.style.opacity = "1";
    monthInput.classList.add("campo_invalido");
    labelMonth.style.color = "red";
    

  } else {
    errorMonth.style.opacity = "0";
    monthInput.classList.remove("campo_invalido");
    labelMonth.style.color = "";
  }

  if (yearValue === "") {
    errorYear.textContent = "This field is required";
    errorYear.style.opacity = "1";
    yearInput.classList.add("campo_invalido");
    labelYear.style.color = "red";

  } else {
    errorYear.style.opacity = "0";
    yearInput.classList.remove("campo_invalido");
    labelYear.style.color = "";
  }

  // Si los campos no están vacíos, realizar validaciones adicionales
  if (errorDay.style.opacity === "0" && errorMonth.style.opacity === "0" && errorYear.style.opacity === "0") {
    var fechaNacimiento = new Date(parseInt(yearValue), parseInt(monthValue) - 1, parseInt(dayValue));

    // Validar día
    if (parseInt(dayValue) < 1 || parseInt(dayValue) > 31) {
      errorDay.textContent = "Must be a valid day";
      errorDay.style.opacity = "1";
      dayInput.classList.add("campo_invalido");
      labelDay.style.color = "red";
    }

    // Validar mes
    if (parseInt(monthValue) < 1 || parseInt(monthValue) > 12) {
      errorMonth.textContent = "Must be a valid month";
      errorMonth.style.opacity = "1";
      monthInput.classList.add("campo_invalido");
      labelMonth.style.color = "red";
    }

    // Validar año
    var añoActual = new Date().getFullYear();
    if (parseInt(yearValue) > añoActual || parseInt(yearValue) < (añoActual - 120) || parseInt(yearValue) === (añoActual-1)) {
      errorYear.textContent = "Must be in the past";
      errorYear.style.opacity = "1";
      yearInput.classList.add("campo_invalido");
      labelYear.style.color = "red";
    }

    // Si no hay errores, calcular edad
    if (errorDay.style.opacity === "0" && errorMonth.style.opacity === "0" && errorYear.style.opacity === "0") {
      var edad = calcularEdad(fechaNacimiento);
      dataY.textContent = edad.anios;
      dataM.textContent = edad.meses;
      dataD.textContent = edad.dias;
    }
  } else {
    dataY.textContent = "--";
    dataM.textContent = "--";
    dataD.textContent = "--";
  }
});


function calcularEdad(fechaNacimiento) {
  var fechaActual = new Date();
  var añoActual = fechaActual.getFullYear();
  var mesActual = fechaActual.getMonth() + 1;
  var diaActual = fechaActual.getDate();

  var añoNacimiento = fechaNacimiento.getFullYear();
  var mesNacimiento = fechaNacimiento.getMonth() + 1;
  var diaNacimiento = fechaNacimiento.getDate();

  var edad = añoActual - añoNacimiento;

  if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
    edad--;
  }

  var meses = mesActual - mesNacimiento;
  if (meses <= 0) {
    meses += 12;
    edad--;
  }

  var dias = diaActual - diaNacimiento;
  if (dias < 0) {
    var ultimoDiaDelMesAnterior = new Date(añoActual, mesActual - 1, 0).getDate();
    dias += ultimoDiaDelMesAnterior;
    meses--;
  }

  return { anios: edad, meses: meses, dias: dias };
}
