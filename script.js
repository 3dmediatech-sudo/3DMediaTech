const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

const loadButton = document.getElementById('loadVideo');
if (loadButton) {
  loadButton.addEventListener('click', function () {
    const input = document.getElementById('videoLink');
    const box = document.getElementById('videoBox');
    const link = input.value.trim();
    let videoId = '';

    if (link.includes('youtube.com/watch?v=')) {
      videoId = link.split('v=')[1].split('&')[0];
    } else if (link.includes('youtu.be/')) {
      videoId = link.split('youtu.be/')[1].split('?')[0];
    } else {
      alert('Only approved media links are supported in this demo.');
      return;
    }

    box.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  });
}
