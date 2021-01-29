<script>
  import { fade, blur, fly, slide, scale } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<style>
  .modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(29, 24, 24, 0.8);
  }

  .modal {
    background: white;
    padding: 1.25em;
    border-radius: 1em;
  }
</style>

<div class="modal-wrapper" transition:fade>
  <div class="modal" transition:fly|local={{ y: -100 }}>
    <button
      on:click={() => {
        dispatch('close');
      }}>
      Close
    </button>
    <slot />
  </div>
</div>
