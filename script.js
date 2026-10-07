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

    let newRecord = {
        name: name,
        phone: phone,
        age: age,
        gender: gender,
        disease: disease,
        doctor: doctor
    };

    let records = JSON.parse(localStorage.getItem("patientRecords")) || [];

    records.push(newRecord);

    localStorage.setItem("patientRecords", JSON.stringify(records));

    alert("Patient " + name + " registered successfully!");
}
function bookAppointment() {
    let name = document.getElementById("appointmentName").value;
    let doctor = document.getElementById("appointmentDoctor").value;
    let date = document.getElementById("appointmentDate").value;
    let time = document.getElementById("appointmentTime").value;

    alert(
        "Appointment booked successfully!\n\n" +
        "Patient Name: " + name + "\n" +
        "Doctor: " + doctor + "\n" +
        "Date: " + date + "\n" +
        "Time: " + time
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
    let records = JSON.parse(localStorage.getItem("patientRecords")) || [];

    if (records.length === 0) {
        document.getElementById("recordList").innerHTML =
            "<p>No patient records found.</p>";
        return;
    }

    let output = "<h3>Patient Records</h3>";

    records.forEach(function(record, index) {
        output +=
            "<div>" +
            "<b>Patient " + (index + 1) + "</b><br>" +
            "Name: " + record.name + "<br>" +
            "Phone: " + record.phone + "<br>" +
            "Age: " + record.age + "<br>" +
            "Gender: " + record.gender + "<br>" +
            "Disease: " + record.disease + "<br>" +
            "Doctor: " + record.doctor + "<br><br>" +

            "<button onclick='deleteRecord(" + index + ")'>" +
            "Delete Record</button>" +

            "<hr></div>";
    });

    document.getElementById("recordList").innerHTML = output;
}
function deleteRecord(index) {
    let records = JSON.parse(localStorage.getItem("patientRecords")) || [];

    records.splice(index, 1);

    localStorage.setItem("patientRecords", JSON.stringify(records));

    alert("Patient record deleted successfully!");

    viewRecords();
}
function editRecord(index) {
    let records = JSON.parse(localStorage.getItem("patientRecords")) || [];
    let record = records[index];

    let name = prompt("Enter Patient Name:", record.name);
    let phone = prompt("Enter Phone:", record.phone);
    let age = prompt("Enter Age:", record.age);
    let gender = prompt("Enter Gender:", record.gender);
    let disease = prompt("Enter Disease:", record.disease);
    let doctor = prompt("Enter Doctor:", record.doctor);

    if (name && phone && age && gender && disease && doctor) {
        records[index] = {
            name: name,
            phone: phone,
            age: age,
            gender: gender,
            disease: disease,
            doctor: doctor
        };

        localStorage.setItem("patientRecords", JSON.stringify(records));

        alert("Patient record updated successfully!");

        viewRecords();
    }
}
footer {
    background-color: #0d47a1;
    color: white;
    text-align: center;
    padding: 20px;
    margin-top: 30px;
}

footer p {
    margin: 5px;
}