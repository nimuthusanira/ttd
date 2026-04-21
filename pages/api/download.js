export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'POST only' });

  const { url } = req.body;

  const options = {
    method: 'GET',
    headers: {
      // I cleaned up your key here!
      'X-RapidAPI-Key': 'c49f77c2fdmshe42122116cf49edp1a212djsn80c7fad78e04', 
      'X-RapidAPI-Host': 'tiktok-video-no-watermark2.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(`https://tiktok-video-no-watermark2.p.rapidapi.com/?url=${url}`, options);
    const result = await response.json();
    
    // Some APIs return data differently, let's make sure we catch the link
    if (result.data && result.data.play) {
      res.status(200).json({ downloadUrl: result.data.play });
    } else {
      console.log("API Response:", result); // This helps us debug in the terminal
      res.status(400).json({ error: 'Video not found or API limit reached' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
}