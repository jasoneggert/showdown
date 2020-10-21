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
      <Card variant="outlined">
        <CardContent>
          <Row>

            <ImageContainer>
              <Suspense>
                <img src={recipe.image} />
              </Suspense>
            </ImageContainer>
            <RecipeTitle>
              {recipe.name}
            </RecipeTitle>
          </Row>

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
  min-height: 150px;
  padding: 24px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const ImageContainer = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  object-fit: fill;
  border-radius: 50%;
  margin-right: 24px;
  img {
    height: 40px;
  }
`;

const RecipeTitle = styled.div`
    display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-width: 150px;
  font-size: 16px;
`;

export default RecipeCard;
