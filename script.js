
// Get form and table elements
const wasteForm = document.querySelector("form");
const wasteTable = document.querySelector("#records tbody");

// Load saved records
let wasteRecords = JSON.parse(localStorage.getItem("wasteRecords")) || [];

// Display records in the table
function displayRecords() {
    wasteTable.innerHTML = "";

    wasteRecords.forEach((record, index) => {
        const row = wasteTable.insertRow();

        row.innerHTML = `
            <td>${escapeHTML(record.food)}</td>
            <td>${escapeHTML(record.category)}</td>
            <td>${escapeHTML(record.reason)}</td>
            <td>${record.quantity} ${escapeHTML(record.unit)}</td>
            <td>${escapeHTML(record.date)}</td>
            <td>${escapeHTML(record.department)}</td>
        `;
    });

    updateDashboard();
}

// Prevent HTML injection in user-entered text
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// Add new waste record
wasteForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form values
    const food = document.getElementById("food").value.trim();
    const category = document.getElementById("category").value;
    const reason = document.getElementById("reason").value;
    const quantity = Number(document.getElementById("quantity").value);
    const unit = document.getElementById("unit").value;
    const date = document.getElementById("date").value;
    const department = document.getElementById("department").value;
    const observation = document.getElementById("observation").value.trim();

    // Validate form
    if (
        !food || !category || !reason ||
        !quantity || quantity <= 0 ||
        !date || !department
    ) {
        alert("Please fill in all required fields correctly!");
        return;
    }

    // Create record object
    const newRecord = {
        food,
        category,
        reason,
        quantity,
        unit,
        date,
        department,
        observation
    };

    // Add record
    wasteRecords.push(newRecord);

    // Save records in local storage
    localStorage.setItem(
        "wasteRecords",
        JSON.stringify(wasteRecords)
    );

    // Update table
    displayRecords();

    // Reset form
    wasteForm.reset();

    // Success message
    alert("Food waste record added successfully!");
});

// Update dashboard
function updateDashboard() {

    let totalWaste = 0;
    let categoryCount = {};
    let reasonCount = {};

    wasteRecords.forEach(record => {

        totalWaste += record.quantity;

        categoryCount[record.category] =
            (categoryCount[record.category] || 0) + 1;

        reasonCount[record.reason] =
            (reasonCount[record.reason] || 0) + 1;
    });

    console.log("Total Waste:", totalWaste);
    console.log("Waste Categories:", categoryCount);
    console.log("Waste Reasons:", reasonCount);
}

// Display saved records when page loads
displayRecords();
