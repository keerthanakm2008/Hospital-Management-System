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
    alert("Appointment booked successfully for " + name + "!");
}