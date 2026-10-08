let patients = JSON.parse(localStorage.getItem("patients")) || [];
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
let beds = JSON.parse(localStorage.getItem("beds")) || [];
let buildings = JSON.parse(localStorage.getItem("buildings")) || [];
let emergencies = JSON.parse(localStorage.getItem("emergencies")) || [];
let bills = JSON.parse(localStorage.getItem("bills")) || [];

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
    displayBuildings();
    displayEmergencies();
    displayBills();
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
/* ================= BED MANAGEMENT ================= */

function loadBedOptions() {

    let bedNumber = document.getElementById("bedNumber");

    if (!bedNumber) return;

    bedNumber.innerHTML = `
        <option value="">Choose Bed</option>
    `;

    beds.forEach(function (bed) {

        if (bed.status === "Available") {

            bedNumber.innerHTML += `
                <option value="${bed.number}">
                    ${bed.number}
                </option>
            `;

        }

    });
}


/* ================= ASSIGN BED ================= */

function assignBed(event) {

    event.preventDefault();

    let patientName =
        document.getElementById("bedPatientName").value.trim();

    let bedNumber =
        document.getElementById("bedNumber").value;

    let ward =
        document.getElementById("bedWard").value;

    if (!patientName || !bedNumber || !ward) {

        document.getElementById("bedMessage").innerHTML = `
            <div class="error-message">
                Please fill in all bed details.
            </div>
        `;

        return;
    }

    let bed = beds.find(function (b) {
        return b.number === bedNumber;
    });

    if (!bed) return;

    bed.status = "Occupied";
    bed.patient = patientName;
    bed.ward = ward;

    localStorage.setItem(
        "beds",
        JSON.stringify(beds)
    );

    document.getElementById("bedMessage").innerHTML = `
        <div class="success-message">
            <h3>✅ Bed Assigned Successfully!</h3>
            <p><strong>Patient:</strong> ${patientName}</p>
            <p><strong>Bed:</strong> ${bedNumber}</p>
            <p><strong>Ward:</strong> ${ward}</p>
        </div>
    `;

    document.querySelector("#beds form").reset();

    loadBedOptions();
    displayBeds();
    updateBedDashboard();
}


/* ================= DISPLAY BEDS ================= */
function displayBeds() {

    let bedList = document.getElementById("bedList");

    if (!bedList) return;

    bedList.innerHTML = "";

    beds.forEach(function (bed) {

        let statusClass =
            bed.status === "Available"
                ? "bed-available"
                : "bed-occupied";

        bedList.innerHTML += `

            <div class="bed-item ${statusClass}">

                <div class="bed-icon">🛏️</div>

                <div class="bed-info">

                    <h3>${bed.number}</h3>

                    <p>
                        <strong>Ward:</strong>
                        ${bed.ward || "Not Assigned"}
                    </p>

                    <p>
                        <strong>Patient:</strong>
                        ${bed.patient || "None"}
                    </p>

                    <span class="bed-status">
                        ${bed.status}
                    </span>

                </div>

                <div class="bed-actions">

                    <button
                        class="edit-bed-btn"
                        onclick="editBed('${bed.number}')">
                        ✏️ Edit
                    </button>

                    <button
                        class="delete-bed-btn"
                        onclick="deleteBed('${bed.number}')">
                        🗑️ Delete
                    </button>

                    ${
                        bed.status === "Occupied"
                        ?
                        `<button
                            class="release-btn"
                            onclick="releaseBed('${bed.number}')">
                            🔓 Release
                        </button>`
                        :
                        ""
                    }

                </div>

            </div>

        `;
    });
}
/* ================= EDIT BED ================= */

function editBed(bedNumber) {

    let bed = beds.find(function (b) {
        return b.number === bedNumber;
    });

    if (!bed) return;

    let newPatient = prompt(
        "Enter Patient Name:",
        bed.patient
    );

    if (newPatient === null) return;

    let newWard = prompt(
        "Enter Ward:",
        bed.ward
    );

    if (newWard === null) return;

    bed.patient = newPatient.trim();
    bed.ward = newWard.trim();

    if (bed.patient === "") {
        bed.status = "Available";
    } else {
        bed.status = "Occupied";
    }

    localStorage.setItem(
        "beds",
        JSON.stringify(beds)
    );

    displayBeds();
    loadBedOptions();
    updateBedDashboard();

    alert("✅ Bed details updated successfully!");
}


