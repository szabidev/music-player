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

export async function createBand(band: any): Promise<Response> {
  const url = new URL("/bands", API_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(band),
  });
  console.log(response, "response");
  if (!response.ok) {
    throw new Error("Failed to add artist");
  }

  return response;
}

export const updateBand = async (bandId: string, updatedBandData: any) => {
  console.log(bandId, "bandId");
  console.log(updatedBandData, "updatedBandData");
  try {
    const response = await fetch(`/bands/${bandId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBandData),
    });

    if (!response.ok) {
      throw new Error("Failed to update band");
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function deleteBand(bandId: string) {
  const url = new URL(`/bands/${bandId}`, API_URL);
  // console.log(url);
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete band with ID ${bandId}`);
  }

  return { message: "Artist deleted successfully" };
}
