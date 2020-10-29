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
    <VaporBorder>
      <Card>
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
      </Card>
    </VaporBorder>
  );
};


const VaporBorder = styled.div`
  border: 3px solid #3f51b5;
  border-radius: 6px;
  box-shadow: 0 2.8px 2.2px  rgba(1, 203, 254, 0.38),
  0 6.7px 5.3px  rgba(1, 203, 254, 0.38),
  0 12.5px 3px  rgba(1, 203, 254, 0.38),
  0 12.3px 7.9px  rgba(1, 203, 254, 0.38),
  0 21.8px 23.4px  rgba(1, 203, 254, 0.38),
  0 50px 30px  rgba(1, 203, 254, 0.38)

`;

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
