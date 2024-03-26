'use client'
import React, { useEffect, useState } from 'react';
import {fetchSheetData, updateSheetData, deleteSheetData} from "./fetch_data"

interface Shortcuts {
  [shortcut: string]: string;
}


const TextExpander: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [shortcuts, setShortcuts] = useState<Shortcuts>({});
  const [shortcut, setShortcut] = useState<string>('');
  const [expansion, setExpansion] = useState<string>('');

  useEffect(() => {
    console.log("useEffect");
    fetchSheetData().then((data) => {
      const newShortcuts: Shortcuts = {};
      console.log(data);
      data?.forEach((row) => {
        newShortcuts[row[0]] = row[1];
      });
      setShortcuts(newShortcuts);
    });
  }, []);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    const words = value.split(/\s+/);
    const lastWord = words[words.length - 2]; // Get the second last word (before the space)

    if (lastWord && shortcuts[lastWord]) {
      words[words.length - 2] = shortcuts[lastWord]; // Replace shortcut with expansion
      setText(words.join(' ') + ' '); // Rejoin words and add trailing space
    } else {
      setText(value);
    }
  };

  const addShortcut = () => {
    if (shortcut && expansion) {
      setShortcuts({ ...shortcuts, [shortcut]: expansion });
      setShortcut('');
      setExpansion('');
      updateSheetData(shortcut, expansion);
    }
  }
  const deleteShortcut = (shortcut: string) => {
    const newShortcuts = { ...shortcuts };
    delete newShortcuts[shortcut];
    setShortcuts(newShortcuts);
    deleteSheetData(shortcut);
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Type here..."
        rows={20}
        cols={80}
        className="text-black dark:text-black bg-white mx-5"
      />
      <div>
        <input
          type="text"
          value={shortcut}
          onChange={(e) => setShortcut(e.target.value)}
          placeholder="Shortcut"
          className="text-black dark:text-black bg-white mx-5"
        />
        <input
          type="text"
          value={expansion}
          onChange={(e) => setExpansion(e.target.value)}
          placeholder="Expansion"
          className="text-black dark:text-black bg-white mx-5"
        />
        <button onClick={addShortcut}>Add Shortcut</button>
      </div>
      <ul className="mx-5">
        {Object.entries(shortcuts).map(([key, value]) => (
          <li key={key}>
            {key} -&gt; {value}
            <button 
              onClick={()=>deleteShortcut(key)}
              className="mx-20 text-black bg-white my-5 items-end">
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TextExpander;