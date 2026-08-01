/**
 * Re-export seed static data. Mutable store clones these on first load.
 */
export {
  DEMO_MODE,
  demoCategories,
  demoCompanies,
  demoJobs,
  demoCandidates,
  demoApplications,
  demoProfiles,
  getJobsWithCompany,
} from "@/lib/demo-data";
