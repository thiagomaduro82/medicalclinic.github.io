const appointmentStatus = ['SCHEDULED', 'CANCELED', 'COMPLETED'];

// Populate the patient table
function populateAppointmentTable() {

    const appointments = JSON.parse(localStorage.getItem('appointments'));

    let table = $('#appointmentTable').DataTable({
        retrieve: true
    });

    // Clear existing rows to avoid duplicates
    table.clear();

    // Add each patient as a new row
    appointments.forEach(appointment => {
        table.row.add([
            appointment.id,
            appointment.patient_name,
            appointment.doctor_name,
            appointment.date,
            appointment.time,
            appointment.status,
            `
            <button class='btn btn-warning btn-sm mx-2' onclick="editAppointment('${appointment.id}')">
                <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button class='btn btn-danger btn-sm mx-2' onclick="showDeleteMessage('${appointment.id}')">
                <i class="fa-regular fa-trash-can"></i>
            </button>
            `
        ]);
    });

    // Draw the table with new data
    table.draw();
}

function addAppointment() {
    const patients = JSON.parse(localStorage.getItem('patients'));
    const doctors = JSON.parse(localStorage.getItem('doctors'));

    let cbPatients = document.getElementById('patient');
    cbPatients.innerHTML = '';
    let cbDoctors = document.getElementById('doctor');
    cbDoctors.innerHTML = '';
    let cbStatus = document.getElementById('status');
    cbStatus.innerHTML = '';

    for (let index = 0; index < patients.length; index++) {
        const element = patients[index];
        cbPatients.innerHTML += `<option value=${element.id}>${element.name}</option>`;
    }
    for (let index = 0; index < doctors.length; index++) {
        const element = doctors[index];
        cbDoctors.innerHTML += `<option value=${element.id}>${element.name}</option>`;
    }
    for (let index = 0; index < appointmentStatus.length; index++) {
        cbStatus.innerHTML += `<option value=${appointmentStatus[index]}>${appointmentStatus[index]}</option>`;
    }

    document.getElementById('date_appointment').value = '';
    document.getElementById('time_appointment').value = '';
    document.getElementById('id').value = '';
    $('#insertUpdateModal').modal('show');
}

function editAppointment(id) {

    let appointments = JSON.parse(localStorage.getItem('appointments'));
    const patients = JSON.parse(localStorage.getItem('patients'));
    const doctors = JSON.parse(localStorage.getItem('doctors'));

    let patient_id;
    let patient_name;
    let doctor_name;
    let date_appointment;
    let time_appointment;
    let status;


    for (let index = 0; index < appointments.length; index++) {
        const element = appointments[index];
        if (element.id === parseInt(id, 10)) {
            patient_id = element.id;
            patient_name = element.patient_name;
            doctor_name = element.doctor_name;
            date_appointment = element.date;
            time_appointment = element.time;
            status = element.status;
            break;
        }
    }

    console.log(patient_id, patient_name, doctor_name, date_appointment, time_appointment, status);

    document.getElementById('id').value = patient_id;
    document.getElementById('date_appointment').value = date_appointment;
    document.getElementById('time_appointment').value = time_appointment;

    let cbPatients = document.getElementById('patient');
    cbPatients.innerHTML = '';

    let cbDoctors = document.getElementById('doctor');
    cbDoctors.innerHTML = '';

    let cbStatus = document.getElementById('status');
    cbStatus.innerHTML = '';

    for (let index = 0; index < patients.length; index++) {
        const element = patients[index];
        if (element.name === patient_name) {
            cbPatients.innerHTML += `<option value=${element.id} selected>${element.name}</option>`;
        } else {
            cbPatients.innerHTML += `<option value=${element.id}>${element.name}</option>`;
        }
    }
    for (let index = 0; index < doctors.length; index++) {
        const element = doctors[index];
        if (element.name === doctor_name) {
            cbDoctors.innerHTML += `<option value=${element.id} selected>${element.name}</option>`;
        } else {
            cbDoctors.innerHTML += `<option value=${element.id}>${element.name}</option>`;
        }
    }
    for (let index = 0; index < appointmentStatus.length; index++) {
        if (appointmentStatus[index] === status) {
            cbStatus.innerHTML += `<option value=${appointmentStatus[index]} selected>${appointmentStatus[index]}</option>`;
        } else {
            cbStatus.innerHTML += `<option value=${appointmentStatus[index]}>${appointmentStatus[index]}</option>`;
        }
    }
    $('#insertUpdateModal').modal('show');
}

