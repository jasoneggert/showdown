import React, { Suspense } from 'react';
import {
  Card,
  CardActions,
  Button
} from '@material-ui/core';
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
                <img src={recipe.image}  alt='recipe' />
              </Suspense>
            </ImageContainer>
          </Row>
        </CardContent>
        <Actions>
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
        </Actions>
      </GridCard>
  );
};

const Actions = styled(CardActions)`
  margin-top: 8px;
`;

const GridCard = styled.div`
    padding: 24px 24px 0 24px;
`;

const CardContent = styled.div`
  min-height: 216px;
  position: relative;
  margin-top: 12px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 24px;
  word-break: break-all;
  font-family: 'EB Garamond', serif;
  font-weight: 200;
  padding: 24px;
  border-top: 1px solid #C1C1C1;
  border-bottom: 1px solid #C1C1C1;
  width: 65%;
  height: 226px;
  margin-right: 24px;

`;

export default RecipeCard;
