document.addEventListener("DOMContentLoaded", function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainVideo = document.getElementById('main-video');
    const mainVideoSource = document.getElementById('main-video-source');
    const videoTitle = document.getElementById('video-title');
    const backToIntroButton = document.getElementById('back-to-intro');

    const introVideoSrc = '../assents/videos/Banner tutoriais.mp4';
    const introVideoTitle = 'Vídeo Introdução';

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const videoSrc = thumbnail.getAttribute('data-video-src');
            const videoTitleText = thumbnail.getAttribute('data-video-title');
            mainVideo.classList.add('loading');
            setTimeout(() => {
                mainVideoSource.src = videoSrc;
                mainVideo.load();
                mainVideo.play();
                mainVideo.classList.remove('loading');
                videoTitle.textContent = videoTitleText;
                backToIntroButton.style.display = 'block';
            }, 300); // Tempo da animação de transição
        });
    });

    backToIntroButton.addEventListener('click', function() {
        mainVideo.classList.add('loading');
        setTimeout(() => {
            mainVideoSource.src = introVideoSrc;
            mainVideo.load();
            mainVideo.play();
            mainVideo.classList.remove('loading');
            videoTitle.textContent = introVideoTitle;
            backToIntroButton.style.display = 'none';
        }, 300); // Tempo da animação de transição
    });
});
