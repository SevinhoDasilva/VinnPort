const form = document.getElementById('contactForm');
if (form) form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`Pesan portofolio dari ${data.get('name')}`);
  const body = encodeURIComponent(`Nama: ${data.get('name')}\nEmail: ${data.get('email')}\n\nPesan:\n${data.get('message')}`);
  window.location.href = `mailto:vinvin140107@gmail.com?subject=${subject}&body=${body}`;
});