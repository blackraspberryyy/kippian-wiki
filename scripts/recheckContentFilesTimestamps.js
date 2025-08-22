import * as gitDateExtractor from 'git-date-extractor' 
import path from 'path';
import { writeFileSync } from 'fs'
import { styleText } from 'util' 

export async function generateContentFilesTimestamps() {
  const filepath = path.resolve('generated_jsons_on_build','content_files_timestamps.json');
  const res = await gitDateExtractor.getStamps({
    onlyIn: 'content',
    outputToFile: false,
  });

  // looping again...
  let list = [];
  for(const [filePath, timestamps] of Object.entries(res)) {
    if (filePath.endsWith(".md")) {
      list.push({
        filePath,
        created: timestamps.created,
        modified: timestamps.modified,
      });
    }
  }
  writeFileSync(filepath, JSON.stringify(list, null, 2));
  console.log(styleText('green', `"${filepath}" file has been generated.`))
}