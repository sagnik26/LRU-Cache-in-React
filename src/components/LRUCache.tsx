import { useState } from "react";
import useLRUCache from "../hooks/useLRUCache";

interface Loadeddata {
  id: number;
  text: string;
}

const LRUCache = () => {
  const [content, setContent] = useState<Loadeddata[]>([]);
  const { get, put } = useLRUCache(3);

  const loadContent = async (id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const loadedData = {
      id,
      text: `Tab ${id} Data`,
    };
    put(id, loadedData);
    setContent((prev: any) => [...prev, loadedData]);
  };

  const handleBtnClick = (id: number) => {
    const cachedContent = get(id);
    if (cachedContent) {
      console.log(`Content ${id} loaded from cache`);
      // setContent((prev: any[]) => [...prev, cachedContent]);
    } else {
      console.log(`Loading Content ${id}`);
      loadContent(id);
    }
  };

  return (
    <div>
      <h1>LRU Cache</h1>
      <button onClick={() => handleBtnClick(1)}>Tab 1</button>
      <button onClick={() => handleBtnClick(2)}>Tab 2</button>
      <button onClick={() => handleBtnClick(3)}>Tab 3</button>
      <button onClick={() => handleBtnClick(4)}>Tab 4</button>
      <button onClick={() => handleBtnClick(5)}>Tab 5</button>

      <div>
        <h2>Loaded Content</h2>
        <ul>
          {content.map((item: Loadeddata, i: number) => {
            return <li key={i}>{item.text}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default LRUCache;
