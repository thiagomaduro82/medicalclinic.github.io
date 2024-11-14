function populateDashboard() {
    const users = JSON.parse(localStorage.getItem('users'));
    const patients = JSON.parse(localStorage.getItem('patients'));
    const doctors = JSON.parse(localStorage.getItem('doctors'));
    const appointments = JSON.parse(localStorage.getItem('appointments'));

    const cards = document.getElementById('cards');

    cards.innerHTML = `
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 mb-4">
            <div class="card text-white bg-secondary shadow-lg rounded-pill">
                <div class="card-body text-center">
                    <h5 class="card-title"><i class="fa-solid fa-users mx-2"></i>Users</h5>
                    <p class="card-text">
                        <h1>
                            <span class="badge bg-light text-black shadow">${users.length}</span>
                        </h1>
                    </p>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 mb-4">
            <div class="card text-white bg-primary shadow-lg rounded-pill">
                <div class="card-body text-center">
                    <h5 class="card-title"><i class="fa-solid fa-hospital-user mx-2"></i>Patients</h5>
                    <p class="card-text">
                        <h1>
                            <span class="badge bg-light text-black shadow">${patients.length}</span>
                        </h1>
                    </p>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 mb-4">
            <div class="card text-white bg-danger shadow-lg rounded-pill">
                <div class="card-body text-center">
                    <h5 class="card-title"><i class="fa-solid fa-user-doctor mx-2"></i>Doctors</h5>
                    <p class="card-text">
                        <h1>
                            <span class="badge bg-light text-black shadow">${doctors.length}</span>
                        </h1>
                    </p>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 mb-4">
            <div class="card text-white bg-success shadow-lg rounded-pill">
                <div class="card-body text-center">
                    <h5 class="card-title"><i class="fa-regular fa-calendar-days mx-2"></i>Appointments</h5>
                    <p class="card-text">
                        <h1>
                            <span class="badge bg-light text-black shadow">${appointments.length}</span>
                        </h1>
                    </p>
                </div>
            </div>
        </div>
    `;
}