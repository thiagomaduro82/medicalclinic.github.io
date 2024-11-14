// check login information
function checkLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const users = JSON.parse(localStorage.getItem("users"));
    let loginError = true;

    console.log(username, password);

    for (let index = 0; index < users.length; index++) {
        if (users[index].username === username && users[index].password === password) {
            localStorage.setItem('user', JSON.stringify(users[index]));
            loginError = false;
            break;
        } 
    }
    
    if (loginError) {
        document.getElementById("alertError").classList.remove("d-none");
        document.getElementById("alertError").classList.add("show");
        setTimeout(function () {
            document.getElementById("alertError").classList.remove("show");
            document.getElementById("alertError").classList.add("d-none");    
        }, 3000);
    } else {
        window.location.href = "dashboard.html";
    }

}