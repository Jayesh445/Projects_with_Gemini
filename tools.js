import fs from 'fs';
import { Type } from '@google/genai';
import { execSync } from 'child_process';
import path from 'path';

const exec = async (command) => {
  try {
    const output = await execSync(command, {
      shell: 'bash.exe',
      stdio: 'pipe',
      encoding: 'utf-8',
    });
    return { success: true, output };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const writeFile = async (path, content) => {
  try {
    fs.writeFileSync(path, content);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const readFile = async (path) => {
    try {
        const content = fs.readFileSync(path, 'utf-8');
        return { success: true, content };  
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export const execFunctionDeclaration = {
  name: 'exec',
  description: 'Executes a shell command and returns the output.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      command: { type: Type.STRING, description: 'The shell command to execute.' },
    },
    required: ['command'],
  },
};

export const writeFileFunctionDeclaration = {
  name: 'writeFile',
  description: 'Writes content to a file',
  parameters: {
    type: Type.OBJECT,
    properties: {
      path: { type: Type.STRING, description: 'The file path to write to' },
      content: { type: Type.STRING, description: 'The content to write' },
    },
    required: ['path', 'content'],
  },
};

export const readFileFunctionDeclaration = {
  name: 'readFile',
  description: 'Reads content from a file',
  parameters: {
    type: Type.OBJECT,
    properties: {  
        path: { type: Type.STRING, description: 'The file path to read from' },
    },
    required: ['path'],
    },
    returnType: Type.STRING,
};

export const tools = {
    exec,
    writeFile,
    readFile,
};