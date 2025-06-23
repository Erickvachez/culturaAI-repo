export async function getCountryCulture(country) {
  try {
    const res = await fetch(`https://diskovafrika.com/api/v1/country/details?name=${country}`);
    if (!res.ok) throw new Error("API Error");
    return await res.json();
  } catch (error) {
    return { error: "Failed to fetch cultural info." };
  }
} 