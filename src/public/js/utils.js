// Check if have a active user
function checkActiveUser() {
    if (localStorage.getItem('user') === null) {
        console.log('No active user');
        if (document.getElementById('indexPage') !== null) {
            window.location.href = "src/pages/home.html";    
        } else {
            window.location.href = "home.html";    
        }
        
    } else {
        if (document.getElementById('indexPage') !== null) {
            window.location.href = "src/pages/dashboard.html";    
        }
    }
}

// Remove a user object from localStorage
function logout() {
    if (localStorage.getItem('user') !== null) {
        localStorage.removeItem('user');
        window.location.href = "home.html";
    }
}
