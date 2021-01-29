<script>
  import { apiUrl, numberOfQuestions } from "./store.js";

  let categories = getCategories();
  let numQuestions = 10;
  let selectedCategory;
  let selectedDifficulty;
  let difficulties = ["Any", "Easy", "Medium", "Hard"];
  let apiString;

  async function getCategories() {
    const res = await fetch("https://opentdb.com/api_category.php");
    const categories = await res.json();
    return categories.trivia_categories;
  }

  function handleSubmit() {
    let apiCat = "";
    let apiDiff = "";

    if (selectedCategory && selectedCategory !== "All") {
      apiCat = `&category=${selectedCategory}`;
    }

    if (selectedDifficulty && selectedDifficulty !== "any") {
      apiDiff = `&difficulty=${selectedDifficulty}`;
    }

    apiString = `https://opentdb.com/api.php?amount=${numQuestions}&type=multiple${apiCat}${apiDiff}`;
    apiUrl.set(apiString);
    numberOfQuestions.set(numQuestions);
  }
</script>

<style>

</style>

<h2>Generate New Quiz</h2>

<form on:submit|preventDefault={handleSubmit}>

  <label for="number-questions">Number of questions?</label>
  <input
    type="number"
    id="number-questions"
    name="number-questions"
    min="1"
    max="50"
    bind:value={numQuestions} />

  <label for="category-select">Choose Category</label>
  <p>
    Only 1 Category can be requested per API Call. To get questions from all
    categories, select "All"
  </p>

  {#await categories}
    Getting categories..
  {:then data}
    <select bind:value={selectedCategory}>
      <option value={'All'}>All</option>
      {#each data as category}
        <option value={category.id}>{category.name}</option>
      {/each}
    </select>
  {/await}

  <label for="difficulty">Choose Difficulty</label>
  <select bind:value={selectedDifficulty}>
    {#each difficulties as difficulty}
      <option value={difficulty.toLowerCase()}>{difficulty}</option>
    {/each}
  </select>

  <button type="submit">Generate Quiz</button>
</form>
