import { GoogleGenAI, Type } from "@google/genai";
import { config } from "dotenv";
import { tools } from "./tools.js";

config();

const genai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
});

const SYSTEM_PROMPT = `
You are a Software Engineer agent responsible for building complete full-stack web applications using structured reasoning and shell commands.
dont repeat the task done in the previous step, just continue from the last step.
You will follow a strict step-by-step process to ensure the project is built correctly and works end-to-end.
build a folder structure for the project,plan it completely before starting to write code.
Once you finish with the planning state, then you can start writing code.
If some error occurs, you will THINK about how to fix it, then repeat the ACTION step.
You can read the file system using the 'readFile' tool, write files using 'writeFile', and execute shell commands using the 'exec' tool.
to look up file structure, you can use the 'ls' command to list files and directories.
and to fix the error or user query read the file and then THINK about how to fix it.
then perform the ACTION step to fix the error or implement the user query.
If success is false in the OBSERVE step, you will THINK about how to fix it, then repeat the ACTION step.
You will not use any file system APIs directly. You will only use the 'exec' tool to perform shell actions.


You operate using the following states:

STATES:
- START: A new task begins.
- THINK: Plan each step logically. Break complex tasks into small sub-steps.
- ACTION: Use shell commands to create files, run code, install packages, etc.
- OBSERVE: Record what happened after running a command. Include errors or confirmations.
- OUTPUT: Give a clear summary once the project is complete and works end-to-end.

You do not use file system APIs. You only use the 'exec' tool to perform shell actions.
The shell commands must be valid and executable in a Windows environment.


AVAILABLE TOOL:
- exec: Executes a shell command using windows powershell.
- writeFile : Writes content to a file.
- readFile : Reads content from a file.


Common shell commands you can use via 'exec':
- Create folder: \`mkdir  dir_name\`
- Create file: \`touch file.js\`
- Append content: \`cat >> file.js\`
- List files: \`ls dir_name\`
- Install packages: \`npm install package_name\`
- Start server: \`node server.js\` or \`npm run dev\`

Your response must follow this strict JSON format for each step:

{
  "state": "<STATE>",
  "note": "<Why this step is happening and what it does>"
  "tool": "<TOOL_NAME>",
  "parameters": {
    "command": "<exact shell command>"
  }
}

Do not include "tool" or "parameters" unless state is ACTION.

---

### EXAMPLE TASK: Create a simple todo app using Node.js and React.

1. START the task
2. THINK: Plan directories and project structure
3. ACTION: Use shell commands to create folders
4. THINK: Initialize Node.js in the backend
5. ACTION: Run \`npm init\`, install packages
6. THINK: Build React frontend
7. ACTION: Use Vite to create client app
8. THINK: Write backend and frontend code
9. ACTION: Use \`echo\` to write to files
10. OBSERVE each change
11. OUTPUT: Confirm the project works fully

Only proceed when each step is verified and observed. On error in OBSERVE, THINK how to fix it, then repeat with ACTION.

Be complete and logical. Think before acting.
Example Output:
  {
    "state": "START",
    "note": "Create a todo app with a Node.js backend and React frontend."
  },
  {
    "state": "THINK",
    "note": "First I will create the project folder with 'client' and 'server' directories."
  },
  {
    "state": "ACTION",
    "tool": "exec",
    "parameters": {
      "command": "mkdir -p todo-app/client todo-app/server"
    }
  },
  {
    "state": "OBSERVE",
    "note": "Successfully created project directories."
  },
  {
    "state": "THINK",
    "note": "Initialize a Node.js project and install Express in the server folder."
  },
  {
    "state": "ACTION",
    "tool": "exec",
    "parameters": {
      "command": "cd todo-app/server && npm init -y && npm install express"
    }
  },
  {
    "state": "OBSERVE",
    "note": "Express installed and package.json created."
  },
  {
    "state": "THINK",
    "note": "Now I will create an 'index.js' file with basic Express server code."
  },
  {
    "state": "ACTION",
    "tool":"writeFile",
    "parameters": {
      "path": "todo-app/server/index.js",
      "content": "const express = require('express'); const app = express(); const PORT = 3001; app.use(express.json()); let todos = []; app.get('/api/todos', (req, res) => { res.json(todos); }); app.post('/api/todos', (req, res) => { const todo = { id: Date.now(), task: req.body.task }; todos.push(todo); res.status(201).json(todo); }); app.listen(PORT, () => { console.log(\`Server running on port \${PORT}\`); });"
  },
  {
    "state": "OBSERVE",
    "note": "index.js created with Express code."
  },
  {
    "state": "THINK",
    "note": "Test if the backend server runs correctly."
  },
  {
    "state": "ACTION",
    "tool": "exec",
    "parameters": {
      "command": "cd todo-app/server && node index.js"
    }
  },
  {
    "state": "OBSERVE",
    "note": "Server is running on port 3001."
  },
  {
    "state": "THINK",
    "note": "Now I will set up the React frontend using Vite."
  },
  {
    "state": "ACTION",
    "tool": "exec",
    "parameters": {
      "command": "cd todo-app && npm create vite@latest client -- --template react"
    }
  },
  {
    "state": "OBSERVE",
    "note": "React project scaffolded with Vite."
  },
  {
    "state": "ACTION",
    "tool": "exec",
    "parameters": {
      "command": "cd todo-app/client && npm install"
    }
  },
  {
    "state": "OBSERVE",
    "note": "React dependencies installed."
  },
  {
    "state": "THINK",
    "note": "I will now create a React component to fetch and display todos from the backend."
  },
  {
    "state": "ACTION",
    "tool": "writeFile",
    "parameters": {
      "path": "todo-app/client/src/TodoList.jsx",
      "content": "import React, { useState, useEffect } from 'react'; const TodoList = () => { const [todos, setTodos] = useState([]); useEffect(() => { fetch('/api/todos') .then(res => res.json()) .then(data => setTodos(data)); }, []); return ( <div><h2>Todo List</h2><ul>{todos.map(todo => <li key={todo.id}>{todo.task}</li>)}</ul></div> ); }; export default TodoList;"
    }
  },
  {
    "state": "OBSERVE",
    "note": "TodoList component created."
  },
{
"state": "THINK",
"note": "Now I will update the main App component to include TodoList."  
},
{
    "state": "ACTION",
    "tool":"readFile",
    "parameters": {
      "path": "todo-app/client/src/App.jsx"
    }
},
  {
    "state": "THINK",
    "note": "Now I will update App.jsx to include TodoList."
  },
  {
    "state": "ACTION",
    "tool": "writeFile",
    "parameters": {
      "path": "todo-app/client/src/App.jsx",
      "content": "import React from 'react'; import TodoList from './TodoList'; const App = () => { return ( <div><h1>Todo App</h1><TodoList /></div> ); }; export default App;"
    }
  },
  {
    "state": "OBSERVE",
    "note": "App.jsx updated with TodoList component."
  },
  {
    "state": "THINK",
    "note": "Now I will run the frontend dev server to test the app."
  },
  {
    "state": "ACTION",
    "tool": "exec",
    "parameters": {
      "command": "cd todo-app/client && npm run dev"
    }
  },
  {
    "state": "OBSERVE",
    "note": "React dev server running on port 5173. Todo list fetched successfully from backend."
  },
  {
    "state": "OUTPUT",
    "note": "Todo app successfully created with Node.js backend (port 3001) and React frontend (port 5173)."
  }
`;


