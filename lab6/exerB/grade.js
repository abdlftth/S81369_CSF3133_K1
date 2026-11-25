// =========================================================================
// PART 1: IDENTIFIED ERRORS & FIXES
// =========================================================================
// Error 1 (grade.html, Line 19): Wrong script filename "grades.js" instead of "grade.js".
// Error 2 (grade.html, Line 9): Missing "return" in onsubmit="return checkMark()", causing page reload and result loss.
// Error 3 (grade.html, Line 17): Wrong function casing onclick="showtable()" instead of onclick="showTable()".
// Error 4 (grade.js, Line 5): Assignment (=) used instead of equality (===) in if (name = "").
// Error 5 (grade.js, Line 9): Typo in "isNan(mark)" instead of "isNaN(mark)".
// Error 6 (grade.js, Line 14): Logical AND (&&) used instead of OR (||) in if (mark < 0 && mark > 100).
// Error 7 (grade.js, Line 28): Wrong casing "getElementByID" instead of "getElementById".
// Error 8 (grade.js, Line 30): British spelling "style.colour" instead of "style.color".
// Error 9 (grade.js, Line 38): Loop starts at index 1 instead of 0, skipping the first row ("A").
// =========================================================================

function checkMark() {
    let name = document.forms["gradeForm"]["name"].value.trim();
    let markInput = document.forms["gradeForm"]["mark"].value.trim();

    // Validate name field
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Validate empty mark field
    if (markInput === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Validate numeric input
    if (isNaN(markInput)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    let mark = Number(markInput);

    // Validate mark range (0-100)
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Assign grade and corresponding color
    let grade;
    let color;

    if (mark >= 80) {
        grade = "A";
        color = "green";
    } else if (mark >= 65) {
        grade = "B";
        color = "green";
    } else if (mark >= 50) {
        grade = "C";
        color = "orange";
    } else {
        grade = "F";
        color = "red";
    }

    // Output result and timestamp in the assigned color
    const resultEl = document.getElementById("result");
    resultEl.innerHTML = name + " got grade " + grade;
    resultEl.style.color = color;

    const timeEl = document.getElementById("checkedTime");
    timeEl.innerHTML = "Checked on: " + Date();
    timeEl.style.color = color;

    return false;
}

// Fill mark input with a random integer from 0 to 100
function generateRandomMark() {
    const randomMark = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = randomMark;
}

// Render the complete grade reference table
function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];

    let tableHTML = "<table>";
    tableHTML += "<tr><th>Grade</th><th>Mark range</th></tr>";

    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }

    tableHTML += "</table>";
    document.getElementById("tableContainer").innerHTML = tableHTML;
}