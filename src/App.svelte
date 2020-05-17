<script>
  import { jobsStore } from "./domain";

  let selectedFilters = [];

  function doFilter(filter) {
    selectedFilters = [...selectedFilters, filter];
    jobsStore.doFilterBy(selectedFilters);
  }

  const removeFilter = filter => {
    const selectedFilterIndex = selectedFilters.indexOf(filter);
    selectedFilters = selectedFilters
      .slice(0, selectedFilterIndex)
      .concat(selectedFilters.slice(selectedFilterIndex + 1));
    jobsStore.doFilterBy(selectedFilters);
  };
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0.6em;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .listing {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 2em 4em;
    margin: 2em 0;
    position: relative;

    min-width: 80%;
    background-color: #fefefe;
    box-shadow: 0px 0px 5px 5px var(--light-grayish-cyan-2);
  }

  .listing > img {
    margin: 0 1em;
  }

  .details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .details > p {
    color: var(--desaturated-dark-cyan);
    font-weight: 600;
  }

  h2 {
    margin: 0;
  }

  .metadata {
    display: flex;
    justify-content: center;
    align-items: center;

    padding-left: 0;
  }

  .metadata > li {
    padding-right: 2em;
    list-style: none;
    color: lightslategray;
  }

  .job-filters {
    display: flex;
    flex-wrap: wrap;
    padding: 0 2em;
  }

  .job-filters button {
    margin: 1em;
    background-color: var(--light-grayish-cyan-2);
    color: var(--desaturated-dark-cyan);
    border: 0;
    padding: 1em;
    cursor: pointer;
  }

  .selected-filters {
    display: flex;
  }

  .selected-filters > button {
    margin: 1em;
    background-color: var(--desaturated-dark-cyan);
    color: var(--light-grayish-cyan);
    border: 0;
    padding: 1em;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    .listing {
      flex-direction: column;
    }

    .details {
      align-items: center;
    }
  }
</style>

<main>
  <div class="selected-filters">
    {#each selectedFilters as selectedFilter}
      <button on:click={removeFilter(selectedFilter)}>
        {selectedFilter} X
      </button>
    {/each}
  </div>
  {#each $jobsStore as job}
    <div class="listing">
      <img alt={`${job.company}-logo`} src={job.logo} />
      <div class="details">
        <p>{job.company}</p>
        <h2>{job.position}</h2>
        <ul class="metadata">
          <li>{job.postedAt}</li>
          <li>{job.contract}</li>
          <li>{job.location}</li>
        </ul>

      </div>

      <div class="job-filters">
        {#each job.filters as filter}
          <button on:click={doFilter(filter)}>{filter}</button>
        {/each}
      </div>
    </div>
  {/each}
</main>
