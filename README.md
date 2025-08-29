# Groq Code MCP Server v0.1.0

This MCP server is designed for **planning with Claude Code** and **making changes with Groq** to maximize speed and intelligence while avoiding API limits. Use your preferred AI for planning and strategy, then leverage Groq's high-performance inference for ultra-fast code generation.

It uses Groq's OpenAI GPT-OSS models optimized for code execution and can be embedded in IDEs like Claude Code, with beta support for Cursor.

## ✨ New in v0.1.0

- **Project Restructure**: Organized project into smaller, more manageable components for DX purposes
- **Stronger Instruction**: Improved `write` usage count among models
- **Claude Code - Enhanced Visual Diffs**: Displays changes/edits in a pretty format
- **Hide User API Key**: For security, doesn't display entered API keys in the terminal
- **Update Config Wizard for Messy Configs**: Ensure user setup always works despite previous installs

## 1. Install the NPM Package
```bash
npm install -g groq-code-mcp
```

## 2. Get Groq API key
Visit [console.groq.com](https://console.groq.com) and create an API key

[OPTIONAL] Add OpenRouter as a backup in case you hit your Groq rate limits
Visit [OpenRouter](https://openrouter.ai/) and get a key to use as a fallback provider.

You can set this key in your MCP settings under OPENROUTER_API_KEY, and it will trigger automatically if anything goes wrong with calling Groq.


## 3. Run the Setup Wizard for Claude Code / Cursor
```bash
groq-mcp --config
```

Use the setup wizard to configure the tool on your machine.

If you're using Cursor, it will ask you to copy and paste a prompt into your Cursor User Rules.

## 4. Usage

The MCP tool will appear as `write` in your tool list. It supports:

- **Natural language prompts**: Just describe what you want in plain English
- **Context files**: Include multiple files as context for better code understanding
- **Visual diffs**: See changes with Git-style diffs

Example usage:
```
Create a REST API with Express.js that handles user authentication
```

## 🏎️ Groq Performance Benefits

- **Ultra-fast inference**: Groq's custom LPU architecture delivers speeds up to 10x faster than traditional GPUs
- **High-quality models**: OpenAI GPT-OSS 120B and 20B models optimized for code generation
- **Large context windows**: 131K+ tokens support for complex codebases
- **Code execution capabilities**: Advanced reasoning for programming tasks