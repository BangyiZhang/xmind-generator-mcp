# Xmind Generator MCP Server

[![smithery badge](https://smithery.ai/badge/@BangyiZhang/xmind-generator-mcp-server)](https://smithery.ai/server/@BangyiZhang/xmind-generator-mcp-server)

An MCP (Model Context Protocol) server for generating Xmind mind maps. This server allows LLMs to create structured mind maps through the MCP protocol.

## Features

- Generate Xmind mind maps with hierarchical topic structures
- Support for topic notes, labels, and markers
- Save mind maps to local files

## Installation

### Installing via Smithery

To install Xmind Generator for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@BangyiZhang/xmind-generator-mcp-server):

```bash
npx -y @smithery/cli install @BangyiZhang/xmind-generator-mcp-server --client claude
```

### Manual Installation

```bash
# Clone the repository
git clone https://github.com/BangyiZhang/xmind-generator-mcp.git
cd xmind-generator-mcp

# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

### Starting the server

```bash
npm start
```

The server will start using the stdio transport, which allows it to be used with Claude Desktop and other MCP clients.

### Connecting to Claude Desktop

1. Start Claude Desktop
2. Go to Settings > Extensions
3. Add a new extension with the following configuration:
   ```json
   {
     "mcpServers": {
       "xmind-generator": {
         "command": "node",
         "args": ["path/to/xmind-generator-mcp/dist/index.js"]
       }
     }
   }
   ```
4. Replace `path/to/xmind-generator-mcp` with the actual path to your project
5. Start using the Xmind generator in your conversations

## Available Tools

### generate-mind-map

Generates an Xmind mind map from a hierarchical structure of topics.

Parameters:
- `title` (string): The title of the mind map (root topic)
- `topics` (array): Array of topics to include in the mind map
  - `title` (string): The title of the topic
  - `ref` (string, optional): Reference ID for the topic
  - `note` (string, optional): Note for the topic
  - `labels` (array of strings, optional): Labels for the topic
  - `markers` (array of strings, optional): Markers for the topic (format: "Category.name", e.g., "Arrow.refresh")
  - `children` (array, optional): Array of child topics
- `relationships` (array, optional): Array of relationships between topics
- `outputPath` (string, optional): Custom output path for the XMind file


## Example

Here's an example of how to use the `generate-mind-map` tool:

```json
{
  "title": "Project Plan",
  "topics": [
    {
      "title": "Research",
      "ref": "topic:research",
      "note": "Gather information about the market",
      "children": [
        {
          "title": "Market Analysis",
          "labels": ["Priority: High"]
        },
        {
          "title": "Competitor Research",
          "markers": ["Task.quarter"]
        }
      ]
    },
    {
      "title": "Development",
      "children": [
        {
          "title": "Frontend",
          "markers": ["Arrow.refresh"]
        },
        {
          "title": "Backend"
        }
      ]
    }
  ]
}
```

## License

MIT
