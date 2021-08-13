// React
import React, { useState } from "react";
import { Link } from "react-router-dom";

// MUI
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const modulePreviews = [
  {
    img: "https://www.involve.me/assets/images/blog/how-to-create-a-simple-price-calculator-and-capture-more-leads/calculator-M.png",
    title: "Calculator",
    description: "this is a calculator. cool!",
    to: "/modules/calculator",
    cols: 1,
  },
  {
    img: "https://www.laarchaeology.org/wp-content/uploads/2017/11/science.jpg",
    title: "Science",
    description: "Science test this does nothing rn",
    to: "/science",
    cols: 2,
  },
  {
    img: "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2021/01/how-to-write-conclusion-for-essay.jpg",
    title: "Essay Editor",
    description: "Its like a code editor, but for essays!",
    to: "/essay-editor",
    cols: 1,
  },
  {
    img: "https://i.all3dp.com/cdn-cgi/image/fit=cover,w=360,gravity=0.5x0.5,format=auto/wp-content/uploads/2018/01/26171647/Academo.png",
    title: "3d Graphing Calculator",
    description: "Self-explanitory...",
    to: "/3d-graph-calc",
    cols: 1,
  },
  {
    img: "https://achieve.lausd.net//cms/lib/CA01000043/Centricity/Domain/4/announcements%20new%20size_backtoschool.png",
    title: "Back to school?",
    description:
      "Back to school test this does nothing, just like everything else!",
    to: "/something",
    cols: 1,
  },
];

const ModulesPicker = (props) => {
  const [module, setModule] = useState(0);

  const handleModuleClicked = (index) => {
    setModule(index);
  };

  return (
    <div>
      <div
        style={{
          maxWidth: "90vw",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 50,
        }}
      >
        <Typography variant="h1" color="textPrimary">
          {"Select a Module"}
        </Typography>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={5}>
            <GridList style={{ flex: 3 }} cellHeight={160} cols={3}>
              {React.Children.toArray(
                modulePreviews.map((preview, index) => (
                  <GridListTile
                    cols={preview.cols || 1}
                    onClick={() => handleModuleClicked(index)}
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
          </Grid>
          <Grid item xs={12} sm={12} md={7}>
            <Card style={{ width: "100%" }}>
              <Typography variant="h2" color="textPrimary">
                {"Module Preview"}
              </Typography>
              <div>{module}</div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ModulesPicker;