/* ================= DELETE BED ================= */

function deleteBed(bedNumber) {

    let confirmDelete = confirm(
        "Are you sure you want to delete this bed record?"
    );

    if (!confirmDelete) return;

    beds = beds.filter(function (bed) {
        return bed.number !== bedNumber;
    });

    localStorage.setItem(
        "beds",
        JSON.stringify(beds)
    );

    displayBeds();
    loadBedOptions();
    updateBedDashboard();

    alert("🗑️ Bed record deleted successfully!");
}

  
/* ================= RELEASE BED ================= */

function releaseBed(bedNumber) {

    let confirmRelease = confirm(
        "Are you sure you want to release this bed?"
    );

    if (!confirmRelease) return;

    let bed = beds.find(function (b) {
        return b.number === bedNumber;
    });

    if (!bed) return;

    bed.status = "Available";
    bed.patient = "";
    bed.ward = "";

    localStorage.setItem(
        "beds",
        JSON.stringify(beds)
    );

    loadBedOptions();
    displayBeds();
    updateBedDashboard();

    alert("✅ Bed released successfully!");
}


/* ================= BED DASHBOARD ================= */

function updateBedDashboard() {

    let totalBeds =
        document.getElementById("totalBeds");

    let availableBeds =
        document.getElementById("availableBeds");

    let occupiedBeds =
        document.getElementById("occupiedBeds");

    let available =
        beds.filter(function (bed) {
            return bed.status === "Available";
        }).length;

    let occupied =
        beds.filter(function (bed) {
            return bed.status === "Occupied";
        }).length;

    if (totalBeds)
        totalBeds.textContent = beds.length;

    if (availableBeds)
        availableBeds.textContent = available;

    if (occupiedBeds)
        occupiedBeds.textContent = occupied;
}
/* ================= BUILDING MANAGEMENT ================= */

function addBuilding(event) {
    event.preventDefault();

    let buildingName =
        document.getElementById("buildingName").value.trim();

    let floorNumber =
        document.getElementById("floorNumber").value;

    let roomNumber =
        document.getElementById("roomNumber").value.trim();

    let department =
        document.getElementById("buildingDepartment").value;

    let totalBeds =
        document.getElementById("buildingBeds").value;

    if (
        !buildingName ||
        !floorNumber ||
        !roomNumber ||
        !department ||
        !totalBeds
    ) {
        document.getElementById("buildingMessage").innerHTML = `
            <div class="error-message">
                Please fill in all building details.
            </div>
        `;

        return;
    }

    let building = {
        id: Date.now(),
        buildingName: buildingName,
        floorNumber: floorNumber,
        roomNumber: roomNumber,
        department: department,
        totalBeds: Number(totalBeds)
    };

    buildings.push(building);

    localStorage.setItem(
        "buildings",
        JSON.stringify(buildings)
    );

    document.getElementById("buildingMessage").innerHTML = `
        <div class="success-message">
            <h3>✅ Building Added Successfully!</h3>
            <p><strong>Building:</strong> ${building.buildingName}</p>
            <p><strong>Floor:</strong> ${building.floorNumber}</p>
            <p><strong>Room:</strong> ${building.roomNumber}</p>
            <p><strong>Department:</strong> ${building.department}</p>
            <p><strong>Total Beds:</strong> ${building.totalBeds}</p>
        </div>
    `;

    document.querySelector("#buildings form").reset();

    displayBuildings();
}


/* ================= DISPLAY BUILDINGS ================= */

