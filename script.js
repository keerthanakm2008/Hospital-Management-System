function welcomeMessage() {
    alert("Welcome to Hospital Management System!");
}
function registerPatient() {
    let name = document.getElementById("patientName").value;

    alert("Patient " + name + " registered successfully!");
}
function bookAppointment() {
    let name = document.getElementById("appointmentName").value;
    alert("Appointment booked successfully for " + name + "!");
}