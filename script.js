// ==========================================
// ABSENSI PINTAR SMA AT TIJAARAH
// ==========================================


// ==========================================
// MENGAMBIL DATA DARI LOCAL STORAGE
// ==========================================

let dataAbsensi =
    JSON.parse(
        localStorage.getItem("dataAbsensi")
    ) || [];


// ==========================================
// JAM DAN TANGGAL
// ==========================================

function updateDateTime() {

    const sekarang = new Date();


    const tanggal =
        sekarang.toLocaleDateString(
            "id-ID",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );


    const jam =
        sekarang.toLocaleTimeString("id-ID");


    document.getElementById("tanggal")
        .textContent = tanggal;


    document.getElementById("jam")
        .textContent = jam;


    document.getElementById("infoTanggal")
        .textContent = tanggal;


    document.getElementById("infoJam")
        .textContent = jam;
}


// Jalankan jam pertama kali
updateDateTime();


// Update setiap 1 detik
setInterval(
    updateDateTime,
    1000
);


// ==========================================
// FORM ABSENSI
// ==========================================

const formAbsensi =
    document.getElementById(
        "formAbsensi"
    );


formAbsensi.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const nis =
            document
                .getElementById("nis")
                .value
                .trim();


        const nama =
            document
                .getElementById("nama")
                .value
                .trim();


        const kelas =
            document
                .getElementById("kelas")
                .value;


        const status =
            document
                .getElementById("status")
                .value;


        // Mengecek data
        if (
            !nis ||
            !nama ||
            !kelas ||
            !status
        ) {

            alert(
                "Mohon lengkapi semua data!"
            );

            return;
        }


        const sekarang =
            new Date();


        // Membuat data baru
        const dataBaru = {

            id: Date.now(),

            tanggal:
                sekarang.toLocaleDateString(
                    "id-ID"
                ),

            waktu:
                sekarang.toLocaleTimeString(
                    "id-ID"
                ),

            nis: nis,

            nama: nama,

            kelas: kelas,

            status: status
        };


        // Menambahkan data
        dataAbsensi.push(dataBaru);


        // Simpan dan tampilkan
        simpanData();

        tampilkanData();

        updateStatistik();


        // Mengosongkan form
        formAbsensi.reset();


        alert(
            "Absensi berhasil disimpan!"
        );

    }
);


// ==========================================
// SIMPAN DATA
// ==========================================

function simpanData() {

    localStorage.setItem(
        "dataAbsensi",
        JSON.stringify(dataAbsensi)
    );

}


// ==========================================
// MENAMPILKAN DATA
// ==========================================

function tampilkanData(
    data = dataAbsensi
) {

    const tabel =
        document.getElementById(
            "tabelAbsensi"
        );


    const emptyState =
        document.getElementById(
            "emptyState"
        );


    // Kosongkan tabel
    tabel.innerHTML = "";


    // Jika tidak ada data
    if (data.length === 0) {

        emptyState.style.display =
            "block";

        return;
    }


    emptyState.style.display =
        "none";


    // Menampilkan semua data
    data.forEach(
        (item, index) => {

            const row =
                document.createElement(
                    "tr"
                );


            let classStatus = "";


            // Menentukan warna status
            if (
                item.status === "Hadir"
            ) {

                classStatus =
                    "status-hadir";

            } else if (
                item.status === "Izin"
            ) {

                classStatus =
                    "status-izin";

            } else if (
                item.status === "Sakit"
            ) {

                classStatus =
                    "status-sakit";

            } else if (
                item.status === "Alpa"
            ) {

                classStatus =
                    "status-alpa";
            }


            row.innerHTML = `

                <td>${index + 1}</td>

                <td>${item.waktu}</td>

                <td>${item.nis}</td>

                <td>
                    <strong>
                        ${item.nama}
                    </strong>
                </td>

                <td>
                    ${item.kelas}
                </td>

                <td>

                    <span
                        class="status ${classStatus}"
                    >
                        ${item.status}
                    </span>

                </td>

                <td>

                    <button
                        class="btn-delete"
                        onclick="hapusData(${item.id})"
                        title="Hapus"
                    >
                        🗑
                    </button>

                </td>

            `;


            tabel.appendChild(row);

        }
    );

}


// ==========================================
// UPDATE STATISTIK
// ==========================================

function updateStatistik() {

    const totalHadir =
        dataAbsensi.filter(
            item =>
                item.status === "Hadir"
        ).length;


    const totalIzin =
        dataAbsensi.filter(
            item =>
                item.status === "Izin"
        ).length;


    const totalSakit =
        dataAbsensi.filter(
            item =>
                item.status === "Sakit"
        ).length;


    const totalAlpa =
        dataAbsensi.filter(
            item =>
                item.status === "Alpa"
        ).length;


    document.getElementById(
        "totalHadir"
    ).textContent =
        totalHadir;


    document.getElementById(
        "totalIzin"
    ).textContent =
        totalIzin;


    document.getElementById(
        "totalSakit"
    ).textContent =
        totalSakit;


    document.getElementById(
        "totalAlpa"
    ).textContent =
        totalAlpa;
}


// ==========================================
// HAPUS SATU DATA
// ==========================================

function hapusData(id) {

    const konfirmasi =
        confirm(
            "Apakah Anda yakin ingin menghapus data absensi ini?"
        );


    if (!konfirmasi) {
        return;
    }


    dataAbsensi =
        dataAbsensi.filter(
            item =>
                item.id !== id
        );


    simpanData();

    tampilkanData();

    updateStatistik();
}


// ==========================================
// HAPUS SEMUA DATA
// ==========================================

document
    .getElementById("hapusSemua")
    .addEventListener(
        "click",
        function() {

            // Jika belum ada data
            if (
                dataAbsensi.length === 0
            ) {

                alert(
                    "Belum ada data untuk dihapus."
                );

                return;
            }


            const konfirmasi =
                confirm(
                    "PERINGATAN!\n\n" +
                    "Semua data absensi akan dihapus.\n" +
                    "Apakah Anda yakin?"
                );


            if (!konfirmasi) {
                return;
            }


            // Hapus semua data
            dataAbsensi = [];


            simpanData();

            tampilkanData();

            updateStatistik();


            alert(
                "Semua data absensi berhasil dihapus."
            );

        }
    );


// ==========================================
// PENCARIAN DATA
// ==========================================

document
    .getElementById("search")
    .addEventListener(
        "input",
        function() {

            const keyword =
                this.value
                    .toLowerCase();


            const hasil =
                dataAbsensi.filter(
                    item => {

                        return (

                            item.nama
                                .toLowerCase()
                                .includes(
                                    keyword
                                )

                            ||

                            item.nis
                                .toLowerCase()
                                .includes(
                                    keyword
                                )

                            ||

                            item.kelas
                                .toLowerCase()
                                .includes(
                                    keyword
                                )

                        );

                    }
                );


            tampilkanData(hasil);

        }
    );


// ==========================================
// JALANKAN SAAT HALAMAN DIBUKA
// ==========================================

tampilkanData();

updateStatistik();