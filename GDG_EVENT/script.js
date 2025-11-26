     window.onload = function() {
            lucide.createIcons();

           
            const eventDate = new Date("March 15, 2026 10:00:00").getTime();

            const updateCountdown = () => {
                const nowTime = new Date().getTime();
                const distance = eventDate - nowTime;

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                const getDisplayValue = (val) => val < 0 ? "00" : String(val).padStart(2, '0');

            
                document.getElementById("days").innerHTML = getDisplayValue(days);
                document.getElementById("hours").innerHTML = getDisplayValue(hours);
                document.getElementById("minutes").innerHTML = getDisplayValue(minutes);
                document.getElementById("seconds").innerHTML = getDisplayValue(seconds);

                if (distance < 0) {
                    clearInterval(countdownInterval);
                    const countdownContainer = document.getElementById("countdown-timer");
                    countdownContainer.innerHTML = '<p style="grid-column: 1 / -1; font-size: 2rem; font-weight: 700; color: var(--primary-red);">EVENT IS LIVE NOW!</p>';
                }
            };

           
            updateCountdown();
            const countdownInterval = setInterval(updateCountdown, 1000);

            document.getElementById('registration-form').addEventListener('submit', function(e) {
                e.preventDefault();

                const form = document.getElementById('registration-form');
                const successMessage = document.getElementById('success-message');

                form.style.display = 'none';

                successMessage.style.display = 'block';

                form.reset();

                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

                console.log('Registration Form submitted and success message shown.');
            });
        };

        const root = document.documentElement;
        const initialThemeCheck = () => {
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        };

        const toggleTheme = () => {
            if (root.classList.contains('dark')) {
                root.classList.remove('dark');
                localStorage.theme = 'light';
            } else {
                root.classList.add('dark');
                localStorage.theme = 'dark';
            }
           lucide.createIcons();
        };

    
