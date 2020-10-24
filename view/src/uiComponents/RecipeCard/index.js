import React, { Suspense } from 'react';
import {
  Card,
  CardActions,
  Divider,
  Button,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import dayjs from 'dayjs';
import styled from 'styled-components';

const RecipeCard = ({ key, recipe }) => {

  return (
    <Grid item xs={12} sm={6} key={key}>
      <Card variant="outlined" elevation={2}>
        <CardContent>


          <ImageContainer>
            <Suspense>
              <img src={recipe.image} />
            </Suspense>
          </ImageContainer>
          <RecipeTitle>
            {recipe.name}
          </RecipeTitle>

          {/* {dayjs(recipe.createdAt).fromNow()} */}
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => this.handleViewOpen({ recipe })}
          >
            View
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => this.handleEditClickOpen({ recipe })}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => this.deleterecipeHandler({ recipe })}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

const CardContent = styled.div`
  min-height: 216px;
  padding: 24px;
  position: relative;

`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 177px;
  overflow: hidden;
  object-fit: fill;
  position: absolute;
  left: 0px;
  top: 0px;
  img {
    width: 100%;
  }
`;

const RecipeTitle = styled.div`
  margin-top: 164px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 17px;
  word-break: break-all;
  width: 100%;
  font-family: 'Commissioner', sans-serif;
  font-weight: 500;
`;

export default RecipeCard;
