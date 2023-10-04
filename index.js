document.getElementById("send").addEventListener("click", function(){
  var dataY = document.querySelector(".dataY");
  var dataM = document.querySelector(".dataM");
  var dataD = document.querySelector(".dataD");

  var dayInput = document.getElementById("day");
  var monthInput = document.getElementById("month");
  var yearInput = document.getElementById("year");

  var dayValue = document.getElementById("day").value.trim();  
  var monthValue = document.getElementById("month").value.trim();
  var yearValue = document.getElementById("year").value.trim();

  var errorDay = document.getElementById("errorDay");
  var errorMonth = document.getElementById("errorMonth");
  var errorYear = document.getElementById("errorYear");

  // Verificar si los campos están vacíos
  if (dayValue === "") {
    errorDay.textContent = "This field is required";
    errorDay.style.display = "block";
    dayInput.classList.add("campo_invalido");
    labelDay.style.color = "red";
  } else {
    errorDay.style.display = "none";
    dayInput.classList.remove("campo_invalido");
    labelDay.style.color = "";
  }

  if (monthValue === "") {
    errorMonth.textContent = "This field is required";
    errorMonth.style.display = "block";
    monthInput.classList.add("campo_invalido");
    labelDay.style.color = "red";
    

  } else {
    errorMonth.style.display = "none";
    monthInput.classList.remove("campo_invalido");
    labelDay.style.color = "";
  }

  if (yearValue === "") {
    errorYear.textContent = "This field is required";
    errorYear.style.display = "block";
    yearInputInput.classList.add("campo_invalido");
    labelDay.style.color = "red";

  } else {
    errorYear.style.display = "none";
    yearInput.classList.remove("campo_invalido");
    labelDay.style.color = "";
  }

  // Si los campos no están vacíos, realizar validaciones adicionales
  if (errorDay.style.display === "none" && errorMonth.style.display === "none" && errorYear.style.display === "none") {
    var fechaNacimiento = new Date(parseInt(yearValue), parseInt(monthValue) - 1, parseInt(dayValue));

    // Validar día
    if (parseInt(dayValue) < 1 || parseInt(dayValue) > 31) {
      errorDay.textContent = "Must be a valid day";
      errorDay.style.display = "block";
    }

    // Validar mes
    if (parseInt(monthValue) < 1 || parseInt(monthValue) > 12) {
      errorMonth.textContent = "Must be a valid month";
      errorMonth.style.display = "block";
    }

    // Validar año
    var añoActual = new Date().getFullYear();
    if (parseInt(yearValue) > añoActual || parseInt(yearValue) < (añoActual - 120)) {
      errorYear.textContent = "Must be in the past";
      errorYear.style.display = "block";
    }

    // Si no hay errores, calcular edad
    if (errorDay.style.display === "none" && errorMonth.style.display === "none" && errorYear.style.display === "none") {
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
