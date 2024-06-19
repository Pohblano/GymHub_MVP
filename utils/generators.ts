export function generateUsername() {
    // Lists of adjectives and colors
    const adjectives = ["Cool", "Happy", "Brave", "Clever", "Jolly", "Smart", "Swift", "Bold", "Witty", "Bright"];
    const colors = ["Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink", "Brown", "Black", "White"];
    
    // Function to get a random item from an array
    function getRandomItem(array: string[]) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    // Function to get a random number between min and max (inclusive)
    function getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // Randomly select one adjective, one color, and one number
    const adjective = getRandomItem(adjectives);
    const color = getRandomItem(colors);
    const number = getRandomNumber(10, 99);
    
    // Combine them to form a username
    const username = `${adjective}${color}${number}`;
    
    return username;
}