"use server";

import { serverMutation } from "../core/server";

export const submitApplication = async (newApplicationData) => {
  return await serverMutation("/api/applications", newApplicationData);
};
