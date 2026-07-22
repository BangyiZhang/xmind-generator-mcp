import * as fs from 'fs';
import JSZip from 'jszip';

export type TopicData = {
  title: string;
  children?: TopicData[];
};

function topicFromXmind(node: any): TopicData {
  const t: TopicData = {
    title: String(node?.title ?? '').trim()
  };

  const attached = node?.children?.attached;
  if (Array.isArray(attached) && attached.length) {
    t.children = attached.map(topicFromXmind);
  }

  return t;
}

export async function readXmindToTree(inputXmindPath: string, sheetIndex: number = 0): Promise<{ title: string; topics: TopicData[]; totalSheets: number; currentSheet: number }> {
  const buf = fs.readFileSync(inputXmindPath);
  const zip = await JSZip.loadAsync(buf);

  const contentFile = zip.file('content.json');
  if (!contentFile) throw new Error('Invalid .xmind: missing content.json');

  const contentJson = await contentFile.async('string');
  const doc = JSON.parse(contentJson);
  if (!Array.isArray(doc) || !doc.length) throw new Error('Invalid content.json: expected array of sheets');

  const totalSheets = doc.length;
  if (sheetIndex < 0 || sheetIndex >= totalSheets)
    throw new Error(`sheetIndex ${sheetIndex} out of range (0-${totalSheets - 1})`);
  const sheet = doc[sheetIndex];
  const root = sheet?.rootTopic;
  if (!root?.title) throw new Error('Invalid content.json: missing rootTopic.title');

  const topics = Array.isArray(root?.children?.attached)
    ? root.children.attached.map(topicFromXmind)
    : [];

  return { title: String(root.title), topics, totalSheets, currentSheet: sheetIndex };
}

export function treeToMarkdown(tree: { title: string; topics: TopicData[] }): string {
  const lines: string[] = [];
  lines.push(`# ${tree.title}`);

  const walk = (node: TopicData, depth: number) => {
    const indent = '  '.repeat(Math.max(0, depth - 1));
    lines.push(`${indent}- ${node.title}`);
    if (node.children?.length) {
      for (const c of node.children) walk(c, depth + 1);
    }
  };

  for (const t of tree.topics) walk(t, 1);
  return lines.join('\n');
}
