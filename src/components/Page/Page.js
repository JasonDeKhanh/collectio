import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStylesPaper = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: 1280,
      height: 720,
    },
  },
}));

function Page(props) {
  // inside props will have
  // array of AlbumItem
  const paperClasses = useStylesPaper();

  return (
    <div>
      {/* return some Paper/Background Item here I guess, maybe something like
      <AlbumBackground props={props}/>
      the props here could be the attributes required for the background, eg. color, patterns blabla whatever

      const items = idk retrieve the array from firesetore

      items.map((item) => {
        <AlbumItem item={item} /> smthing like this
      })
        */}

      {/* Paper size and stuff depends on album orientation */}
      <div className={paperClasses.root}>
        <Paper elevation={18} />
      </div>
    </div>
  );
}

export default Page;
