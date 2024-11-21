// Populate the patient table
function populateDoctorTable() {

    const doctors = JSON.parse(localStorage.getItem('doctors'));

    let table = $('#doctorTable').DataTable({
        retrieve: true
    });

    // Clear existing rows to avoid duplicates
    table.clear();

    // Add each patient as a new row
    doctors.forEach(doctor => {
        table.row.add([
            doctor.id, 
            doctor.name,
            doctor.phone_number,
            doctor.email,
            `
            <button class='btn btn-warning btn-sm mx-2' onclick="editDoctor('${doctor.id}')">
                <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button class='btn btn-danger btn-sm mx-2' onclick="showDeleteMessage('${doctor.id}')">
                <i class="fa-regular fa-trash-can"></i>
            </button>
            `
        ]);
    });

    // Draw the table with new data
    table.draw();
}

function addDoctor() {
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('phone_number').value = '';
    document.getElementById('email').value = '';
    $('#insertUpdateModal').modal('show');
}

function editDoctor(id) {
    let doctors = JSON.parse(localStorage.getItem('doctors'));
    for (let index = 0; index < doctors.length; index++) {
        const element = doctors[index];
        if (element.id === parseInt(id, 10)) {
            document.getElementById('id').value = element.id;
            document.getElementById('name').value = element.name;
            document.getElementById('phone_number').value = element.phone_number;
            document.getElementById('email').value = element.email;
            break;
        }
    }
    $('#insertUpdateModal').modal('show');
}

function deleteDoctor() {
    const id = document.getElementById('doctor_id').value;
    let doctors = JSON.parse(localStorage.getItem('doctors'));
    for (let index = 0; index < doctors.length; index++) {
        const element = doctors[index];
        if (element.id === parseInt(id, 10)) {
            doctors.splice(index, 1);
            break;
        }
    }
    localStorage.setItem('doctors', JSON.stringify(doctors));
    document.getElementById('doctor_id').value = '';
    $('#deleteModal').modal('hide');
    populateDoctorTable();
}

function showDeleteMessage(id) {
    document.getElementById('doctor_id').value = id;
    $('#deleteModal').modal('show');
}

function closeModal() {
    $('#insertUpdateModal').modal('hide');
}

function saveDoctor() {

    let id = document.getElementById('id').value;
    let name = document.getElementById('name').value;
    let phone_number = document.getElementById('phone_number').value;
    let email = document.getElementById('email').value;
    let doctors = JSON.parse(localStorage.getItem('doctors'));
    let maxID = 0;

    for (let index = 0; index < doctors.length; index++) {
        const element = doctors[index];
        if (element.id > maxID) {
            maxID = element.id;
        }
    }
    if (id === '') {
        doctors.push({
            id: ++maxID,
            name: name,
            phone_number: phone_number,
            email: email
        });
    } else {
        for (let index = 0; index < doctors.length; index++) {
            const element = doctors[index];
            if (element.id === parseInt(id, 10)) {
                element.name = name, 
                element.phone_number = phone_number;
                element.email = email;
            }
        }
    }

    localStorage.setItem('doctors', JSON.stringify(doctors));
    $('#insertUpdateModal').modal('hide');
    populateDoctorTable();
}

function validateFields() {

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = [];

    if (name.length <= 5) {
        message.push('The <b>name</b> field must be longer than 5 characters');
    } 
    if (name === '') {
        message.push('The <b>name</b> field is required');
    }
    if (!isValidEmail(email)) {
        message.push('The <b>email</b> field is invalid');
    } 
    if (email === '') {
        message.push('The <b>email</b> field is required');
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

function isValidEmail(email) {
    // REGEX to validate emails
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
