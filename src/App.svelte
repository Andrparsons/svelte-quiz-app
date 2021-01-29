<script>
  import Quiz from "./Quiz.svelte";
  import Setup from "./Setup.svelte";
  import { apiUrl } from "./store.js";
</script>

<style>
  :global(body) {
    background-image: url("/images/giftly.png");
  }

  h1 {
    color: white;
    text-align: center;
  }
</style>

<main>
  <h1>Open Trivia!</h1>
  {#if !$apiUrl}
    <Setup />
  {:else}
    <Quiz />
  {/if}
</main>
