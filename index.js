import fetch from 'node-fetch';
// Recommend using node-fetch for those familiar with JS fetch

const COLORS = 'https://nt-cdn.s3.amazonaws.com/colors.json';

/**
 * @param name filter for color name
 * @param hex filter for color hex code
 * @param compName filter for complementary color name
 * @param compHex filter for complementary color hex code
 * @returns Promise
 */
  
const fetchColors = async ({ name, hex, compName, compHex }) => {
    try {
      const response = await fetch(COLORS);
      if (!response.ok) {
        throw new Error('Failed fetching colors from API.');
      }
  
      const data = await response.json();
  
      let filteredColors = data;

      if (name) {
        filteredColors = filteredColors.filter(color => color.name.toLowerCase() === name.toLowerCase());
      }
      if (hex) {
        filteredColors = filteredColors.filter(color => color.hex === hex);
      }
      if (compName) {
        filteredColors = filteredColors.filter(color => color.complementary && color.complimentary.name && color.complementary.name.toLowerCase() === compName.toLowerCase());
      }
      if (compHex) {
        filteredColors = filteredColors.filter(color => color.compHex === compHex);
      }
  
      return filteredColors;
    } catch (err) {
      throw new Error('Failed fetching colors: ' + err.message);
    }
  }
    


// Leave this here
export default fetchColors;
