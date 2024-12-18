import { auth } from "../../auth/firebase/config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

const db = getDatabase();

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Calendar
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        initialDate: new Date(),
        headerToolbar: {
            left: 'prev',
            center: 'title',
            right: 'next'
        },
        events: []
    });
    calendar.render();

    // Auth State Change
    onAuthStateChanged(auth, user => {
        if (user) {
            // User is signed in
            const userId = user.uid;
            
            loadScheduleFromCache(userId);
            
            // Load existing schedule from Firebase
            getScheduleFromFirebase(userId);

            document.getElementById('generate-schedule').addEventListener('click', function() {
                const plantingDateInput = document.getElementById('planting-date').value;
                if (plantingDateInput) {
                    generateSchedule(userId, plantingDateInput);
                } else {
                    alert('Please enter a planting date!');
                }
            });
        } else {
            // User is signed out
            alert('Please sign in to access this feature.');
        }
    });

    // Function to generate schedule based on planting date
    function generateSchedule(userId, plantingDate) {
        const plantingDateObj = new Date(plantingDate);
        const schedule = [];
    
        // Calculate the schedule for a year
        const wateringInterval = 2; // Every 2 days
        const fertilizationInterval = 30; // Every 30 days
        const harvestDate = new Date(plantingDateObj);
        harvestDate.setFullYear(plantingDateObj.getFullYear() + 1); // End of year harvest
    
        for (let i = 0; i < 365; i++) {
            let currentDate = new Date(plantingDateObj);
            currentDate.setDate(plantingDateObj.getDate() + i);
    
            if (i % wateringInterval === 0) {
                schedule.push({
                    title: 'Penyiraman',
                    start: currentDate.toISOString().split('T')[0],
                    className: 'event-blue'
                });
            }
    
            if (i % fertilizationInterval === 0) {
                schedule.push({
                    title: 'Pemupukan',
                    start: currentDate.toISOString().split('T')[0],
                    className: 'event-green'
                });
            }
    
            if (currentDate >= harvestDate) {
                schedule.push({
                    title: 'Panen',
                    start: harvestDate.toISOString().split('T')[0],
                    className: 'event-red'
                });
                break;
            }
        }
    
        // Clear existing events from the calendar
        calendar.removeAllEvents();
    
        // Add the new schedule to FullCalendar
        calendar.addEventSource(schedule);
    
        // Save the new schedule to Firebase Realtime Database
        saveToFirebase(userId, plantingDate, schedule);
    }

    // Save schedule to Firebase Realtime Database with overwrite logic
    function saveToFirebase(userId, plantingDate, schedule) {
        const plantingDateKey = plantingDate.replace(/-/g, '');
        const scheduleRef = ref(db, `schedules/${userId}/${plantingDateKey}`);

        set(scheduleRef, {
            plantingDate: plantingDate,
            schedule: schedule
        }).then(() => {
            alert('Jadwal berhasil disimpan!');
        }).catch((error) => {
            console.error('Error saving schedule:', error);
        });
    }

    // Function to get schedule from Firebase
    function getScheduleFromFirebase(userId) {
        const scheduleRef = ref(db, `schedules/${userId}`);
        onValue(scheduleRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                console.log("Data loaded from Firebase:", data);
    
                // Simpan data ke localStorage
                localStorage.setItem(`schedule_${userId}`, JSON.stringify(data));
    
                // Tampilkan data di kalender
                const scheduleEntries = Object.values(data).flatMap(entry => entry.schedule);
                calendar.removeAllEvents();
                calendar.addEventSource(scheduleEntries);
    
                // Tampilkan aktivitas di daftar
                displayActivityDetails(data);
            } else {
                console.log("No schedule data available.");
            }
        });
    }

    // Function to display activity details
    function displayActivityDetails(data) {
        const activityList = document.querySelector('.activity-list');
        activityList.innerHTML = ''; // Clear previous items

        const scheduleEntries = Object.values(data); // Get all schedule entries

        scheduleEntries.forEach(entry => {
            entry.schedule.forEach(activity => {
                const activityItem = document.createElement('div');
                activityItem.classList.add('activity-item');

                activityItem.innerHTML = `
                    <span class="activity-dot"></span>
                    <div class="activity-text">
                        <h3>${activity.title}</h3>
                        <p>${activity.start}</p>
                    </div>
                `;

                activityList.appendChild(activityItem);
            });
        });
    }

    // Fungsi untuk memuat data dari localStorage jika ada
    function loadScheduleFromCache(userId) {
        const cachedData = localStorage.getItem(`schedule_${userId}`);
        if (cachedData) {
            const data = JSON.parse(cachedData);
            const scheduleEntries = Object.values(data).flatMap(entry => entry.schedule);
            calendar.addEventSource(scheduleEntries);
            displayActivityDetails(data);
        }
    }
});

