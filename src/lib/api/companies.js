import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

export const getRecruiterCompany = async (recruiterId) => {
  return await serverFetch(`/api/my/companies?recruiterId=${recruiterId}`);
};

export const getLoggedInRecruiterCompany = async () => {
  const user = await getUserSession();
  return await getRecruiterCompany(user.id);
};
