import React, { Suspense } from 'react';
import {
  Card,
  CardActions,
  Button
} from '@material-ui/core';
import dayjs from 'dayjs';
import styled from 'styled-components';

const RecipeCard = ({ key, recipe, openView, openEdit, deleteRecipe }) => {
  const handleViewOpen = () => {
    openView(recipe)
  }

  const handleEditClickOpen = () => {
    openEdit(recipe)
  }

  const deleterecipeHandler = () => {
    deleteRecipe(recipe)
  }
  return (
      <GridCard>
        <CardContent>
          <Row>
            <RecipeTitle>
              {recipe.name}
            </RecipeTitle>
            <ImageContainer>
              <Suspense>
                <img src={recipe.image} />
              </Suspense>
            </ImageContainer>
          </Row>
          {/* {dayjs(recipe.createdAt).fromNow()} */}
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={handleViewOpen}
          >
            View
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={handleEditClickOpen}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={deleterecipeHandler}
          >
            Delete
          </Button>
        </CardActions>
      </GridCard>
  );
};

const GridCard = styled(Card)`
    padding: 24px 24px 0 24px;
`;

const CardContent = styled.div`
  min-height: 216px;
  position: relative;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const ImageContainer = styled.div`
  width: 40%;
  height: 226px;
  overflow: hidden;
  object-fit: fill;
  padding: 0 15px;
  img {
    height: 100%;
  }
`;

const RecipeTitle = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 24px;
  word-break: break-all;
  font-family: 'EB Garamond', serif;
  font-weight: 500;
  width: 65%;
`;

export default RecipeCard;
