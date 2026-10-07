let patients = JSON.parse(localStorage.getItem("patients")) || [];
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

document.addEventListener("DOMContentLoaded", function () {
    updateDashboard();
    displayRecords();
});


// ================================
// PATIENT REGISTRATION
// ================================

function registerPatient(event) {
    event.preventDefault();

    let name = document.getElementById("patientName").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    let disease = document.getElementById("disease").value.trim();
    let doctor = document.getElementById("doctor").value;

    if (
        name === "" ||
        phone === "" ||
        age === "" ||
        gender === "" ||
        disease === "" ||
        doctor === ""
    ) {
        showMessage(
            "patientMessage",
            "Please fill in all patient details.",
            "error"
        );
        return;
    }

    let patient = {
        id: Date.now(),
        name: name,
        phone: phone,
        age: age,
        gender: gender,
        disease: disease,
        doctor: doctor,
        registeredDate: new Date().toLocaleDateString()
    };

    patients.push(patient);

    localStorage.setItem(
        "patients",
        JSON.stringify(patients)
    );

    document.getElementById("patientMessage").innerHTML = `
        <div class="success-message">
            <h3>✅ Patient Registered Successfully!</h3>
            <p><strong>Patient ID:</strong> ${patient.id}</p>
            <p><strong>Name:</strong> ${patient.name}</p>
            <p><strong>Phone:</strong> ${patient.phone}</p>
            <p><strong>Age:</strong> ${patient.age}</p>
            <p><strong>Gender:</strong> ${patient.gender}</p>
            <p><strong>Disease:</strong> ${patient.disease}</p>
            <p><strong>Doctor:</strong> ${patient.doctor}</p>
            <p><strong>Registered Date:</strong> ${patient.registeredDate}</p>
        </div>
    `;

    document.querySelector("#patients form").reset();

    updateDashboard();
    displayRecords();
}


// ================================
// SEARCH PATIENT
// ================================

function searchPatient() {
    let searchName = document
        .getElementById("searchPatient")
        .value
        .trim()
        .toLowerCase();

    let result = document.getElementById("searchResult");

    if (searchName === "") {
        result.innerHTML = `
            <div class="error-message">
                Please enter a patient name.
            </div>
        `;
        return;
    }

    let foundPatients = patients.filter(function (patient) {
        return patient.name
            .toLowerCase()
            .includes(searchName);
    });

    if (foundPatients.length === 0) {
        result.innerHTML = `
            <div class="error-message">
                ❌ No patient found with the name
                "<strong>${searchName}</strong>".
            </div>
        `;
        return;
    }

    result.innerHTML = foundPatients.map(function (patient) {
        return `
            <div class="record-item">
                <h3>👤 ${patient.name}</h3>
                <p><strong>Patient ID:</strong> ${patient.id}</p>
                <p><strong>Phone:</strong> ${patient.phone}</p>
                <p><strong>Age:</strong> ${patient.age}</p>
                <p><strong>Gender:</strong> ${patient.gender}</p>
                <p><strong>Disease:</strong> ${patient.disease}</p>
                <p><strong>Doctor:</strong> ${patient.doctor}</p>
            </div>
        `;
    }).join("");
}


// ================================
// BOOK APPOINTMENT
// ================================

function bookAppointment(event) {
    event.preventDefault();

    let name = document
        .getElementById("appointmentName")
        .value
        .trim();

    let doctor = document
        .getElementById("appointmentDoctor")
        .value;

    let date = document
        .getElementById("appointmentDate")
        .value;

    let time = document
        .getElementById("appointmentTime")
        .value;

    if (
        name === "" ||
        doctor === "" ||
        date === "" ||
        time === ""
    ) {
        showMessage(
            "appointmentMessage",
            "Please fill in all appointment details.",
            "error"
        );
        return;
    }

    let appointment = {
        id: Date.now(),
        patientName: name,
        doctor: doctor,
        date: date,
        time: time
    };

    appointments.push(appointment);

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );

    document.getElementById("appointmentMessage").innerHTML = `
        <div class="success-message">
            <h3>✅ Appointment Booked Successfully!</h3>
            <p><strong>Appointment ID:</strong> ${appointment.id}</p>
            <p><strong>Patient:</strong> ${appointment.patientName}</p>
            <p><strong>Doctor:</strong> ${appointment.doctor}</p>
            <p><strong>Date:</strong> ${appointment.date}</p>
            <p><strong>Time:</strong> ${appointment.time}</p>
        </div>
    `;

    document.querySelector("#appointment form").reset();

    updateDashboard();
}


// ================================
// VIEW RECORDS
// ================================

function viewRecords() {
    displayRecords();
}


// ================================
// DISPLAY RECORDS
// ================================

function displayRecords() {
    let recordList = document.getElementById("recordList");

    if (!recordList) {
        return;
    }

    if (patients.length === 0) {
        recordList.innerHTML = `
            <div class="error-message">
                No patient records available yet.
                Please register a patient first.
            </div>
        `;
        return;
    }

    recordList.innerHTML = `
        <h3>📋 Registered Patient Records</h3>
        <p>Total Patients: <strong>${patients.length}</strong></p>
    `;

    patients.forEach(function (patient) {
        recordList.innerHTML += `
            <div class="record-item">
                <h3>👤 ${patient.name}</h3>

                <p>
                    <strong>Patient ID:</strong>
                    ${patient.id}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${patient.phone}
                </p>

                <p>
                    <strong>Age:</strong>
                    ${patient.age}
                </p>

                <p>
                    <strong>Gender:</strong>
                    ${patient.gender}
                </p>

                <p>
                    <strong>Disease:</strong>
                    ${patient.disease}
                </p>

                <p>
                    <strong>Doctor:</strong>
                    ${patient.doctor}
                </p>

                <p>
                    <strong>Registered Date:</strong>
                    ${patient.registeredDate}
                </p>
            </div>
        `;
    });
}


// ================================
// DASHBOARD
// ================================

function updateDashboard() {
    let patientCount =
        document.getElementById("patientCount");

    let appointmentCount =
        document.getElementById("appointmentCount");

    let recordCount =
        document.getElementById("recordCount");

    if (patientCount) {
        patientCount.textContent = patients.length;
    }

    if (appointmentCount) {
        appointmentCount.textContent = appointments.length;
    }

    if (recordCount) {
        recordCount.textContent = patients.length;
    }
}


// ================================
// MESSAGE FUNCTION
// ================================

function showMessage(elementId, message, type) {
    let element = document.getElementById(elementId);

    if (!element) {
        return;
    }

    if (type === "success") {
        element.innerHTML = `
            <div class="success-message">
                ${message}
            </div>
        `;
    } else {
        element.innerHTML = `
            <div class="error-message">
                ${message}
            </div>
        `;
    }
}
