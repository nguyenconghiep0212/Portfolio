import { api } from "../../src/api";

test("fetchPokemons", async () => {
  const response = await api("/pokemon?limit=20");
  expect(response.status).toBe(200);
  expect(response.data.results.length).toBe(20);
});
