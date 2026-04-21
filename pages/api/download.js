export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'POST only' });

  const { url } = req.body;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c49f77c2fdmshe42122116cf49edp1a212djsn80c7fad78e04', 
      'X-RapidAPI-Host': 'tiktok-video-no-watermark2.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(`https://tiktok-video-no-watermark2.p.rapidapi.com/?url=${encodeURIComponent(url)}`, options);
    const result = await response.json();
    
    // Some APIs return 'data.play', others return 'data.video_url'
    const finalUrl = result?.data?.play || result?.data?.video_url || result?.data?.url;

    if (finalUrl) {
      res.status(200).json({ downloadUrl: finalUrl });
    } else {
      console.error("API Error Response:", result);
      res.status(400).json({ error: 'Video not found. The link might be private or invalid.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server Connection Error' });
  }
}
