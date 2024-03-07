function downloadVideo() {
    const videoUrl = document.getElementById('videoUrl').value;
    if (videoUrl) {
      window.location.href = `/download?url=${encodeURIComponent(videoUrl)}`;
    } else {
      alert('Please enter a valid YouTube video URL');
    }
  }
  