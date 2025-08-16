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

  async function fetchDocs() {
    const { data, error } = await supabase.from("Dokumentasi").select("*");
    if (error) {
      console.error("Fetch error:", error.message);
    } else {
      const mapped = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.content,
        imageUrl: item.thumbnail,
        link: item.url,
      }));
      setDocs(mapped);
      console.log("Fetch success:", mapped);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchDocs();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("documents-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Dokumentasi" },
        (payload) => {
          console.log("Realtime event:", payload.eventType, payload.new);
          fetchDocs();
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("Realtime subscription active");
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
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