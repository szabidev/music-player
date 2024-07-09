const API_URL = "http://localhost:8000";

export async function fetchBands(): Promise<Response> {
  const url = new URL("/bands", API_URL);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response, "response");
  return response;
}

export async function fetchBand(query: string): Promise<Response> {
  const url = new URL(`/bands?query=${encodeURIComponent(query)}`, API_URL);
  console.log(url, "url");
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}
