import axios from "axios";
import { RepositoryItem } from "../interfaces/RepositoryItem";

const GITHUB_API_URL = "https://api.github.com";
const GITHUB_API_TOKEN = "ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/user/repos`, {
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
      },
      params: {
        per_page: 100,
        sort: "created",
        direction: "desc",
        affilation: "owner",
      },
    });
    const repositories: RepositoryItem[] = response.data.map((repo: any) => ({
        name: repo.name,
        owner: repo.owner ? repo.owner.login : null,
        description: repo.description ? repo.description : null,
        imageUrl: repo.owner ? repo.owner.avatar_url : null,
        language: repo.language ? repo.language : null,
    }));
    return repositories;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
};

/** Crear repoditorios
 * @param repo
 */

export const createRepository = async (repo: RepositoryItem): Promise<void> =>{
  try{
    const response = await axios.post(`${GITHUB_API_URL}/user/repos`,repo, {
      headers:{
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
      }
    });
    console.log("Repositorio ingresado", response.data);
  } catch(error) {
    console.error("Error creating repository:", error);
  }
};