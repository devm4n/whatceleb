import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api/media/";

export default function App() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const fetchMedia = () => {
    setLoading(true);
    setExpanded(false);
    axios
      .get(API_URL)
      .then((res) => setMedia(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="w-screen ">
        <h1 className="mx-auto flex place-content-center my-4">
          Guess the celeb.
        </h1>
        <div className="image-card mx-auto flex place-content-center w-2/12 border-4 h-full bg-zinc-400 rounded-md p-4">
          {media.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-4">
              <img
                src={expanded ? item.image : item.thumbnail}
                alt={item.title}
                width={300}
              />
              {expanded ? (
                <button onClick={fetchMedia}>NEXT</button>
              ) : (
                <button onClick={() => setExpanded(true)}>SHOW</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
