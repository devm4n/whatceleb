import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [seenIds, setSeenIds] = useState([]);

  // const API_URL = `${import.meta.env.VITE_API_URL}?seen=${seenIds.join("")}`;
  const API_URL = `${import.meta.env.VITE_API_URL}`;
  console.log(API_URL);

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
        <h2 className="mx-auto text-md flex place-content-center my-4">
          Guess the celeb.
        </h2>
        <div className="image-card mx-auto flex place-content-center w-48 border-4 h-full bg-zinc-400 rounded-md p-4">
          {media.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-4">
              <img
                src={expanded ? item.special_image : item.special_thumbnail}
                alt={item.title}
                width={300}
              />
              {expanded ? (
                <div>
                  <h2 className="mx-auto text-md flex place-content-center my-4">
                    {item.title}
                  </h2>
                  <button onClick={fetchMedia}>NEXT</button>
                </div>
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
