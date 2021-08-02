// React
import React from "react";

// MUI
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const modulePreviews = [
  {
    img: "https://www.involve.me/assets/images/blog/how-to-create-a-simple-price-calculator-and-capture-more-leads/calculator-M.png",
    title: "Calculator",
    description: "this is a calculator. cool!",
    to: "/calculator",
    cols: 1,
  },
  {
    img: "none",
    title: "Image",
    description: "description",
    to: "/something",
    cols: 2,
  },
  {
    img: "none",
    title: "Image",
    description: "description",
    to: "/something",
    cols: 1,
  },
  {
    img: "none",
    title: "Image",
    description: "description",
    to: "/something",
    cols: 1,
  },
  {
    img: "none",
    title: "Image",
    description: "description",
    to: "/something",
    cols: 1,
  },
];

const ModulesPicker = (props) => {
  return (
    <div>
      <GridList cellHeight={160} cols={3}>
        {React.Children.toArray(
          modulePreviews.map((preview) => (
            <GridListTile
              cols={preview.cols || 1}
              onClick={() => console.log("Click")}
              style={{ cursor: "pointer" }}
            >
              <img src={preview.img} alt={preview.title} />
              <GridListTileBar
                title={preview.title}
                subtitle={preview.description}
              />
            </GridListTile>
          ))
        )}
      </GridList>
    </div>
  );
};

export default ModulesPicker;
