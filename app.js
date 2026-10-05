// Main application logic
document.addEventListener("DOMContentLoaded", () => {
    const statusElement = document.getElementById("app-status");
    if (statusElement) {
        statusElement.textContent = "Hệ thống hoạt động bình thường";
        statusElement.style.backgroundColor = "#10b981"; // Emerald green
    }
    console.log("Session 04 Exercise 4 App running successfully.");
});
