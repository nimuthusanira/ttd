import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [loading, setLoading] = useState(false);

  const getDownloadLink = async () => {
    if (!url) return alert("Paste a link first!");
    setLoading(true);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white relative">
      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center w-full">
        <h1 className="text-4xl font-bold mb-8 text-pink-500">TikTok Downloader</h1>
        
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-96">
          <input 
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 mb-4 outline-none focus:border-pink-500 text-white" 
            placeholder="Paste TikTok Link..." 
            onChange={(e) => setUrl(e.target.value)}
          />
          <button 
            onClick={getDownloadLink}
            className="w-full bg-pink-600 py-3 rounded font-bold hover:bg-pink-700 transition"
          >
            {loading ? 'Processing...' : 'Get Video'}
          </button>
        </div>

        {videoLink && (
          <div className="mt-8 flex flex-col items-center">
             <a href={videoLink} target="_blank" className="bg-green-500 px-8 py-4 rounded-full font-bold animate-bounce shadow-lg">
                DOWNLOAD NOW
             </a>
             <p className="text-gray-400 text-sm mt-4">If it opens in a new tab, right-click and "Save As"</p>
          </div>
        )}
      </div>

      {/* Footer with your Copyright */}
      <footer className="w-full text-center py-6 text-gray-500 text-sm border-t border-gray-800">
        <p>© {new Date().getFullYear()} nimuthusanira. All rights reserved.</p>
      </footer>
    </div>
  );
}