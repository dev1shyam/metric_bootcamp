let gists = {};
let passwords = {};

function loadResources() {
    fetch('exercises.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            gists = data;
            console.log('Exercises loaded:', gists);
        })
        .catch(error => console.error('Error loading exercises:', error));

    fetch('passwords.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            passwords = data;
            console.log('Passwords loaded:', passwords);
        })
        .catch(error => console.error('Error loading passwords:', error));
}

function updateExerciseOptions() {
    const day = document.getElementById('day').value;
    const exerciseSelect = document.getElementById('exercise');
    const passwordSection = document.getElementById('passwordSection');
    const passwordLabel = document.getElementById('passwordLabel');
    const submitBtn = document.getElementById('submitBtn');

    exerciseSelect.innerHTML = '<option value="">--Select Exercise--</option>';

    if (day && gists[day]) {
        for (const exercise in gists[day]) {
            const option = document.createElement('option');
            option.value = exercise;
            option.textContent = exercise.replace('exercise', 'Exercise ');
            exerciseSelect.appendChild(option);
        }

        passwordSection.style.display = 'block';
        passwordLabel.textContent = `Password is the exercise answer:`;

        submitBtn.onclick = function() {
            checkPassword(day, exerciseSelect.value);
        };
    } else {
        passwordSection.style.display = 'none';
    }
}

function checkPassword(day, exercise) {
    const enteredPassword = document.getElementById('password').value;
    const correctPassword = passwords[day] ? passwords[day][exercise] : null;
    const gistUrl = gists[day] ? gists[day][exercise] : null;

    if (!correctPassword || !gistUrl) {
        alert('Oops! Wrong one');
        return;
    }

    if (enteredPassword === correctPassword) {
      //  window.location.href = gistUrl;
        window.open(gistUrl, '_blank');
    } else {
        alert('Oops! Wrong one');
    }
}

window.onload = loadResources;
