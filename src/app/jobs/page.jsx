import React from "react";
import { getAllJobs } from "@/lib/api/jobs";
import JobFilterWorkspace from "./JobFilterWorkspace";

export default async function AllJobs() {
  // Fetch initial raw jobs data on server build pipelines
  const jobs = (await getAllJobs()) || [];

  // Let the Client workspace coordinate layout filtering configurations cleanly
  return <JobFilterWorkspace initialJobs={jobs} />;
}