const responseSchema = {
    type: Type.OBJECT,
    properties: {
        state: { type: Type.STRING, "enum": ["START", "THINK", "ACTION", "OBSERVE", "OUTPUT"] },
        note: { type: Type.STRING },
        tool: { type: Type.STRING, nullable: true },
        parameters: {
            type: Type.OBJECT,
            properties: {
                command: { type: Type.STRING, nullable: true }
            },
            required: ["command"],
            nullable: true
        }
    }
};

const messages = [
    {
        role: "user",
        parts: [
            { text: `make a weather app that has dropdown with multiple cities on india and show wheather with icons
                make the dev and start command for server also the ui is not that good so fix it by tailwind usage` }
        ]
    }
];

async function main() {
    while (true) {
        const response = await genai.models.generateContent({
            model: "gemini-2.0-flash",
            config: {
                systemInstruction: [SYSTEM_PROMPT],
                responseMimeType: "application/json",
                // responseSchema: responseSchema,

                // tools: [{
                //     functionDeclarations: [execFunctionDeclaration],
                // }],
                // toolConfig: {
                //     functionCallingConfig: {
                //         mode:"auto",
                //         responseSchema: responseSchema,
                //     }
                // }
            },
            contents: messages,
        });
        const candidate = response?.candidates?.[0];
        const part = candidate?.content?.parts?.[0];
        // console.log("Response:", JSON.stringify(response));
        if (!part) {
            console.error("⚠️ No valid response part from model. Full response:", JSON.stringify(response));
            console.log(candidate);

            break;
        }
        if (part.text) {
            const steps = response.candidates[0].content.parts[0].text;
            const cleanedStep = steps.replace(/```json|```/g, "").trim();
            const parsedStep = JSON.parse(cleanedStep);
            messages.push({
                role: "model",
                parts: [
                    {
                        text: JSON.stringify(parsedStep)
                    }
                ]
            });
            console.log("Step:", parsedStep);
            if (parsedStep.state === "ACTION") {
                console.log("Executing command:", parsedStep.parameters.command);
                let result;
                switch (parsedStep.tool) {
                    case "exec":
                        result = await tools.exec(parsedStep.parameters.command);
                        break;
                    case "writeFile":
                        result = await tools.writeFile(parsedStep.parameters.path, parsedStep.parameters.content);
                        break;
                    case "readFile":
                        result = await tools.readFile(parsedStep.parameters.path);
                        break;
                    default:
                        console.error("Unknown tool:", parsedStep.tool);
                        result = { success: false, error: "Unknown tool" };
                        break;
                }

                console.log("Command Output:", result);
                messages.push({
                    role: "assistant",
                    parts: [
                        {
                            text: JSON.stringify({
                                state: "OBSERVE",
                                note: result.success ? "Command executed successfully." : "Command failed with error.",
                                tool: parsedStep.tool,
                                parameters: {
                                    command: parsedStep.parameters.command
                                }
                            })
                        }
                    ]
                });
            }
            if (parsedStep.state === "OUTPUT") {
                console.log("Final Output:", parsedStep.note);
                break;
            }
        }

        // else if (part.functionCall && part.functionCall.name.length > 0) {
        //     const { name, args } = part.functionCall;
        //     console.log("Function Call:", name, args);
        //     messages.push({
        //         role: "model",
        //         parts: [
        //             {
        //                 text: JSON.stringify({
        //                     state: "ACTION",
        //                     note: `Executing command: ${args.command}`,
        //                     tool: name,
        //                     parameters: {
        //                         command: args.command
        //                     }
        //                 })
        //             }
        //         ]
        //     })
        //     const result = exec(args.command);
        //     console.log("Command Output:", result);
        //     messages.push({
        //         role: "assistant",
        //         parts: [
        //             {
        //                 text: JSON.stringify({
        //                     state: "OBSERVE",
        //                     note: result.success ? "Command executed successfully." : "Command failed with error.",
        //                     tool: name,
        //                     parameters: {
        //                         command: args.command
        //                     }
        //                 })
        //             }
        //         ]
        //     });
        // }
        else {
            console.log("No valid response from model.");
            break;
        }

    }

}

main()