function displayBuildings() {

    let buildingList =
        document.getElementById("buildingList");

    if (!buildingList) return;

    if (buildings.length === 0) {

        buildingList.innerHTML = `
            <div class="error-message">
                No building records available yet.
            </div>
        `;

        return;
    }

    buildingList.innerHTML = `
        <h3>🏢 Registered Buildings</h3>
        <p>
            Total Buildings / Rooms:
            <strong>${buildings.length}</strong>
        </p>
    `;

    buildings.forEach(function(building) {

        buildingList.innerHTML += `
            <div class="record-item">

                <h3>🏢 ${building.buildingName}</h3>

                <p>
                    <strong>Floor:</strong>
                    ${building.floorNumber}
                </p>

                <p>
                    <strong>Room:</strong>
                    ${building.roomNumber}
                </p>

                <p>
                    <strong>Department:</strong>
                    ${building.department}
                </p>

                <p>
                    <strong>Total Beds:</strong>
                    ${building.totalBeds}
                </p>

                <button
                    onclick="editBuilding(${building.id})">
                    ✏️ Edit
                </button>

                <button
                    onclick="deleteBuilding(${building.id})">
                    🗑️ Delete
                </button>

            </div>
        `;
    });
}


/* ================= EDIT BUILDING ================= */

function editBuilding(id) {

    let building = buildings.find(function(b) {
        return b.id === id;
    });

    if (!building) return;

    let newName = prompt(
        "Enter Building Name:",
        building.buildingName
    );

    if (newName === null) return;

    let newFloor = prompt(
        "Enter Floor Number:",
        building.floorNumber
    );

    if (newFloor === null) return;

    let newRoom = prompt(
        "Enter Room Number:",
        building.roomNumber
    );

    if (newRoom === null) return;

    let newDepartment = prompt(
        "Enter Department:",
        building.department
    );

    if (newDepartment === null) return;

    let newBeds = prompt(
        "Enter Total Beds:",
        building.totalBeds
    );

    if (newBeds === null) return;

    building.buildingName = newName.trim();
    building.floorNumber = newFloor.trim();
    building.roomNumber = newRoom.trim();
    building.department = newDepartment.trim();
    building.totalBeds = Number(newBeds);

    localStorage.setItem(
        "buildings",
        JSON.stringify(buildings)
    );

    displayBuildings();

    alert("✅ Building details updated successfully!");
}


/* ================= DELETE BUILDING ================= */

function deleteBuilding(id) {

    let confirmDelete = confirm(
        "Are you sure you want to delete this building record?"
    );

    if (!confirmDelete) return;

    buildings = buildings.filter(function(building) {
        return building.id !== id;
    });

    localStorage.setItem(
        "buildings",
        JSON.stringify(buildings)
    );

    displayBuildings();

    alert("🗑️ Building record deleted successfully!");
}
/* ================= EMERGENCY MANAGEMENT ================= */

function addEmergency(event) {

    event.preventDefault();

    let patientName =
        document.getElementById("emergencyPatientName").value.trim();

    let age =
        document.getElementById("emergencyAge").value;

    let emergencyType =
        document.getElementById("emergencyType").value.trim();

    let priority =
        document.getElementById("emergencyPriority").value;

    let doctor =
        document.getElementById("emergencyDoctor").value;

    if (
        !patientName ||
        !age ||
        !emergencyType ||
        !priority ||
        !doctor
    ) {

        document.getElementById("emergencyMessage").innerHTML = `
            <div class="error-message">
                Please fill in all emergency details.
            </div>
        `;

        return;
    }

    let emergency = {

        id: Date.now(),

        patientName: patientName,

        age: age,

        emergencyType: emergencyType,

        priority: priority,

        doctor: doctor,

        dateTime: new Date().toLocaleString()

    };

    emergencies.push(emergency);

    localStorage.setItem(
        "emergencies",
        JSON.stringify(emergencies)
    );

    document.getElementById("emergencyMessage").innerHTML = `

        <div class="success-message">

            <h3>✅ Emergency Case Added Successfully!</h3>

            <p>
                <strong>Patient:</strong>
                ${emergency.patientName}
            </p>

            <p>
                <strong>Age:</strong>
                ${emergency.age}
            </p>

            <p>
                <strong>Emergency:</strong>
                ${emergency.emergencyType}
            </p>

            <p>
                <strong>Priority:</strong>
                ${emergency.priority}
            </p>

            <p>
                <strong>Doctor:</strong>
                ${emergency.doctor}
            </p>

        </div>

    `;

    document.querySelector("#emergency form").reset();

    displayEmergencies();

}


