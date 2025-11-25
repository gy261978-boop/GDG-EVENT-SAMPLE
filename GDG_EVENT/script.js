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

    
        initialThemeCheck();
     
        (function() {
            const mapEl = document.getElementById('map');
            const lat = mapEl && mapEl.dataset.lat ? mapEl.dataset.lat : '28.4595';
            const lng = mapEl && mapEl.dataset.lng ? mapEl.dataset.lng : '77.5021';
            window.__mapLoadTimeout = setTimeout(() => {
                if (typeof google === 'undefined' || !google.maps) {
                    if (mapEl) {
                        mapEl.innerHTML = `\n                    <div style="text-align:center; color:var(--text-secondary);">\n                        <p style="margin:0 0 0.5rem 0;">Google Maps failed to load.</p>\n                        <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lng}" target="_blank" rel="noopener" class="directions-button">Open in Google Maps</a>\n                    </div>`;
                    }
                    console.error('Google Maps JavaScript API did not load within timeout. Check API key and billing/referer restrictions.');
                }
            }, 8000);
        })();

       
        window.initMap = function() {
          
            if (window.__mapLoadTimeout) {
                clearTimeout(window.__mapLoadTimeout);
                window.__mapLoadTimeout = null;
            }
            const mapEl = document.getElementById('map');
            if (!mapEl) return;

            const lat = parseFloat(mapEl.dataset.lat) || 28.4595;
            const lng = parseFloat(mapEl.dataset.lng) || 77.5021;

            const center = { lat: lat, lng: lng };

            if (typeof google === 'undefined' || !google.maps) {
                mapEl.innerHTML = `<div style="text-align:center; color:var(--text-secondary);">Google Maps failed to load. <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lng}" target="_blank" rel="noopener">Open in Google Maps</a></div>`;
                return;
            }

            const map = new google.maps.Map(mapEl, {
                center: center,
                zoom: 15,
                gestureHandling: 'auto'
            });

            const marker = new google.maps.Marker({
                position: center,
                map: map,
                title: 'GDG Galgotias University'
            });

            const infoWindow = new google.maps.InfoWindow({
                content: '<strong>GDG Galgotias University</strong><br>Seminar Hall, Academic Block 3'
            });

            marker.addListener('click', () => infoWindow.open(map, marker));
        };

       
        window.gm_authFailure = function() {
            const mapEl = document.getElementById('map');
            if (mapEl) {
                const lat = mapEl.dataset.lat || '28.4595';
                const lng = mapEl.dataset.lng || '77.5021';
                mapEl.innerHTML = `\n            <div style="text-align:center; color:var(--text-secondary);">\n                <p style="margin:0 0 0.5rem 0;">Google Maps authentication error. Please check your API key and referrer settings.</p>\n                <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lng}" target="_blank" rel="noopener" class="directions-button">Open in Google Maps</a>\n            </div>`;
            }
            console.error('Google Maps authentication failure. Check API key and referrer restrictions.');
        };

        
        function loadGoogleMaps() {
            const mapEl = document.getElementById('map');
            if (!mapEl) return;

            const apiKey = mapEl.dataset.apiKey || 'REPLACE_WITH_YOUR_API_KEY';
            if (!apiKey || apiKey === 'REPLACE_WITH_YOUR_API_KEY') {
                mapEl.innerHTML = `\n            <div style="text-align:center; color:var(--text-secondary);">\n                <p style="margin:0 0 0.5rem 0;">Map API key not set. Please set ` +
                    '`data-api-key` on the `#map` element in `index.html`.' + `</p>\n                <a href="https://www.google.com/maps/search/?api=1&query=${mapEl.dataset.lat},${mapEl.dataset.lng}" target="_blank" rel="noopener" class="directions-button">Open in Google Maps</a>\n            </div>`;
                return;
            }

            
            if (document.querySelector('script[data-maps-loader]')) return;

            const script = document.createElement('script');
            script.async = true;
            script.defer = true;
            script.setAttribute('data-maps-loader', '1');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&callback=initMap`;

            script.onerror = function(ev) {
                if (mapEl) {
                    const lat = mapEl.dataset.lat || '28.4595';
                    const lng = mapEl.dataset.lng || '77.5021';
                    mapEl.innerHTML = `\n                <div style="text-align:center; color:var(--text-secondary);">\n                    <p style="margin:0 0 0.5rem 0;">Failed to load Google Maps script. Check network or API key settings.</p>\n                    <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lng}" target="_blank" rel="noopener" class="directions-button">Open in Google Maps</a>\n                </div>`;
                }
                console.error('Failed to load Google Maps JavaScript API script.', ev);
            };

          
            document.body.appendChild(script);

         
            if (window.__mapLoadTimeout) clearTimeout(window.__mapLoadTimeout);
            window.__mapLoadTimeout = setTimeout(() => {
                if (typeof google === 'undefined' || !google.maps) {
                    if (mapEl) {
                        const lat = mapEl.dataset.lat || '28.4595';
                        const lng = mapEl.dataset.lng || '77.5021';
                        mapEl.innerHTML = `\n                    <div style="text-align:center; color:var(--text-secondary);">\n                        <p style="margin:0 0 0.5rem 0;">Google Maps taking too long to load or failed. Try opening directly.</p>\n                        <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lng}" target="_blank" rel="noopener" class="directions-button">Open in Google Maps</a>\n                    </div>`;
                    }
                    console.error('Google Maps JavaScript API did not initialize within timeout.');
                }
            }, 10000);
        }


        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            loadGoogleMaps();
        } else {
            document.addEventListener('DOMContentLoaded', loadGoogleMaps);
        }