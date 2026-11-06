/**
 * Fungsi untuk memformat tanggal sesuai dengan kriteria
 * @param {Date} tgl - Tanggal yang akan diformat
 * @returns {string} - mengembalikan string tanggal dalam format "Hari, DD Mon YYYY"
 */
function dateFormat(tgl) {
    const date = new Intl.DateTimeFormat(
        'en-US',
        {
            timeZone: 'Asia/Jakarta',
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

    const parts = date.formatToParts(tgl);

    const day = parts.find(part => part.type === 'day').value;
    const month = parts.find(part => part.type === 'month').value;
    const year = parts.find(part => part.type === 'year').value;
    const weekday = parts.find(part => part.type === 'weekday').value;
    return `${weekday}, ${day} ${month} ${year}`;
}

/**
 * Fungsi untuk mengambil data cuaca dari API OpenWeatherMap
 * dan menampilkan perkiraan cuaca harian (data API per 3 jam, diambil setiap 8 data = 24 jam)
 * Menggunakan async/await untuk menangani operasi asynchronous
 */
async function getWeather() {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
        console.error("API_KEY belum di-set di file .env");
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Jakarta&units=metric&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error(`Request gagal, status ${response.status} : ${response.statusText}`);
        }

        const data = await response.json();

        console.log("Weather Forecast:");
        for (let i = 0; i < data.list.length; i += 8) {
            const forecast = data.list[i];
            const date = dateFormat(new Date(forecast.dt * 1000));
            console.log(`${date}: ${forecast.main.temp.toFixed(2)}°C`);
        }
    } catch (error) {
        console.error("Gagal mengambil data cuaca:", error.message);
    }
}



getWeather();