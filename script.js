document.addEventListener("DOMContentLoaded", function() {
    const todaysDateSpan = document.querySelector(".todays-date");
    const today = new Date();
    todaysDateSpan.textContent = today.toDateString();
    
    const span180days = document.getElementById('hundred-80-days-ago'); 
    const daysAgoDate = new Date(today);
    daysAgoDate.setDate(today.getDate() - 180);
    span180days.textContent = daysAgoDate.toDateString();

    const minDate = daysAgoDate; 
    minDate.setDate(minDate.getDate() - 1);  

    const entryDateInput = document.getElementById('entry-date');
    entryDateInput.min = minDate.toISOString().split('T')[0];

    const exitDateInput = document.getElementById('exit-date');
    exitDateInput.min = minDate.toISOString().split('T')[0];

    function handleDateMouseEnter(event) {

        if (selectedDate < minDate) {
            event.target.title = "Not countable!";
        } else {
            event.target.title = "";
        }
    }

    function updateExitMinDate(entryDate) {
        const exitDateInput = document.getElementById('exit-date');
        exitDateInput.min = entryDate;
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const addTripButton = document.getElementById("add-trip");
    const totalDaysSpan = document.getElementById("total-days");
    const tripsDiv = document.querySelector(".trips-div");

    let travelHistory = [];

    addTripButton.addEventListener("click", handleAddTrip);

    function handleAddTrip() {
        const entryDateInput = document.getElementById("entry-date");
        const exitDateInput = document.getElementById("exit-date");

        const entryDate = new Date(entryDateInput.value);
        const exitDate = new Date(exitDateInput.value);

        if (entryDate <= exitDate) {
            travelHistory.push({ entryDate, exitDate });
            const tripDuration = calculateDaysBetweenDates(entryDate, exitDate);
            displayTripDuration(tripDuration);
            updateTotalDays();
            entryDateInput.value = "";
            exitDateInput.value = "";
        } else {
            alert("Entry date must be before or equal to exit date.");
        }
    }


    function calculateDaysBetweenDates(startDate, endDate) {
        const oneDay = 24 * 60 * 60 * 1000;
        return Math.round(Math.abs((startDate - endDate) / oneDay)) + 1; 
    }

    function displayTripDuration(days) {
        const tripDurationDiv = document.createElement("div");

        tripDurationDiv.textContent = `Trip Duration: ${days} days`;
        tripsDiv.appendChild(tripDurationDiv);
    }

    function updateTotalDays() {
        const totalStay = calculateTotalStay();
        totalDaysSpan.textContent = totalStay;
    }

    function calculateTotalStay() {
        let totalStay = 0;
        for (const trip of travelHistory) {
            const stayDuration = (trip.exitDate - trip.entryDate) / (1000 * 60 * 60 * 24) + 1;
            totalStay += stayDuration;
        }
        return totalStay;
    }
});
