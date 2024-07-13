const API_URL = "http://localhost:8000";

// Fetch all bands
export async function fetchBands(): Promise<Response> {
  const url = new URL("/bands", API_URL);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

// Create a new band
export async function createBand(band: any): Promise<Response> {
  const url = new URL("/bands", API_URL);
  if (!band.albums) {
    band.albums = [];
  }
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(band),
  });
  if (!response.ok) {
    throw new Error("Failed to add artist");
  }

  return response;
}

// Edit a band
export const updateBand = async (bandId: string, updatedBandData: any) => {
  const url = new URL(`/bands/${bandId}`, API_URL);
  try {
    const response = await fetch(url, {
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

// Delete a band
export async function deleteBand(bandId: string) {
  const url = new URL(`/bands/${bandId}`, API_URL);
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

// Delete a song
export async function deleteSong(bandId: string, songId: string) {
  const url = new URL(`/bands/${bandId}/songs/${songId}`, API_URL);
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete song with ID ${songId}`);
  }

  return { message: "Song deleted successfully" };
}
