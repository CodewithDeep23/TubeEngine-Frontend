// This is useful for debugging and user experience, as it allows you to show a more meaningful error message to the user instead of just a generic HTML page.

export const parseError = (error) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(error, 'text/html');
    const errorMessage = doc.querySelector('pre');

    if(errorMessage) {
        // Extract the error message using regex
        const errorText = errorMessage.textContent.match(/^Error:\s*(.*?)(?=\s*at)/);
        if(errorText && errorText[1]) {
            return errorText[1].trim();
        }
    }

    return "Unknown error occurred";
}