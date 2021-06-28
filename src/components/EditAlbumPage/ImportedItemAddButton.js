import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

const useStylesButton = makeStyles((theme) => ({
  button: {
    width: 70,
    height: 30,
    margin: theme.spacing(1),
  },
}));

function ImportedItemAddButton() {
  const buttonClasses = useStylesButton();

  return (
    <div>
      {/* <IconButton aria-label="share">
        <AddBoxIcon />
      </IconButton> */}
      <Button
        variant="outlined"
        className={buttonClasses.button}
        startIcon={<AddBoxIcon />}
      >
        Add
      </Button>
    </div>
  );
}

export default ImportedItemAddButton;
