function welcomeMessage() {
    alert("Welcome to Hospital Management System!");
}
function registerPatient() {
    let name = document.getElementById("patientName").value;
    let phone = document.getElementById("phone").value;
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    let disease = document.getElementById("disease").value;
    let doctor = document.getElementById("doctor").value;

    let record =
        "Patient Name: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "Age: " + age + "\n" +
        "Gender: " + gender + "\n" +
        "Disease: " + disease + "\n" +
        "Doctor: " + doctor;

    localStorage.setItem("patientRecords", record);

    alert("Patient " + name + " registered successfully!");
}
function bookAppointment() {
    let name = document.getElementById("appointmentName").value;
    let phone = document.getElementById("appointmentPhone").value;

    alert(
        "Appointment booked successfully!\n" +
        "Patient Name: " + name + "\n" +
        "Phone Number: " + phone
    );
}


// Search Patient
function searchPatient() {
    let name = document.getElementById("searchPatient").value;

    if (name === "") {
        document.getElementById("searchResult").innerText =
            "Please enter patient name.";
    } else {
        document.getElementById("searchResult").innerText =
            "Patient search completed for: " + name;
    }
}
function loginUser() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        alert("Login successful! Welcome " + username);
    } else {
        alert("Invalid username or password!");
    }
}
function viewRecords() {
    let records = localStorage.getItem("patientRecords");

    if (records) {
        document.getElementById("recordList").innerHTML =
            "<h3>Patient Records</h3><pre>" + records + "</pre>";
    } else {
        document.getElementById("recordList").innerHTML =
            "<p>No patient records found.</p>";
    }
}