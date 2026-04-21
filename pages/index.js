import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [loading, setLoading] = useState(false);

  const getDownloadLink = async () => {
    if (!url) return alert("Paste a link first!");
    setLoading(true);
    setVideoLink(''); // Reset link while loading
    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.downloadUrl) setVideoLink(data.downloadUrl);
      else alert("Check the link or API key!");
    } catch (err) {
      alert("Error fetching video");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="flex-grow flex flex-col items-center justify-center w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-pink-500 text-center">TikTok Downloader</h1>
        
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full">
          <input 
            className="w-full p-4 rounded bg-gray-700 border border-gray-600 mb-4 outline-none focus:border-pink-500 text-white text-lg" 
            placeholder="Paste TikTok Link..." 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button 
            onClick={getDownloadLink}
            className="w-full bg-pink-600 py-4 rounded-xl font-bold text-xl hover:bg-pink-700 transition active:scale-95"
          >
            {loading ? 'Processing...' : 'Get Video'}
          </button>
        </div>

        {videoLink && (
          <div className="mt-10 w-full flex flex-col items-center animate-fade-in">
             {/* THE BIG DOWNLOAD BUTTON */}
             <a 
                href={videoLink} 
                download="tiktok-video.mp4"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full text-center bg-green-500 hover:bg-green-600 text-white px-6 py-8 rounded-2xl font-black text-2xl shadow-2xl transition-all active:scale-95 border-4 border-white"
             >
                📥 CLICK TO SAVE VIDEO
             </a>
             
             <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-dashed border-gray-600 text-center">
                <p className="text-yellow-400 font-bold mb-2">iPhone/Android Tip:</p>
                <p className="text-gray-300 text-sm">
                  If the video just starts playing, <b>long-press</b> the video and select <b>"Download Video"</b> or <b>"Save to Files"</b>.
                </p>
             </div>
          </div>
        )}
      </div>

      <footer className="w-full text-center py-6 text-gray-500 text-sm border-t border-gray-800 mt-10">
        <p>© {new Date().getFullYear()} nimuthusanira. All rights reserved.</p>
      </footer>
    </div>
  );
}
