import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/newlyuploadedfiles.scss"
import { resolveRelative } from "../util/path"
import { classNames } from "../util/lang"
import OverflowListFactory from "./OverflowList"
import { execSync } from "child_process";
import { Data } from "vfile"
import path from 'path';

const DIFF_FILTER = {
  MODIFIED: "M",
  CREATED: "A" 
};
interface NewlyUplodadedFilesOptions {
  hideWhenEmpty: boolean
}

const defaultOptions: NewlyUplodadedFilesOptions = {
  hideWhenEmpty: true,
}

function getNewMarkdownFiles(days = 7, rootFolder: string, diffFilter = DIFF_FILTER.CREATED) {
  // thanks to chat-gpt, this magic git CLI command will return the name of the files that are new last 7 days ago
  const cmd = `git log --diff-filter=${diffFilter} --since="${days} days ago" --name-only --pretty=format: `;
  const output = execSync(cmd).toString().trim();

  let mdFiles = [];

  mdFiles = output.split("\n")
    .filter(f => f.endsWith(".md"))                           // just all the markdown files.
    .filter(f => path.dirname(f).split('/')[0] == rootFolder) // all under contents/ folder
    .filter((file, i, all) => all.indexOf(file) === i)        // unique

  // if (diffFilter === DIFF_FILTER.MODIFIED) {
  //   mdFiles = mdFiles.filter(f => path.basename(f) === 'index.md'); // do not show if the modification is index.md
  // }

  return mdFiles ?? [];
}

function getFiles(allFiles: Data[], rootFolder: string, diffFilter = DIFF_FILTER.CREATED): [Data[], boolean] {
  let files: Data[] = [];
  const newMarkdownFiles = getNewMarkdownFiles(7, rootFolder, diffFilter);
  console.log(newMarkdownFiles)
  
  const sortedFiles = allFiles.sort((a, b) => {
    if (!a.dates || !b.dates) {
      return 0;
    } else {
      if (diffFilter === DIFF_FILTER.CREATED) {
        return b.dates.created.getTime() - a.dates.created.getTime()
      } else {
        return b.dates.modified.getTime() - a.dates.modified.getTime()
      }
    }
  });
  sortedFiles.forEach(file => {
    if (newMarkdownFiles.includes(file.filePath as string)) {
      files.push(file)
    }
  });

  if (files.length > 0){
    return [files, true];
  }

  // if there are no created md files last 7 days, just get the latest 5 pages.
  const NTH = 5;
  const lastFiveCreatedFiles = files.slice(0, NTH);
  return [lastFiveCreatedFiles, false];
}

export default ((opts?: Partial<NewlyUplodadedFilesOptions>) => {
  const options: NewlyUplodadedFilesOptions = { ...defaultOptions, ...opts }
  const { OverflowList, overflowListAfterDOMLoaded } = OverflowListFactory()
  
  const NewlyUplodadedFiles: QuartzComponent = ({
    ctx,
    fileData,
    allFiles,
    displayClass,
  }: QuartzComponentProps) => {
    
    const [newlyUploadedFiles, isNewUpload] = getFiles(allFiles, ctx.argv.directory, DIFF_FILTER.CREATED);
    const [newlyModifiedFiles, isNewModified] = getFiles(allFiles, ctx.argv.directory, DIFF_FILTER.MODIFIED);

    console.log(newlyUploadedFiles.length)
    console.log(newlyModifiedFiles.length)

    return (
      <>
        {(options.hideWhenEmpty && newlyUploadedFiles.length == 0) ? (<></>) : (
          <div class={classNames(displayClass, "newly-uploaded-files")}>
            <h3>{isNewUpload ? "Newly Uploaded Pages" : "Recently Uploaded Pages"}</h3>
            <OverflowList>
              {newlyUploadedFiles.length > 0 ? (
                newlyUploadedFiles.map((f, i) => (
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
          <div class={classNames(displayClass, "newly-uploaded-files")}>
            <h3>{isNewModified ? "Newly Modified Pages" : "Recently Modified Pages"}</h3>
            <OverflowList>
              {newlyModifiedFiles.length > 0 ? (
                newlyModifiedFiles.map((f, i) => (
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
      </>
    )
  }

  NewlyUplodadedFiles.css = style
  NewlyUplodadedFiles.afterDOMLoaded = overflowListAfterDOMLoaded

  return NewlyUplodadedFiles
}) satisfies QuartzComponentConstructor
