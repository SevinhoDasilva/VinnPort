
const photos = [
  { file: 'assets/photos/WhatsApp Image 2026-10-20 at 18.00.18.jpeg', title: 'Golden Hour', category: 'nature', description: 'Cahaya Pagi', demo: false },
  { file: 'assets/photos/WhatsApp Image 2026-10-20 at 18.00.17.jpeg', title: 'Cool Style', category: 'daily', description: 'Gaya dikit ', demo: false },
  { file: 'assets/photos/WhatsApp Image 2026-10-20 at 18.00.19.jpeg', title: 'Music Day', category: 'daily', description: 'Cerita kecil sehari-hari', demo: false },
  { file: 'assets/photos/WhatsApp Image 2026-10-20 at 18.00.1911111.jpeg', title: 'College Student', category: 'daily', description: 'Menemukan Diri sendiri', demo: false },
  { file: 'assets/photos/WhatsApp Image 2026-10-20 at 18.00.1822222.jpeg', title: 'Chill Style', category: 'daily', description: 'Sesudah kesibukan harus ada foto', demo: false },
  { file: 'assets/photos/WhatsApp Image 2026-10-20 at 18.00.163333.jpeg', title: 'Little Things', category: 'daily', description: 'Momen yang ingin disimpan', demo: false }
];
const grid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
let activePhotos = photos.filter(p => !p.demo), activeIndex = 0;

function cardMarkup(photo, index) {
  const fallback = `<div class="photo-fallback fallback-${index % 6}"><span>VINN / FRAME ${String(index + 1).padStart(2, '0')}</span><b>✳</b></div>`;
  return `<article class="gallery-card" data-category="${photo.category}" data-index="${index}">
    <button class="gallery-open" aria-label="Lihat ${photo.title}">
      ${photo.demo ? fallback : `<img src="${photo.file}" alt="${photo.title}" loading="lazy" onerror="this.outerHTML='${fallback.replace(/'/g, "&#39;")}'">`}
      <span class="gallery-open-icon">↗</span>
    </button>
    <div class="gallery-card-meta"><div><p>${photo.category.toUpperCase()} / FRAME ${String(index + 1).padStart(2, '0')}</p><h3>${photo.title}</h3><span>${photo.description}</span></div><span class="gallery-card-arrow">↗</span></div>
  </article>`;
}
function renderGallery(filter = 'all') {
  const shown = photos.map((photo, index) => ({ ...photo, originalIndex: index })).filter(photo => filter === 'all' || photo.category === filter);
  grid.innerHTML = shown.map((p, i) => cardMarkup(p, p.originalIndex)).join('');
  document.getElementById('photoCount').textContent = `${String(shown.length).padStart(2, '0')} FRAME`;
  grid.querySelectorAll('.gallery-open').forEach(button => button.addEventListener('click', () => openLightbox(Number(button.closest('.gallery-card').dataset.index))));
}
function openLightbox(index) {
  const p = photos[index]; if (!p || p.demo) return;
  activeIndex = index;
  document.getElementById('lightboxImg').src = p.file;
  document.getElementById('lightboxImg').alt = p.title;
  document.getElementById('lightboxCaption').textContent = `${p.title} — ${p.description}`;
  lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false'); document.body.classList.add('no-scroll');
}
function closeLightbox() { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden', 'true'); document.body.classList.remove('no-scroll'); }
document.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); renderGallery(btn.dataset.filter);
}));
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => moveLightbox(-1));
document.getElementById('lightboxNext').addEventListener('click', () => moveLightbox(1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); if (e.key === 'ArrowRight') moveLightbox(1); if (e.key === 'ArrowLeft') moveLightbox(-1); });
function moveLightbox(direction) {
  let i = activeIndex;
  for (let tries = 0; tries < photos.length; tries++) {
    i = (i + direction + photos.length) % photos.length;
    if (!photos[i].demo) { openLightbox(i); return; }
  }
}
renderGallery();