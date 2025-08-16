import { useEffect, useState } from "preact/hooks";
import DocumentationCard from "./DocumentationCard";
import { supabase } from "../../lib/supabase";

type DocProps = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
};

export default function DocumentationCardDB() {
  const [docs, setDocs] = useState<DocProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocs() {
      const { data, error } = await supabase.from("documents").select("*");
      if (!error && data) {
        // Mapping kolom database ke props komponen
        const mapped = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.content,      // content -> description
          imageUrl: item.thumbnail,       // thumbnail -> imageUrl
          link: item.url,                 // url -> link
        }));
        setDocs(mapped);
      }
      setLoading(false);
    }
    fetchDocs();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div class="space-y-8">
      {docs.map((doc) => (
        <DocumentationCard
          key={doc.id}
          title={doc.title}
          description={doc.description}
          imageUrl={doc.imageUrl}
          link={doc.link}
        />
      ))}
    </div>
  );
}