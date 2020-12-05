import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useAuthedAxiosManual } from "../../hooks/useAuthedAxiosManual";
import { baseApiUrl } from "../../util/baseApiUrl";

const CreateRecipe = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [prepSteps, setPrepSteps] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [newPrepStep, setNewPrepStep] = useState("");

  const [
    { data: recipe, loading: recipeLoading, error: recipeError },
    execute,
  ] = useAuthedAxiosManual({});

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNewIngredientChange = (e) => {
    setNewIngredient(e.target.value);
  };

  const addNewIngredient = () => {
    setNewIngredient(ingredients.push(newIngredient));
    setNewIngredient("");
  };

  const handleNewPrepStep = (e) => {
    setNewPrepStep(e.target.value);
  };

  const addNewPrepStep = () => {
    setNewPrepStep(prepSteps.push(newPrepStep));
    setNewPrepStep("");
  };

  const createRecipe = () => {
    execute({
      url: baseApiUrl() + "/createRecipe",
      method: "post",
      data: { name, ingredients, prep: prepSteps },
    });
  };

  return (
    <div>
      <TextField
        variant="outlined"
        id="recipeString"
        label="Recipe Name"
        name="recipeString"
        value={name}
        onChange={handleNameChange}
        fullWidth
      />
      {ingredients.map((ingredient) => (
        <div>{ingredient}</div>
      ))}
      <TextField
        variant="outlined"
        id="newIngredientString"
        label="New Ingredient"
        name="new Ingredient"
        value={newIngredient}
        onChange={handleNewIngredientChange}
        fullWidth
        onKeyPress={(ev) => {
          if (ev.key === "Enter") {
            addNewIngredient();
            ev.preventDefault();
          }
        }}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={addNewIngredient}
        disabled={newIngredient === ""}
      >
        Add Ingredient
      </Button>
      {prepSteps.map((prepStep) => (
        <div>{prepStep}</div>
      ))}
      <TextField
        variant="outlined"
        id="prepStepString"
        label="New Prep Step"
        name="new prep step"
        value={newPrepStep}
        onChange={handleNewPrepStep}
        fullWidth
        onKeyPress={(ev) => {
          if (ev.key === "Enter") {
            addNewPrepStep();
            ev.preventDefault();
          }
        }}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={addNewPrepStep}
        disabled={newPrepStep === ""}
      >
        Add Prep Step
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={createRecipe}
        disabled={name === ""}
      >
        Create Recipe
      </Button>
    </div>
  );
};

export default CreateRecipe;