function deleteAppointment() {
    const id = document.getElementById('appointment_id').value;
    let appointments = JSON.parse(localStorage.getItem('appointments'));
    for (let index = 0; index < appointments.length; index++) {
        const element = appointments[index];
        if (element.id === parseInt(id, 10)) {
            appointments.splice(index, 1);
            break;
        }
    }
    localStorage.setItem('appointments', JSON.stringify(appointments));
    document.getElementById('appointment_id').value = '';
    $('#deleteModal').modal('hide');
    populateAppointmentTable();
}

function showDeleteMessage(id) {
    document.getElementById('appointment_id').value = id;
    $('#deleteModal').modal('show');
}

function closeModal() {
    $('#insertUpdateModal').modal('hide');
}

function saveDoctor() {
    const patients = JSON.parse(localStorage.getItem('patients'));
    const doctors = JSON.parse(localStorage.getItem('doctors'));
    let id = document.getElementById('id').value;
    let patient_id = document.getElementById('patient').value;
    let patient_name = '';
    let doctor_id = document.getElementById('doctor').value;
    let doctor_name = '';
    let date_appointment = document.getElementById('date_appointment').value;
    let time_appointment = document.getElementById('time_appointment').value;
    let status = document.getElementById('status').value;
    let appointments = JSON.parse(localStorage.getItem('appointments'));
    let maxID = 0;

    for (let index = 0; index < appointments.length; index++) {
        const element = appointments[index];
        if (element.id > maxID) {
            maxID = element.id;
        }
    }

    for (let index = 0; index < patients.length; index++) {
        const element = patients[index];
        if (element.id === parseInt(patient_id, 10)) {
            patient_name = element.name;
        }
    }
    for (let index = 0; index < doctors.length; index++) {
        const element = doctors[index];
        if (element.id === parseInt(doctor_id, 10)) {
            doctor_name = element.name;
        }
    }

    if (id === '') {
        appointments.push({
            id: ++maxID, 
            patient_name: patient_name,
            doctor_name: doctor_name,
            date: date_appointment,
            time: time_appointment,
            status: status
        });
    } else {
        for (let index = 0; index < appointments.length; index++) {
            const element = appointments[index];
            if (element.id === parseInt(id, 10)) {
                element.patient_name = patient_name;
                element.doctor_name = doctor_name;
                element.date = date_appointment;
                element.time = time_appointment;
                element.status = status;
            }
        }
    }

    localStorage.setItem('appointments', JSON.stringify(appointments));
    $('#insertUpdateModal').modal('hide');
    populateAppointmentTable();

}

function validateFields() {

    let date_appointment = document.getElementById('date_appointment').value;
    let time_appointment = document.getElementById('time_appointment').value;

    let message = [];

    if (date_appointment === '') {
        message.push('The <b>date appointment</b> field is required');
    }
    if (time_appointment === '') {
        message.push('The <b>time appointment</b> field is required');
    }

    if (message.length === 0) {
        saveDoctor();
    } else {
        let alertMessage = document.getElementById("alertError");
        alertMessage.innerHTML = '';
        alertMessage.innerHTML += '<ul>';
        for (let index = 0; index < message.length; index++) {
            alertMessage.innerHTML += '<li>' + message[index] + '</li>'
        }
        alertMessage.innerHTML += '</ul>';

        document.getElementById("alertError").classList.remove("d-none");
        document.getElementById("alertError").classList.add("show");
        setTimeout(function () {
            document.getElementById("alertError").classList.remove("show");
            document.getElementById("alertError").classList.add("d-none");
        }, 3000);
    }

}