/* ================= DISPLAY EMERGENCIES ================= */

function displayEmergencies() {

    let emergencyList =
        document.getElementById("emergencyList");

    if (!emergencyList) return;

    if (emergencies.length === 0) {

        emergencyList.innerHTML = `
            <div class="error-message">
                No emergency records available yet.
            </div>
        `;

        return;
    }

    emergencyList.innerHTML = `

        <h3>🚑 Registered Emergency Cases</h3>

        <p>
            Total Emergency Cases:
            <strong>${emergencies.length}</strong>
        </p>

    `;

    emergencies.forEach(function(emergency) {

        emergencyList.innerHTML += `

            <div class="record-item">

                <h3>
                    🚑 ${emergency.patientName}
                </h3>

                <p>
                    <strong>Age:</strong>
                    ${emergency.age}
                </p>

                <p>
                    <strong>Emergency Type:</strong>
                    ${emergency.emergencyType}
                </p>

                <p>
                    <strong>Priority:</strong>
                    ${emergency.priority}
                </p>

                <p>
                    <strong>Doctor:</strong>
                    ${emergency.doctor}
                </p>

                <p>
                    <strong>Date & Time:</strong>
                    ${emergency.dateTime}
                </p>

                <button
                    onclick="editEmergency(${emergency.id})">
                    ✏️ Edit
                </button>

                <button
                    onclick="deleteEmergency(${emergency.id})">
                    🗑️ Delete
                </button>

            </div>

        `;

    });

}


/* ================= EDIT EMERGENCY ================= */

function editEmergency(id) {

    let emergency = emergencies.find(function(e) {

        return e.id === id;

    });

    if (!emergency) return;


    let newName = prompt(
        "Enter Patient Name:",
        emergency.patientName
    );

    if (newName === null) return;


    let newAge = prompt(
        "Enter Age:",
        emergency.age
    );

    if (newAge === null) return;


    let newType = prompt(
        "Enter Emergency Type:",
        emergency.emergencyType
    );

    if (newType === null) return;


    let newPriority = prompt(
        "Enter Priority (Critical / High / Normal):",
        emergency.priority
    );

    if (newPriority === null) return;


    let newDoctor = prompt(
        "Enter Doctor:",
        emergency.doctor
    );

    if (newDoctor === null) return;


    emergency.patientName = newName.trim();

    emergency.age = newAge.trim();

    emergency.emergencyType = newType.trim();

    emergency.priority = newPriority.trim();

    emergency.doctor = newDoctor.trim();


    localStorage.setItem(
        "emergencies",
        JSON.stringify(emergencies)
    );


    displayEmergencies();


    alert(
        "✅ Emergency details updated successfully!"
    );

}


/* ================= DELETE EMERGENCY ================= */

function deleteEmergency(id) {

    let confirmDelete = confirm(
        "Are you sure you want to delete this emergency record?"
    );

    if (!confirmDelete) return;


    emergencies = emergencies.filter(
        function(emergency) {

            return emergency.id !== id;

        }
    );


    localStorage.setItem(
        "emergencies",
        JSON.stringify(emergencies)
    );


    displayEmergencies();


    alert(
        "🗑️ Emergency record deleted successfully!"
    );

}
/* ================= BILLING & PAYMENTS ================= */

function addBill(event) {

    event.preventDefault();

    let patientName =
        document.getElementById("billPatientName").value.trim();

    let consultation =
        Number(document.getElementById("consultationFee").value);

    let room =
        Number(document.getElementById("roomCharges").value);

    let medicine =
        Number(document.getElementById("medicineCharges").value);

    let lab =
        Number(document.getElementById("labCharges").value);

    let paymentStatus =
        document.getElementById("paymentStatus").value;

    if (
        !patientName ||
        paymentStatus === ""
    ) {
        document.getElementById("billingMessage").innerHTML = `
            <div class="error-message">
                Please fill in all billing details.
            </div>
        `;
        return;
    }

    let total =
        consultation +
        room +
        medicine +
        lab;

    let bill = {

        id: Date.now(),

        patientName: patientName,

        consultation: consultation,

        room: room,

        medicine: medicine,

        lab: lab,

        total: total,

        paymentStatus: paymentStatus,

        date: new Date().toLocaleDateString()

    };

    bills.push(bill);

    localStorage.setItem(
        "bills",
        JSON.stringify(bills)
    );

    document.getElementById("billingMessage").innerHTML = `

        <div class="success-message">

            <h3>✅ Bill Generated Successfully!</h3>

            <p>
                <strong>Patient:</strong>
                ${bill.patientName}
            </p>

            <p>
                <strong>Total Amount:</strong>
                ₹${bill.total}
            </p>

            <p>
                <strong>Payment Status:</strong>
                ${bill.paymentStatus}
            </p>

        </div>

    `;

    document.querySelector("#billing form").reset();

    displayBills();
}


