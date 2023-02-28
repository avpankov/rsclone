import React, { useEffect, useState } from "react";
import MixesBlock from "../components/MixesBlock";
import { getCategories } from "../api/getCategories";
import { ICategory } from "../components/interfaces/apiInterfaces";

interface IHomePage {
  setPlaylistsID: React.Dispatch<React.SetStateAction<string>>;
  setRandomColor: React.Dispatch<React.SetStateAction<string>>;
  setCategoryID: React.Dispatch<React.SetStateAction<string>>;
  setCategoryName: React.Dispatch<React.SetStateAction<string>>;
}

function HomePage({
  setPlaylistsID,
  setRandomColor,
  setCategoryID,
  setCategoryName,
}: IHomePage) {
  const token = window.localStorage.getItem("token");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function foo() {
      setCategories(await getCategories(token));
    }
    foo();
  }, [token]);

  const getTenRandomCategories = () => {
    let arr = [...categories];
    let newArr: never[] = [];
    for (let i = 0; i < 10; i++) {
      let random = Math.floor(Math.random() * (10 - i)) + i;
      newArr.push(arr[random]);
      let category = arr[random];
      arr[random] = arr[i];
      arr[i] = category;
    }
    return newArr;
  };

  let homePageCategory: ICategory[] = [];

  if (categories.length > 0) {
    homePageCategory = getTenRandomCategories();
  }

  return (
    <div className="home-page">
      {homePageCategory.length > 0
        ? homePageCategory.map((category: ICategory) => {
            return (
              <MixesBlock
                name={category.name}
                categoryID={category.id}
                setPlaylistsID={setPlaylistsID}
                setRandomColor={setRandomColor}
                setCategoryID={setCategoryID}
                setCategoryName={setCategoryName}
                key={category.name}
              />
            );
          })
        : ""}
    </div>
  );
}

export default HomePage;
