// 1. Logika Menjalankan Jam Digital Live
function jalankanJam() {
    const sekarang = new Date();
    const opsi = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    document.getElementById('live-jam').innerText = sekarang.toLocaleTimeString('id-ID', opsi);
}
setInterval(jalankanJam, 1000);
jalankanJam();

// 2. Data Hari Besar Nasional & Internasional Sepanjang Tahun
const dataHariBesar = {
    0: { 1: "Tahun Baru Masehi" }, // Januari
    1: { 2: "Hari Lahan Basah Sedunia", 14: "Hari Valentine / Kasih Sayang" }, // Februari
    2: { 8: "Hari Perempuan Internasional", 22: "Hari Air Sedunia" }, // Maret
    3: { 7: "Hari Kesehatan Sedunia", 21: "Hari Kartini", 22: "Hari Bumi" }, // April
    4: { 1: "Hari Buruh Internasional", 2: "Hari Pendidikan Nasional", 20: "Hari Kebangkitan Nasional" }, // Mei
    5: { 1: "Hari Lahir Pancasila", 21: "Hari Krida Pertanian" }, // Juni
    6: { 22: "Hari Anak Nasional" }, // Juli
    7: { 17: "Hari Kemerdekaan Republik Indonesia 🇮🇩" }, // Agustus
    8: { 9: "Hari Olahraga Nasional", 21: "Hari Perdamaian Internasional" }, // September
    9: { 1: "Hari Kesaktian Pancasila", 2: "Hari Batik Nasional", 28: "Hari Sumpah Pemuda" }, // Oktober
    10: { 10: "Hari Pahlawan", 25: "Hari Guru Nasional" }, // November
    11: { 1: "Hari AIDS Sedunia", 22: "Hari Ibu", 25: "Hari Natal" } // Desember
};

// 3. Logika Pembuat Kalender Otomatis & Interaktif
let tanggalSistem = new Date();
const namaBulanIndo = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

function buatKalender() {
    const tahun = tanggalSistem.getFullYear();
    const bulan = tanggalSistem.getMonth();
    
    // Pasang nama bulan di bagian atas
    document.getElementById('nama-bulan').innerText = `${namaBulanIndo[bulan]} ${tahun}`;

    const wadah = document.getElementById('wadah-tanggal');
    wadah.innerHTML = ""; // Bersihkan tampilan kalender lama

    // Cari tahu hari pertama di bulan ini dan total jumlah hari
    const hariPertama = new Date(tahun, bulan, 1).getDay();
    const jumlahHari = new Date(tahun, bulan + 1, 0).getDate();
    const hariIni = new Date();

    // Tampilkan Hari Besar Bulan Ini secara Otomatis di Kotak Catatan Utama
    tampilkanHariBesarBulanIni(bulan);

    // Membuat ruang kosong untuk hari sebelum tanggal 1
    for (let i = 0; i < hariPertama; i++) {
        const elemenKosong = document.createElement('div');
        elemenKosong.classList.add('tanggal', 'kosong');
        wadah.appendChild(elemenKosong);
    }

    // Mengisi angka tanggal 1 sampai akhir bulan
    for (let tgl = 1; tgl <= jumlahHari; tgl++) {
        const elemenTanggal = document.createElement('div');
        elemenTanggal.classList.add('tanggal');
        elemenTanggal.innerText = tgl;

        // Beri tanda warna merah tipis/khusus jika tanggal tersebut adalah hari besar
        if (dataHariBesar[bulan] && dataHariBesar[bulan][tgl]) {
            elemenTanggal.style.color = "#ff4a5a";
            elemenTanggal.style.fontWeight = "bold";
        }

        // Tandai jika tanggal bernilai hari ini secara real-time
        if (tgl === hariIni.getDate() && bulan === hariIni.getMonth() && tahun === hariIni.getFullYear()) {
            elemenTanggal.classList.add('hari-ini');
        }

        // AKSI INTERAKTIF: Memunculkan info detail saat tanggal diklik!
        elemenTanggal.onclick = function() {
            const notif = document.getElementById('notif-box');
            notif.style.display = "block";
            
            // Cek apakah tanggal yang diklik ada hari besarnya
            let infoHariBesar = "";
            if (dataHariBesar[bulan] && dataHariBesar[bulan][tgl]) {
                infoHariBesar = `<br><strong style="color:#ff4a5a;">📢 Hari Besar: ${dataHariBesar[bulan][tgl]}</strong>`;
            }

            notif.innerHTML = `<strong>📅 Detail Tanggal:</strong> ${tgl} ${namaBulanIndo[bulan]} ${tahun} ${infoHariBesar}`;
        };

        wadah.appendChild(elemenTanggal);
    }
}

// Fungsi untuk menampilkan daftar semua hari besar di bulan yang sedang aktif
function tampilkanHariBesarBulanIni(bulan) {
    const notif = document.getElementById('notif-box');
    const hariBesarBulanIni = dataHariBesar[bulan];
    
    if (hariBesarBulanIni && Object.keys(hariBesarBulanIni).length > 0) {
        notif.style.display = "block";
        let teksHTML = `<strong>✨ Hari Penting di Bulan ${namaBulanIndo[bulan]}:</strong><br style="margin-bottom:5px;">`;
        for (const tgl in hariBesarBulanIni) {
            teksHTML += `• Tanggal ${tgl}: ${hariBesarBulanIni[tgl]}<br>`;
        }
        notif.innerHTML = teksHTML;
    } else {
        notif.innerHTML = `<strong>✨ Hari Penting:</strong><br>Tidak ada hari besar nasional di bulan ini.`;
        notif.style.display = "block";
    }
}

// Fungsi tombol navigasi bulan
function bulanSebelumnya() {
    tanggalSistem.setMonth(tanggalSistem.getMonth() - 1);
    buatKalender();
}

function bulanBerikutnya() {
    tanggalSistem.setMonth(tanggalSistem.getMonth() + 1);
    buatKalender();
}

// Jalankan sistem kalender saat pertama kali web dibuka
buatKalender();
