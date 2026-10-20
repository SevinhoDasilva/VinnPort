VINNFOLIO — PROFESSIONAL & PLAYFUL PERSONAL PORTFOLIO
======================================

CARA MENJALANKAN
1. Ekstrak ZIP ini.
2. Buka folder vinnfolio-portfolio di VS Code.
3. Klik kanan index.html lalu pilih "Open with Live Server".
   Jika belum ada, instal extension "Live Server" di VS Code.
4. Pastikan koneksi internet aktif untuk memuat font Google.

CARA MENAMBAHKAN FOTO PRIBADI
1. Siapkan foto JPG/JPEG atau PNG.
2. Salin foto ke folder assets/photos/.
3. Buka js/gallery.js.
4. Di dalam array `photos`, tambahkan objek seperti contoh:
   { file: 'assets/photos/foto-kamu.jpg', title: 'Nama Foto',
     category: 'street', description: 'Deskripsi singkat', demo: false },
5. Pastikan nama file sama persis, termasuk huruf besar/kecil.
6. Untuk mengganti foto demo, edit objek yang ada: ubah file, title,
   category, description, dan ganti demo: true menjadi demo: false.
7. Simpan file dan refresh browser.

KATEGORI FOTO
- street
- nature
- daily


CATATAN
- Foto demo hanya placeholder desain; foto asli belum disertakan.
- Kontak email dan Instagram dapat diubah di contact.html.
- Untuk mempublikasikan, unggah seluruh isi folder ke GitHub Pages.


