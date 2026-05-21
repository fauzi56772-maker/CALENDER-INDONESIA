// 1. Logika Menjalankan Jam Digital Live
function jalankanJam() {
    const sekarang = new Date();
    const opsi = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    document.getElementById('live-jam').innerText = sekarang.toLocaleTimeString('id-ID', opsi);
}
setInterval(jalankanJam, 1000);
jalankanJam();

// 2. Logika Pembuat Kalender Otomatis & Interaktif
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

        // Tandai jika tanggal bernilai hari ini secara real-time
        if (tgl === hariIni.getDate() && bulan === hariIni.getMonth() && tahun === hariIni.getFullYear()) {
            elemenTanggal.classList.add('hari-ini');
        }

        // AKSI INTERAKTIF: Memunculkan info saat tanggal diklik!
        elemenTanggal.onclick = function() {
            const notif = document.getElementById('notif-box');
            notif.style.display = "block";
            notif.innerText = `Catatan Eduaksi (${tgl} ${namaBulanIndo[bulan]} ${tahun}): Fitur simpan agenda toko online segera siap!`;
        };

        wadah.appendChild(elemenTanggal);
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
