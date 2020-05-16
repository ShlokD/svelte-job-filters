<script>
  import jobsStore from "./domain";

  $: filters = [];

  const addFilter = () => {
    filters = [...filters, Math.random() * 10];
  };
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Hello {$jobsStore.length}!</h1>
  <ul>
    {#each filters as filter}
      <li>{filter}</li>
    {/each}
  </ul>
  <button on:click={addFilter}>Add Filter</button>
</main>
