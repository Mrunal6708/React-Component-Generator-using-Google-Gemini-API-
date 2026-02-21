import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const ai = new GoogleGenAI({apikey: GEMINI_API_KEY});

export const generateContent = async (userQuery) => {
  const prompt = promptGenerator(userQuery);
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });
  return response;
}
export const promptGenerator = (userQuery) => {
    return `Create a simple React functional component based on this description: "${userQuery}"
    
    
    Requirements:
    - Use React.createElement instead of JSX syntax
    - Keep it simple, no imports needed
    - Name the function 'GeneratedComponent'
    - Use inline styles as regular JavaScript objects
    - Don't use any JSX syntax, use React.createElement instead
    - Don't include any markdown or code block syntax
    - Don't include any export statements

    Example format:
    function GeneratedComponent() {
    return React.createElement(
    'div',
    {style:{padding: '10px'}},
    React.createElement(
    'button',
    {
    style: {
    backgroundColor:'blue',
    color:'white',
    padding:'10px',
    },
    onClick:() => alert('Clicked')
    },
     'Click Me'
    ))
    }  ;
    
    Return only the Component code without any markdown formating or code block syntax.`;

    
};

export const purifyCode = (code) => {
    // remove any import statement
    code = code.replace(/import\s+.*?;\s*/g, "");
    // remove any export statement
    code = code.replace(/export\s+.*?;\s*/g, "");
    // remove language specifiers
    code = code.replace(/\/\/\s*language:\s*\w+/g, "");

    return code.trim();
}