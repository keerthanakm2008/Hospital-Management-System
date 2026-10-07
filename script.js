function registerPatient() {
    let name = document.getElementById("patientName").value;
    let phone = document.getElementById("phone").value;
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    let disease = document.getElementById("disease").value;
    let doctor = document.getElementById("doctor").value;

    alert(
        "Patient registered successfully!\n\n" +
        "Name: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "Age: " + age + "\n" +
        "Gender: " + gender + "\n" +
        "Disease: " + disease + "\n" +
        "Doctor: " + doctor
    );
}


function searchPatient() {
    let name = document.getElementById("searchPatient").value;
    let result = document.getElementById("searchResult");

    if (name === "") {
        result.innerHTML = "Please enter patient name.";
    } else {
        result.innerHTML = "Patient found: " + name;
    }
}


function bookAppointment() {
    let name = document.getElementById("appointmentName").value;
    let doctor = document.getElementById("appointmentDoctor").value;
    let date = document.getElementById("appointmentDate").value;
    let time = document.getElementById("appointmentTime").value;

    alert(
        "Appointment booked successfully!\n\n" +
        "Patient: " + name + "\n" +
        "Doctor: " + doctor + "\n" +
        "Date: " + date + "\n" +
        "Time: " + time
    );
}


function viewRecords() {
    let records = document.getElementById("recordList");

    records.innerHTML =
        "<p><b>Patient Records</b></p>" +
        "<p>Patient records are available.</p>";
}
