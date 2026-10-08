 let patients = JSON.parse(localStorage.getItem("patients")) || [];
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
let beds = JSON.parse(localStorage.getItem("beds")) || [];

if (beds.length === 0) {

    for (let i = 1; i <= 12; i++) {

        beds.push({
            number: "B-" + String(i).padStart(3, "0"),
            status: "Available",
            patient: "",
            ward: ""
        });

    }

    localStorage.setItem("beds", JSON.stringify(beds));
}

document.addEventListener("DOMContentLoaded", function () {
    updateDashboard();
    displayRecords();
    displayAppointments();
    loadBedOptions();
    displayBeds();
    updateBedDashboard();
});


/* ================= PATIENT REGISTRATION ================= */

function registerPatient(event) {
    event.preventDefault();

    let name = document.getElementById("patientName").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    let disease = document.getElementById("disease").value.trim();
    let doctor = document.getElementById("doctor").value;

    if (!name || !phone || !age || !gender || !disease || !doctor) {
        document.getElementById("patientMessage").innerHTML = `
            <div class="error-message">
                Please fill in all patient details.
            </div>
        `;
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

    localStorage.setItem("patients", JSON.stringify(patients));

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
        </div>
    `;

    document.querySelector("#patients form").reset();

    updateDashboard();
    displayRecords();
}


/* ================= APPOINTMENT BOOKING ================= */

function bookAppointment(event) {
    event.preventDefault();

    let name = document.getElementById("appointmentName").value.trim();
    let doctor = document.getElementById("appointmentDoctor").value;
    let date = document.getElementById("appointmentDate").value;
    let time = document.getElementById("appointmentTime").value;

    if (!name || !doctor || !date || !time) {
        document.getElementById("appointmentMessage").innerHTML = `
            <div class="error-message">
                Please fill in all appointment details.
            </div>
        `;
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
    displayAppointments();
}


/* ================= SEARCH PATIENT ================= */

function searchPatient() {
    let searchName = document
        .getElementById("searchPatient")
        .value
        .trim()
        .toLowerCase();

    let result = document.getElementById("searchResult");

    if (!searchName) {
        result.innerHTML = `
            <div class="error-message">
                Please enter a patient name.
            </div>
        `;
        return;
    }

    let found = patients.filter(function (patient) {
        return patient.name.toLowerCase().includes(searchName);
    });

    if (found.length === 0) {
        result.innerHTML = `
            <div class="error-message">
                ❌ Patient not found.
            </div>
        `;
        return;
    }

    result.innerHTML = found.map(function (patient) {
        return `
            <div class="record-item">
                <h3>👤 ${patient.name}</h3>
                <p><strong>Patient ID:</strong> ${patient.id}</p>
                <p><strong>Phone:</strong> ${patient.phone}</p>
                <p><strong>Age:</strong> ${patient.age}</p>
                <p><strong>Gender:</strong> ${patient.gender}</p>
                <p><strong>Disease:</strong> ${patient.disease}</p>
                <p><strong>Doctor:</strong> ${patient.doctor}</p>

                <button onclick="editPatient(${patient.id})">
                    ✏️ Edit
                </button>

                <button onclick="deletePatient(${patient.id})">
                    🗑️ Delete
                </button>
            </div>
        `;
    }).join("");
}


/* ================= PATIENT RECORDS ================= */

function viewRecords() {
    displayRecords();
}

function displayRecords() {
    let recordList = document.getElementById("recordList");

    if (!recordList) return;

    if (patients.length === 0) {
        recordList.innerHTML = `
            <div class="error-message">
                No patient records available yet.
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

                <p><strong>Patient ID:</strong> ${patient.id}</p>
                <p><strong>Phone:</strong> ${patient.phone}</p>
                <p><strong>Age:</strong> ${patient.age}</p>
                <p><strong>Gender:</strong> ${patient.gender}</p>
                <p><strong>Disease:</strong> ${patient.disease}</p>
                <p><strong>Doctor:</strong> ${patient.doctor}</p>
                <p><strong>Registered Date:</strong> ${patient.registeredDate}</p>

                <button onclick="editPatient(${patient.id})">
                    ✏️ Edit
                </button>

                <button onclick="deletePatient(${patient.id})">
                    🗑️ Delete
                </button>
            </div>
        `;
    });
}


/* ================= EDIT PATIENT ================= */

function editPatient(id) {

    let patient = patients.find(function (p) {
        return p.id === id;
    });

    if (!patient) return;

    let newName = prompt("Enter Patient Name:", patient.name);
    if (newName === null) return;

    let newPhone = prompt("Enter Phone:", patient.phone);
    if (newPhone === null) return;

    let newAge = prompt("Enter Age:", patient.age);
    if (newAge === null) return;

    let newGender = prompt("Enter Gender:", patient.gender);
    if (newGender === null) return;

    let newDisease = prompt("Enter Disease:", patient.disease);
    if (newDisease === null) return;

    let newDoctor = prompt("Enter Doctor:", patient.doctor);
    if (newDoctor === null) return;

    patient.name = newName.trim();
    patient.phone = newPhone.trim();
    patient.age = newAge.trim();
    patient.gender = newGender.trim();
    patient.disease = newDisease.trim();
    patient.doctor = newDoctor.trim();

    localStorage.setItem("patients", JSON.stringify(patients));

    displayRecords();
    updateDashboard();

    alert("✅ Patient details updated successfully!");
}


/* ================= DELETE PATIENT ================= */

function deletePatient(id) {

    let confirmDelete = confirm(
        "Are you sure you want to delete this patient?"
    );

    if (!confirmDelete) return;

    patients = patients.filter(function (patient) {
        return patient.id !== id;
    });

    localStorage.setItem("patients", JSON.stringify(patients));

    displayRecords();
    updateDashboard();

    alert("🗑️ Patient deleted successfully!");
}


/* ================= APPOINTMENT DISPLAY ================= */

function displayAppointments() {

    let appointmentList =
        document.getElementById("appointmentList");

    if (!appointmentList) return;

    if (appointments.length === 0) {
        appointmentList.innerHTML = `
            <div class="error-message">
                No appointments available yet.
            </div>
        `;
        return;
    }

    appointmentList.innerHTML = `
        <h3>📅 Appointment Records</h3>
        <p>Total Appointments:
            <strong>${appointments.length}</strong>
        </p>
    `;

    appointments.forEach(function (appointment) {

        appointmentList.innerHTML += `
            <div class="record-item">

                <h3>📅 ${appointment.patientName}</h3>

                <p>
                    <strong>Appointment ID:</strong>
                    ${appointment.id}
                </p>

                <p>
                    <strong>Doctor:</strong>
                    ${appointment.doctor}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${appointment.date}
                </p>

                <p>
                    <strong>Time:</strong>
                    ${appointment.time}
                </p>

                <button onclick="editAppointment(${appointment.id})">
                    ✏️ Edit
                </button>

                <button onclick="deleteAppointment(${appointment.id})">
                    🗑️ Delete
                </button>

            </div>
        `;
    });
}


/* ================= EDIT APPOINTMENT ================= */

function editAppointment(id) {

    let appointment = appointments.find(function (a) {
        return a.id === id;
    });

    if (!appointment) return;

    let newName = prompt(
        "Enter Patient Name:",
        appointment.patientName
    );

    if (newName === null) return;

    let newDoctor = prompt(
        "Enter Doctor:",
        appointment.doctor
    );

    if (newDoctor === null) return;

    let newDate = prompt(
        "Enter Appointment Date:",
        appointment.date
    );

    if (newDate === null) return;

    let newTime = prompt(
        "Enter Appointment Time:",
        appointment.time
    );

    if (newTime === null) return;

    appointment.patientName = newName.trim();
    appointment.doctor = newDoctor.trim();
    appointment.date = newDate.trim();
    appointment.time = newTime.trim();

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );

    displayAppointments();
    updateDashboard();

    alert("✅ Appointment updated successfully!");
}


/* ================= DELETE APPOINTMENT ================= */

function deleteAppointment(id) {

    let confirmDelete = confirm(
        "Are you sure you want to delete this appointment?"
    );

    if (!confirmDelete) return;

    appointments = appointments.filter(function (appointment) {
        return appointment.id !== id;
    });

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );

    displayAppointments();
    updateDashboard();

    alert("🗑️ Appointment deleted successfully!");
}


/* ================= DASHBOARD ================= */

function updateDashboard() {

    let patientCount =
        document.getElementById("patientCount");

    let appointmentCount =
        document.getElementById("appointmentCount");

    let recordCount =
        document.getElementById("recordCount");

    if (patientCount)
        patientCount.textContent = patients.length;

    if (appointmentCount)
        appointmentCount.textContent = appointments.length;

    if (recordCount)
        recordCount.textContent = patients.length;
}