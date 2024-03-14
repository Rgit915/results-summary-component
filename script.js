// Async function to fetch data from JSON file
const fetchData = async (url) => {
  try {
    const response = await fetch(url); // Fetch data from the provided URL
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json(); // Parse response body as JSON
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error to handle it at the caller's level
  }
};
