import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID = {
  seeker_pro: "price_1ThfdO0smoxX9X6bRBoVD3xa",
  seeker_premium: "price_1ThgkM0smoxX9X6bjz4e6Cv3",
  recruiter_growth: "price_1Thgjc0smoxX9X6bSrimhxlA",
  recruiter_enterprise: "price_1Thgj80smoxX9X6bNChYahFJ",
};
