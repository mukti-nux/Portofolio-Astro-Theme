/** @jsx h */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import DocumentationCard from './DocumentationCard';
import { supabase } from '../utils/supabaseClient';

type DocFromDb = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link: string;
};

export default function SupabaseDocs() {
  const [docs, setDocs] = useState<DocFromDb[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocs() {
      const { data, error } = await supabase.from('documents').select('*');

      if (error) {
        console.error('Error fetching docs:', error);
      } else if (data) {
        setDocs(data);
      }

      setLoading(false);
    }

    fetchDocs();
  }, []);

  if (loading) return <p class="text-center mt-10">Loading...</p>;

  return (
    <div>
      {docs.map((doc) => (
        <DocumentationCard
          key={doc.id}
          title={doc.title}
          description={doc.description}
          imageUrl={doc.image_url}
          link={doc.link}
        />
      ))}
    </div>
  );
}
