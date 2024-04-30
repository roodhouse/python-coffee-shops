export default function isOpen(hours) {

    try {
        // Get the current day and time
        const now = new Date();
        let currentDay = now.toLocaleDateString('en-US', { weekday: 'short' });

        if (currentDay === 'Tue') {
            currentDay = 'Tues'
        } else if (currentDay === 'Thu') {
            currentDay = 'Thurs'
        }

        // Extract opening and closing times for the current day
        const openingHours = hours[currentDay].split(':')[1].trim() + ':' + hours[currentDay].split(':')[2].trim().slice(' ', -1).replace(' –', '')
        let closingHours = hours[currentDay].split(':')[2].trim() + ':' + hours[currentDay].split(':')[3].trim()
        closingHours = closingHours.split(' ')[2]
        
        function timeToMinutes(timeString) {
            if (timeString.length === 1) {
                return timeString * 60;
            }
        
            const [hourString, minutesAndPeriod] = timeString.split(':');
            const [minutes, period] = minutesAndPeriod.split(' ');
            let hourValue = parseInt(hourString, 10);
        
            // Adjust hour value for PM times
            if (period.toUpperCase() === 'PM' && hourValue !== 12) {
                hourValue += 12;
            }
        
            return hourValue * 60 + parseInt(minutes, 10);
        }

        // Get the current time in minutes since midnight
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        // Convert opening and closing hours to minutes since midnight
        const openingMinutes = timeToMinutes(openingHours);
        const closingMinutes = timeToMinutes(closingHours);

        // Compare current time with opening and closing times
        if (currentMinutes >= openingMinutes && currentMinutes <= closingMinutes) {
            return 'open';
        } else {
            return 'closed';
        }
    } catch (error) {
        console.error("Error:", error);
        return 'error'; // or handle the error accordingly
    }
}
