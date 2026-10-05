function showMessage() {
    alert("Welcome to Hospital Management System!");
}

function registerPatient() {
    let name = document.getElementById("patientName").value;
    let age = document.getElementById("patientAge").value;
    let disease = document.getElementById("disease").value;

    if (name === "" || age === "" || disease === "") {
        alert("Please fill all patient details.");
        return;
    }

    alert(
        "Patient Registered Successfully!\n\n" +
        "Name: " + name +
        "\nAge: " + age +
        "\nDisease: " + disease
    );
}