import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const getDownloadLink = async () => {
    if (!url) return alert("Paste a link first!");
    setLoading(true);
    setVideoLink('');
    setCopied(false);
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(videoLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="flex-grow flex flex-col items-center justify-center w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-pink-500 text-center uppercase tracking-widest">TTD Pro</h1>
        
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full border border-gray-700">
          <input 
            className="w-full p-4 rounded bg-gray-900 border border-gray-700 mb-4 outline-none focus:border-pink-500 text-white text-lg" 
            placeholder="Paste Link..." 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button 
            onClick={getDownloadLink}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 py-4 rounded-xl font-bold text-xl active:scale-95 transition"
          >
            {loading ? 'SEARCHING...' : 'GET VIDEO'}
          </button>
        </div>

        {videoLink && (
          <div className="mt-8 w-full space-y-4">
             {/* Primary Download */}
             <a 
                href={videoLink} 
                download
                className="block w-full text-center bg-green-600 py-6 rounded-2xl font-black text-xl border-b-4 border-green-800 active:border-b-0 active:translate-y-1 transition-all"
             >
                SAVE TO DEVICE
             </a>

             {/* Secondary Copy Link */}
             <button 
                onClick={copyToClipboard}
                className="w-full bg-gray-700 py-4 rounded-xl font-bold text-gray-200 border border-gray-600 active:bg-gray-600"
             >
                {copied ? '✅ LINK COPIED!' : '🔗 COPY RAW LINK'}
             </button>

             <div className="p-4 bg-blue-900/30 rounded-xl border border-blue-500/50 text-center">
                <p className="text-blue-300 text-sm font-medium">
                  If the Save button opens the player, tap the <b>Share icon</b> on your browser and select <b>"Save to Files"</b> or <b>"Download"</b>.
                </p>
             </div>
          </div>
        )}
      </div>

      <footer className="w-full text-center py-6 text-gray-600 text-xs mt-10">
        <p>© {new Date().getFullYear()} nimuthusanira | Built with Gemini</p>
      </footer>
    </div>
  );
}
