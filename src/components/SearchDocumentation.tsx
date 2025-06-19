import { useEffect, useRef, useState } from 'preact/hooks';
import Fuse from 'fuse.js';
import dokumentasiList from '../data/dokumentasiList';
import DocumentationCard from './DocumentationCard';

export default function SearchDokumentasi() {
  const [results, setResults] = useState(dokumentasiList);
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = new Fuse(dokumentasiList, {
    keys: ['title', 'description', 'id'],
    threshold: 0.3,
  });

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const handleInput = () => {
      const keyword = input.value.trim();
      if (!keyword) {
        setResults(dokumentasiList);
      } else {
        const res = fuse.search(keyword).map(r => r.item);
        setResults(res);
      }
    };

    input.addEventListener('input', handleInput);
    return () => input.removeEventListener('input', handleInput);
  }, []);

  return (
  <div>
    <div className="relative max-w-xl mx-auto mb-10">
      {/* Placeholder buatan */}
      <div
        className="absolute inset-0 px-5 py-3 pointer-events-none text-gray-400 dark:text-gray-500"
        id="fakePlaceholder"
      >
        Mau cari apa?? <span id="scrambleText" className="font-semibold text-primary">Fotomu</span>...?
      </div>

      {/* Input asli */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        id="realInput"
        className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary placeholder-transparent"
      />
    </div>

    <div className="flex flex-col items-center space-y-10">
      {results.map((doc) => (
        <DocumentationCard key={doc.id} {...doc} />
      ))}
    </div>
  </div>
)}
