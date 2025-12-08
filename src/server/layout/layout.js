let startTime;

fetch('/server-start-time')
    .then(response => response.json())
    .then(data => {
        const serverStartTime = data.startTime;

        if (!sessionStorage.getItem('startTime') || sessionStorage.getItem('startTime') < serverStartTime) {
            startTime = serverStartTime;
            sessionStorage.setItem('startTime', startTime);
        } else {
            startTime = parseInt(sessionStorage.getItem('startTime'));
        }

        function updateTimer() {
            let currentTime = Date.now();
            let elapsedTime = currentTime - startTime;

            let hours = Math.floor(elapsedTime / 3600000);
            let minutes = Math.floor((elapsedTime % 3600000) / 60000);
            let seconds = Math.floor((elapsedTime % 60000) / 1000);

            document.getElementById('time').textContent = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        }

        setInterval(updateTimer, 1000);
    });
