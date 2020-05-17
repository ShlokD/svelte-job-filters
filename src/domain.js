import { writable } from "svelte/store";
import jobsData from "./data";

String.prototype.toTitleCase = function () {
  if (!this.length) return;

  return this[0].toUpperCase() + this.substring(1, this.length).toLowerCase();
};

export const transformJobsData = (jobs) => {
  return jobs.map((job) => {
    const { languages = [], level, role } = job;
    return {
      filters: [...languages, level.toTitleCase(), role.toTitleCase()],
      ...job,
    };
  });
};

const intersection = (arr1, arr2) => {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  const intersect = [...set1].filter((elem) => set2.has(elem));
  return [...intersect];
};

const createJobsStore = () => {
  const initialJobs = transformJobsData(jobsData);
  const { subscribe, update } = writable(initialJobs);

  const doFilterBy = (filters) =>
    update(() => {
      if (!filters.length) return initialJobs;

      let filteredJobs = initialJobs.slice().filter((job) => {
        // Since the intersection of a set and a subset is the subset itself,
        // if a particular job matches all the set filters, then the length
        // of the intersection of the job filters with the selected filters
        // will be the filter length itself
        return intersection(job.filters, filters).length === filters.length;
      });

      return filteredJobs;
    });

  return {
    subscribe,
    doFilterBy,
  };
};

export const jobsStore = createJobsStore();
