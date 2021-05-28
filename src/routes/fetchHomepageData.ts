import type { Contributor } from "../utilTypes";

export const getReleaseVersion: (endpoint: string) => Promise<string | undefined> =
  async (endpoint: string) => await fetch(endpoint)
    .then((result) => result.json())
    .then((result: { tag_name: string }) => {
      if (result) return result.tag_name;
    })
    .catch((err) => {
      console.error(err);
      return "";
    });

export const getContributors: (endpoint: string) => Promise<Contributor[]> =
  async (endpoint: string) => await fetch(endpoint)
    .then((result) => result.json())
    .then((result) => result)
    .catch((err) => {
      console.error(err);
      return "";
    });