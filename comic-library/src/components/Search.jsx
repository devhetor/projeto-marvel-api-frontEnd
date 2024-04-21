import { useState } from "react";
import "../styles/Search.scss";
import Characters from "./Characters";
import Comics from "./Comics";
import Creators from "./Creators";

export default function Search() {
  const [characterData, setCharacterData] = useState(null);
  const [comicData, setComicData] = useState(null);
  const [creatorsData, setCreatorsData] = useState(null);
  const [characterName, setCharacterName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    getCharacterData();
  };

  const getCharacterData = () => {
    setCharacterData(null);
    setComicData(null);

    const url = 'http://localhost:3000/characters';

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setCharacterData(result);
      })
      .catch(() => {
        console.log("error while getting character data");
      });
  };

  const getAllComicData = () => {
    setCharacterData(null);
    setComicData(null);

    const url = 'http://localhost:3000/comics';

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setComicData(result);
      })
      .catch(() => {
        console.log("error while getting character data");
      });
  };

  const getAllCreatorsData = () => {
    setCharacterData(null);
    setComicData(null);
    setCreatorsData(null);


    const url = 'http://localhost:3000/creators';

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setComicData(result);
      })
      .catch(() => {
        console.log("error while getting character data");
      });
  };

  //TODO

  // const getComicData = (characterId) => {
  //   window.scrollTo({ top: 0, left: 0 });

  //   const url = `http://localhost:3000/characters/${characterId}`;

  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setComicData(result);
  //     })
  //     .catch(() => {
  //       console.log("error while getting comic data");
  //     });
  // };

  const handleChange = (event) => {
    setCharacterName(event.target.value);
  };

  const handleReset = () => {
    setCharacterName("");
    setCharacterData(null);
    setComicData(null);
    setCreatorsData(null);
  };

  return (
    <>

      <img className="img" src="https://static.wikia.nocookie.net/logocomics/images/d/d2/1602%282003-2004%29.png" alt="logo" />
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter character name"
          onChange={handleChange}
        />
        <div className="buttons">
          <button type="submit">Characters</button>
          <button type="submit" onClick={getAllComicData}>Comics</button>
          <button type="submit" onClick={getAllCreatorsData}>Creators</button>
          <button type="reset" className="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>


      {!comicData && characterData && characterData[0] && (
        <Characters data={characterData} onClick={getAllComicData} /> //TODO
      )}

      {comicData && comicData[0] && (
        <Comics data={comicData} onClick={getAllComicData} />
      )}

      {creatorsData && creatorsData[0] && (
        <Creators data={creatorsData} onClick={getAllCreatorsData} />
      )}
    </>
  );
}