/* ================= DISPLAY BILLS ================= */

function displayBills() {

    let billingList =
        document.getElementById("billingList");

    if (!billingList) return;

    if (bills.length === 0) {

        billingList.innerHTML = `
            <div class="error-message">
                No billing records available yet.
            </div>
        `;

        return;
    }

    billingList.innerHTML = `

        <h3>💰 Registered Billing Records</h3>

        <p>
            Total Bills:
            <strong>${bills.length}</strong>
        </p>

    `;

    bills.forEach(function(bill) {

        billingList.innerHTML += `

            <div class="record-item">

                <h3>💰 ${bill.patientName}</h3>

                <p>
                    <strong>Bill ID:</strong>
                    ${bill.id}
                </p>

                <p>
                    <strong>Consultation:</strong>
                    ₹${bill.consultation}
                </p>

                <p>
                    <strong>Room / Bed:</strong>
                    ₹${bill.room}
                </p>

                <p>
                    <strong>Medicine:</strong>
                    ₹${bill.medicine}
                </p>

                <p>
                    <strong>Lab:</strong>
                    ₹${bill.lab}
                </p>

                <p>
                    <strong>Total:</strong>
                    ₹${bill.total}
                </p>

                <p>
                    <strong>Payment Status:</strong>
                    ${bill.paymentStatus}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${bill.date}
                </p>

                <button
                    onclick="editBill(${bill.id})">
                    ✏️ Edit
                </button>

                <button
                    onclick="deleteBill(${bill.id})">
                    🗑️ Delete
                </button>

            </div>

        `;

    });

}


/* ================= EDIT BILL ================= */

function editBill(id) {

    let bill = bills.find(function(b) {
        return b.id === id;
    });

    if (!bill) return;

    let newPatient = prompt(
        "Enter Patient Name:",
        bill.patientName
    );

    if (newPatient === null) return;

    let newConsultation = prompt(
        "Enter Consultation Fee:",
        bill.consultation
    );

    if (newConsultation === null) return;

    let newRoom = prompt(
        "Enter Room / Bed Charges:",
        bill.room
    );

    if (newRoom === null) return;

    let newMedicine = prompt(
        "Enter Medicine Charges:",
        bill.medicine
    );

    if (newMedicine === null) return;

    let newLab = prompt(
        "Enter Lab Charges:",
        bill.lab
    );

    if (newLab === null) return;

    let newStatus = prompt(
        "Enter Payment Status (Paid / Pending):",
        bill.paymentStatus
    );

    if (newStatus === null) return;

    bill.patientName = newPatient.trim();

    bill.consultation = Number(newConsultation);

    bill.room = Number(newRoom);

    bill.medicine = Number(newMedicine);

    bill.lab = Number(newLab);

    bill.paymentStatus = newStatus.trim();

    bill.total =
        bill.consultation +
        bill.room +
        bill.medicine +
        bill.lab;

    localStorage.setItem(
        "bills",
        JSON.stringify(bills)
    );

    displayBills();

    alert("✅ Bill details updated successfully!");
}


/* ================= DELETE BILL ================= */

function deleteBill(id) {

    let confirmDelete = confirm(
        "Are you sure you want to delete this billing record?"
    );

    if (!confirmDelete) return;

    bills = bills.filter(function(bill) {
        return bill.id !== id;
    });

    localStorage.setItem(
        "bills",
        JSON.stringify(bills)
    );

    displayBills();

    alert("🗑️ Billing record deleted successfully!");
}
