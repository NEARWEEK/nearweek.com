const TOKEN = process.env.REACT_APP_API_KEY;

const headers = new Headers({
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
});
const options = {
  headers,
  credentials: "include",
};

export async function loadEditions() {
  const response = await fetch(
    `/api/editions?populate=*&sort=createdAt:desc`,
    options
  );
  return await response.json();
}

export async function loadEdition(editionId) {
  const response = await fetch(
    `/api/editions/${editionId}?populate=*`,
    options
  );
  return await response.json();
}

export const api = {
  getAllEditions: loadEditions,
  getOneEdition: loadEdition,
};
