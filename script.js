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

// Async function to populate result section and summary section
const populateSections = async () => {
  try {
    const data = await fetchData('./data.json'); // Fetch data from data.json file

    // Populate result section
    const sumOfScore = data.reduce((acc, current) => {
      return acc + current.score;
    }, 0);
    const result = Math.round(sumOfScore / data.length);
    document.querySelector('#result-score').textContent = result;

    // Populate summary section
    const summarySection = document.querySelector('#summary-section');
    data.forEach(item => {
      const summaryList = document.createElement('div');
      summaryList.classList.add('summary-list', item.category.toLowerCase());
      summaryList.innerHTML = `
        <div class="category">
          <img src="${item.icon}" alt="icon-${item.category.toLowerCase()}">
          <h3>${item.category}</h3>
        </div>
        <p class="score"><span class="bold-score">${item.score}</span> / 100</p>
      `;
      summarySection.appendChild(summaryList);
    });
  } catch (error) {
    console.error('Error populating sections:', error);
  }
};

// Call the function to populate sections when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
  populateSections();
});
