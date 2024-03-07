const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/download', async (req, res) => {
  try {
    const videoUrl = req.query.url;
    if (!ytdl.validateURL(videoUrl)) {
      return res.status(400).send('Invalid YouTube URL');
    }

    const info = await ytdl.getInfo(videoUrl);
    const formats = ytdl.filterFormats(info.formats, 'videoandaudio');

    if (formats.length === 0) {
      return res.status(400).send('No suitable formats found for the video');
    }

    const videoFormat = formats[0];
    res.header('Content-Disposition', `attachment; filename="${info.title}.mp4"`);
    ytdl(videoUrl, { format: videoFormat })
      .pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
