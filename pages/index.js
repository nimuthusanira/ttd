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
        alert(data.error || "Could not fetch video. Try another link.");
      }
    } catch (err) {
      alert("System Error. Please try again later.");
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
          <div className="mt-10 w-full animate-bounce">
             <a 
                href={videoLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center bg-green-500 text-white py-6 rounded-2xl font-black text-xl shadow-lg border-2 border-white"
             >
                DOWNLOAD NOW
             </a>
          </div>
        )}
      </div>

      <footer className="w-full text-center py-6 text-gray-500 text-sm border-t border-gray-800">
        <p>© {new Date().getFullYear()} nimuthusanira. All rights reserved.</p>
      </footer>
    </div>
  );
}
