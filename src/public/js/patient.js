// Populate the patient table
function populatePatientTable() {

    const patients = JSON.parse(localStorage.getItem('patients'));

    let table = $('#patientTable').DataTable({
        retrieve: true
    });

    // Clear existing rows to avoid duplicates
    table.clear();

    // Add each patient as a new row
    patients.forEach(patient => {
        table.row.add([
            patient.id, 
            patient.name,
            patient.address,
            patient.city,
            patient.phone_number,
            patient.email,
            `
            <button class='btn btn-warning btn-sm mx-2' onclick="editPatient('${patient.id}')">
                <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button class='btn btn-danger btn-sm mx-2' onclick="showDeleteMessage('${patient.id}')">
                <i class="fa-regular fa-trash-can"></i>
            </button>
            `
        ]);
    });

    // Draw the table with new data
    table.draw();
}

function addPatient() {
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('address').value = '';
    document.getElementById('city').value = '';
    document.getElementById('phone_number').value = '';
    document.getElementById('email').value = '';
    $('#insertUpdateModal').modal('show');
}

function editPatient(id) {
    let patients = JSON.parse(localStorage.getItem('patients'));
    for (let index = 0; index < patients.length; index++) {
        const element = patients[index];
        if (element.id === parseInt(id, 10)) {
            document.getElementById('id').value = element.id;
            document.getElementById('name').value = element.name;
            document.getElementById('address').value = element.address;
            document.getElementById('city').value = element.city;
            document.getElementById('phone_number').value = element.phone_number;
            document.getElementById('email').value = element.email;
            break;
        }
    }
    $('#insertUpdateModal').modal('show');
}

function deletePatient() {
    const id = document.getElementById('patient_id').value;
    let patients = JSON.parse(localStorage.getItem('patients'));
    for (let index = 0; index < patients.length; index++) {
        const element = patients[index];
        if (element.id === parseInt(id, 10)) {
            patients.splice(index, 1);
            break;
        }
    }
    localStorage.setItem('patients', JSON.stringify(patients));
    document.getElementById('patient_id').value = '';
    $('#deleteModal').modal('hide');
    populatePatientTable();
}

function showDeleteMessage(id) {
    document.getElementById('patient_id').value = id;
    $('#deleteModal').modal('show');
}

function closeModal() {
    $('#insertUpdateModal').modal('hide');
}

function savePatient() {

    let id = document.getElementById('id').value;
    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let phone_number = document.getElementById('phone_number').value;
    let email = document.getElementById('email').value;
    let patients = JSON.parse(localStorage.getItem('patients'));
    let maxID = 0;

    for (let index = 0; index < patients.length; index++) {
        const element = patients[index];
        if (element.id > maxID) {
            maxID = element.id;
        }
    }
    if (id === '') {
        patients.push({
            id: ++maxID,
            name: name,
            address: address,
            city: city,
            phone_number: phone_number,
            email: email
        });
    } else {
        for (let index = 0; index < patients.length; index++) {
            const element = patients[index];
            if (element.id === parseInt(id, 10)) {
                element.name = name,
                element.address = address;
                element.city = city;
                element.phone_number = phone_number;
                element.email = email;
            }
    
        }
    }

    localStorage.setItem('patients', JSON.stringify(patients));
    $('#insertUpdateModal').modal('hide');
    populatePatientTable();

}

function validateFields() {
    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let email = document.getElementById('email').value;
    let message = [];

    if (name.length <= 5) {
        message.push('The <b>name</b> field must be longer than 5 characters');
    } 
    if (name === '') {
        message.push('The <b>name</b> field is required');
    }

    if (address.length <= 5) {
        message.push('The <b>address</b> field must be longer than 5 characters');
    } 
    if (address === '') {
        message.push('The <b>address</b> field is required');
    }

    if (city.length <= 5) {
        message.push('The <b>city</b> field must be longer than 5 characters');
    } 
    if (city === '') {
        message.push('The <b>city</b> field is required');
    }

    if (!isValidEmail(email)) {
        message.push('The <b>email</b> field is invalid');
    } 
    if (email === '') {
        message.push('The <b>email</b> field is required');
    }

    if (message.length === 0) {
        savePatient();
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


