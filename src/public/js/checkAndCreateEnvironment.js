// Check environment and create a initial data
function checkEnvironment() {

    if (localStorage.getItem('users') == null) {
        // Create a users table
        const users = [
            {
                name: "Thiago Maduro",
                username: "thiago.maduro",
                password: "123456"
            },
            {
                name: "Carlos Bernardino",
                username: "carlos.b",
                password: "654321"
            }
        ];
        localStorage.setItem("users", JSON.stringify(users))
    }

    if (localStorage.getItem('patients') == null) {
        // Create a patients table
        const patients = [
            {
                name: "Davis Mueller",
                address: "P.O. Box 925, 1668 Nisi. Avenue",
                city: "nenagh",
                phone_number: "0976 458 1294",
                email: "facilisis.eget@yahoo.net"
            },
            {
                name: "Jamal Hoover",
                address: "Ap #355-5081 Turpis Rd.",
                city: "Nenagh",
                phone_number: "07483 546612",
                email: "magna.a@yahoo.couk"
            }
        ];
        localStorage.setItem("patients", JSON.stringify(patients))
    }

    if (localStorage.getItem('doctors') == null) {
        // Create a doctors table
        const doctors = [
            {
                name: "Alexa Wolf"
            },
            {
                name: "Georgia Leon"
            }
        ];
        localStorage.setItem("doctors", JSON.stringify(doctors))
    }

    if (localStorage.getItem('appointments') == null) {
        // Create a appointments table
        const appointments = [
            {
                patient_name: "Davis Mueller",
                doctor_name: "Alexa Wolf", 
                date: "2024-11-14",
                time: "10:00",
                status: "SCHEDULED"
            },
            {
                patient_name: "Jamal Hoover",
                doctor_name: "Georgia Leon", 
                date: "2024-11-14",
                time: "11:00",
                status: "SCHEDULED"
            }
        ];
        localStorage.setItem("appointments", JSON.stringify(appointments))
    }


}