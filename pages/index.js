import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [loading, setLoading] = useState(false);

  const getDownloadLink = async () => {
    if (!url) return alert("Please paste a link!");
    setLoading(true);
    setVideoLink('');
    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.downloadUrl) {
        setVideoLink(data.downloadUrl);
      } else {
        alert("Check the API key or video link.");
      }
    } catch (err) {
      alert("System error. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 font-sans">
      <div className="flex-grow flex flex-col items-center justify-center w-full max-w-md">
        <h1 className="text-3xl font-bold mb-10 text-pink-500 uppercase">TikTok Downloader</h1>
        
        <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl w-full border border-gray-700">
          <input 
            className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 mb-4 outline-none focus:border-pink-500 text-white" 
            placeholder="Paste TikTok link here..." 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button 
            onClick={getDownloadLink}
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 py-4 rounded-xl font-bold text-lg transition active:scale-95 disabled:opacity-50"
          >
            {loading ? 'PLEASE WAIT...' : 'GET VIDEO'}
          </button>
        </div>

        {videoLink && (
          <div className="mt-8 w-full flex flex-col items-center">
             {/* Built-in Player for Mobile Browsers to "See" the file */}
             <video 
                src={videoLink} 
                controls 
                className="w-full rounded-xl shadow-lg border-2 border-gray-700 mb-6"
                style={{ maxHeight: '300px' }}
             />
             
             <a 
                href={videoLink} 
                download="tiktok_video.mp4"
                target="_self" 
                className="block w-full text-center bg-green-500 text-white py-6 rounded-2xl font-black text-xl shadow-lg border-2 border-white active:bg-green-600"
             >
                CLICK TO DOWNLOAD
             </a>
             
             <p className="mt-4 text-gray-400 text-sm text-center">
                If the button just plays the video, <b>long-press the video above</b> and select <b>"Save Video"</b>.
             </p>
          </div>
        )}
      </div>

      <footer className="w-full text-center py-6 text-gray-500 text-sm border-t border-gray-800">
        <p>© {new Date().getFullYear()} nimuthusanira. All rights reserved.</p>
      </footer>
    </div>
  );
}
