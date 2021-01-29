<script>
  // imports
  import { fade, blur, fly, slide, scale } from "svelte/transition";
  import Question from "./Question.svelte";
  import Modal from "./Modal.svelte";
  import { score, apiUrl, numberOfQuestions } from "./store.js";

  //variables
  let activeQuestion = 0;
  let quiz = getQuiz();
  let isModalOpen = false;

  //functions
  async function getQuiz() {
    const res = await fetch($apiUrl);
    const quiz = await res.json();
    return quiz;
  }

  function nextQuestion() {
    activeQuestion += 1;
  }

  function resetQuiz() {
    isModalOpen = false;
    score.set(0);
    activeQuestion = 0;
    apiUrl.set("");
  }

  //reactive statements
  $: if (currentQuestion > $numberOfQuestions) {
    isModalOpen = true;
  }

  $: currentQuestion = activeQuestion + 1;
</script>

<style>
  .fade-wrapper {
    position: absolute;
  }

  .container {
    min-height: 500px;
    background: white;
    border-radius: 1em;
  }
</style>

<div>

  <button on:click={resetQuiz}>Get New Quiz!</button>

  <h3>Score: {$score}</h3>
  <h4>Question #{currentQuestion}</h4>

  <div class="container">

    {#await quiz}
      Loading... {console.log(quiz)}
    {:then data}
      {#each data.results as question, index}
        {#if index === activeQuestion}
          <div
            in:fly={{ y: 100 }}
            out:fly|local={{ x: -200 }}
            class="fade-wrapper">
            <Question {nextQuestion} {question} />
          </div>
        {/if}
      {/each}
    {/await}
  </div>

</div>

{#if isModalOpen}
  <Modal on:close={resetQuiz}>
    <h2>Complete!</h2>
    <p>Score: {$score}/{$numberOfQuestions}</p>
  </Modal>
{/if}
