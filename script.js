let gists = {};
let passwords = {};

// Load exercises and passwords from JSON files
function loadResources() {
    fetch('exercises.json')
        .then(response => response.json())
        .then(data => {
            gists = data;
            populateDays();
        })
        .catch(error => console.error('Error loading exercises:', error));

    fetch('passwords.json')
        .then(response => response.json())
        .then(data => {
            passwords = data;
        })
        .catch(error => console.error('Error loading passwords:', error));
}

// Populate days in the select dropdown
function populateDays() {
    const daySelect = document.getElementById('day');
    daySelect.innerHTML = '<option value="">--Select Day--</option>';

    for (const day in gists) {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = `Day ${day.replace('day', '')}`;
        daySelect.appendChild(option);
    }
}

// Update exercise options and show/hide password section
function updatePasswordSection() {
    const day = document.getElementById('day').value;
    const exerciseSelect = document.getElementById('exercise');
    const passwordSection = document.getElementById('passwordSection');
    const passwordLabel = document.getElementById('passwordLabel');
    const submitBtn = document.getElementById('submitBtn');

    // Clear existing options
    exerciseSelect.innerHTML = '<option value="">--Select Exercise--</option>';

    if (day && gists[day]) {
        // Populate exercises based on selected day
        for (const exercise in gists[day]) {
            const option = document.createElement('option');
            option.value = exercise;
            option.textContent = exercise.replace('exercise', 'Exercise ');
            exerciseSelect.appendChild(option);
        }

        // Show password section
        passwordSection.style.display = 'block';
        passwordLabel.textContent = `Enter password for ${day.replace('day', 'Day ')} Exercise:`;

        submitBtn.onclick = function() {
            checkPassword(day, exerciseSelect.value);
        };
    } else {
        // Hide password section if no day is selected
        passwordSection.style.display = 'none';
    }
}

// Check if the entered password is correct
function checkPassword(day, exercise) {
    const enteredPassword = document.getElementById('password').value;
    const correctPassword = passwords[day] ? passwords[day][exercise] : null;
    const gistUrl = gists[day] ? gists[day][exercise] : null;

    if (!correctPassword || !gistUrl) {
        alert('Invalid day or exercise selected.');
        return;
    }

    if (enteredPassword === correctPassword) {
        window.location.href = gistUrl;
    } else {
        alert('Incorrect password');
    }
}

// Load resources on page load
window.onload = loadResources;
