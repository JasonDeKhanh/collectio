import React from "react";

function Page(props) {
  // inside props will have
  // array of AlbumItem

  return (
    <div>
      <h1>hello page</h1>
      {/* return some Paper/Background Item here I guess, maybe something like
      <AlbumBackground props={props}/>
      the props here could be the attributes required for the background, eg. color, patterns blabla whatever

      const items = idk retrieve the array from firesetore

      items.map((item) => {
        <AlbumItem item={item} /> smthing like this
      })
      
        */}
    </div>
  );
}

export default Page;
