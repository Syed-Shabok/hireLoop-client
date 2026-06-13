"use server";

import { serverMutation } from "../core/server";

export const addSubscription = async (newSubscriptionData) => {
  return await serverMutation("/api/subscriptions", newSubscriptionData);
};
