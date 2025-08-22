import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/recentFiles.scss"
import { resolveRelative } from "../util/path"
import { classNames } from "../util/lang"
import OverflowListFactory from "./OverflowList"
import { Data } from "vfile"
import CONTENT_FILES_TIMESTAMPS from '../../generated_jsons_on_build/content_files_timestamps.json'

const DIFF_FILTER = {
  MODIFIED: "M",
  CREATED: "A" 
};

type ContentFilesTimestamps = {
  filePath: string,
  modified: number | boolean,
  created: number | boolean
};
interface RecentFilesOptions {
  hideWhenEmpty: boolean
}

const defaultOptions: RecentFilesOptions = {
  hideWhenEmpty: true,
}

function getFiles(diffFilter = DIFF_FILTER.CREATED, allFiles: Data[]): [Data[], boolean] {
  let sortedFiles: ContentFilesTimestamps[] = [];
  let key: 'modified' | 'created'  = 'created';
  if (diffFilter === DIFF_FILTER.CREATED) {
    sortedFiles = CONTENT_FILES_TIMESTAMPS.sort((a, b) => b.created - a.created);
    key = 'created';
  } else {
    sortedFiles = CONTENT_FILES_TIMESTAMPS.sort((a, b) => b.modified - a.modified);
    key = 'modified';
  }

  // get 7 days ago
  const days = 7;
  const end = Math.ceil(Date.now() / 1000);
  const start = end - days * 24 * 60 * 60;

  let result: string[] = [];
  for (const sortedFile of sortedFiles) {
    const timestamp = sortedFile[key];
    // check if created/modified is a number
    if (typeof timestamp !== 'number') {
      continue; // if created or modified is boolean, then just don't bother, remove from the list.
    }

    // check if 7 days ago
    if (timestamp >= start && timestamp < end) {
      result.push(sortedFile.filePath);
    }
  }

  if (result && result.length > 0) {
    return [getFileMapping(result, allFiles), true];
  }

  // if there are nothing 7 days ago, get the top 5.
  const NTH = 5;
  result = sortedFiles.slice(0, NTH).map(f => f.filePath);

  return [getFileMapping(result, allFiles), false];
}

function getFileMapping(files: string[], allFiles: Data[]): Data[] {
  let res: Data[] = [];
  files.forEach((file) => {
    const found = allFiles.find(f => (f.filePath as string).toLowerCase() === file.toLowerCase());
    if (found) {
      res.push(found);
    }
  });

  return res;
}

export default ((opts?: Partial<RecentFilesOptions>) => {
  const options: RecentFilesOptions = { ...defaultOptions, ...opts }
  const { OverflowList, overflowListAfterDOMLoaded } = OverflowListFactory()
  
  const RecentFiles: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
  }: QuartzComponentProps) => {
    
    const [newlyUploadedFiles, isNewUpload] = getFiles(DIFF_FILTER.CREATED, allFiles);
    const [newlyModifiedFiles, isNewModified] = getFiles(DIFF_FILTER.MODIFIED, allFiles);

    return (
      <div class="recent-files-container">
        {(options.hideWhenEmpty && newlyUploadedFiles.length == 0) ? (<></>) : (
          <div class={classNames(displayClass, "recent-files")}>
            <h3>{isNewUpload ? "Newly Uploaded Pages" : "Recently Uploaded Pages"}</h3>
            <OverflowList>
              {newlyUploadedFiles.length > 0 ? (
                newlyUploadedFiles.map((f) => (
                  <li>
                    <a href={resolveRelative(fileData.slug!, f.slug!)} class="internal">
                      {isNewUpload && (<span class="new-tag">NEW!</span>)} <span>{f.frontmatter?.title}</span>
                    </a>
                  </li>
                ))
              ) : (<></>)}
            </OverflowList>
          </div>
        )}
        {(options.hideWhenEmpty && newlyModifiedFiles.length == 0) ? (<></>) : (
          <div class={classNames(displayClass, "recent-files")}>
            <h3>{isNewModified ? "Newly Modified Pages" : "Recently Modified Pages"}</h3>
            <OverflowList>
              {newlyModifiedFiles.length > 0 ? (
                newlyModifiedFiles.map((f) => (
                  <li>
                    <a href={resolveRelative(fileData.slug!, f.slug!)} class="internal">
                      { isNewModified && (<span class="new-tag">UPDATED!</span>)} <span>{f.frontmatter?.title}</span>
                    </a>
                  </li>
                ))
              ) : (<></>)}
            </OverflowList>
          </div>
        )}
      </div>
    )
  }

  RecentFiles.css = style
  RecentFiles.afterDOMLoaded = overflowListAfterDOMLoaded

  return RecentFiles
}) satisfies QuartzComponentConstructor
