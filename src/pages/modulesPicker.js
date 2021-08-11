// React
import React from 'react';

// MUI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const modulePreviews = [
  {
    img: 'https://www.involve.me/assets/images/blog/how-to-create-a-simple-price-calculator-and-capture-more-leads/calculator-M.png',
    title: 'Calculator',
    description: 'this is a calculator. cool!',
    to: '/calculator',
    cols: 1,
  },
  {
    img: 'none',
    title: 'Image',
    description: 'description',
    to: '/something',
    cols: 2,
  },
  {
    img: 'none',
    title: 'Image',
    description: 'description',
    to: '/something',
    cols: 1,
  },
  {
    img: 'none',
    title: 'Image',
    description: 'description',
    to: '/something',
    cols: 1,
  },
  {
    img: 'none',
    title: 'Image',
    description: 'description',
    to: '/something',
    cols: 1,
  },
];

const ModulesPicker = (props) => {
  return (
    <div>
      <div
        style={{ maxWidth: '90vw', marginLeft: 'auto', marginRight: 'auto' }}
      >
        <Typography variant="h1">{'Select a Module'}</Typography>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={5}>
            <GridList style={{ flex: 3 }} cellHeight={160} cols={3}>
              {React.Children.toArray(
                modulePreviews.map((preview) => (
                  <GridListTile
                    cols={preview.cols || 1}
                    onClick={() => console.log('Click')}
                    style={{ cursor: 'pointer' }}
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
            <Card style={{ width: '100%' }}>
              <Typography variant="h2">{'Module Preview'}</Typography>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ModulesPicker;
