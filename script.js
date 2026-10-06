function welcomeMessage() {
    alert("Welcome to Hospital Management System!");
}
function registerPatient() {
    let name = document.getElementById("patientName").value;
    let phone = document.getElementById("phone").value;

    alert("Patient " + name + " registered successfully!\nPhone: " + phone);
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