import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/newlyuploadedfiles.scss"
import { resolveRelative } from "../util/path"
import { classNames } from "../util/lang"
import OverflowListFactory from "./OverflowList"
import { execSync } from "child_process";
import { Data } from "vfile"
import path from 'path';

interface NewlyUplodadedFilesOptions {
  hideWhenEmpty: boolean
}

const defaultOptions: NewlyUplodadedFilesOptions = {
  hideWhenEmpty: true,
}

function getNewMarkdownFiles(days = 7, rootFolder: string) {
  // thanks to chat-gpt, this magic git CLI command will return the name of the files that are new last 7 days ago
  const cmd = `git log --diff-filter=A --since="${days} days ago" --name-only --pretty=format: `;
  const output = execSync(cmd).toString().trim();

  const mdFiles = output.split("\n")
    .filter(f => f.endsWith(".md"))                           // just all the markdown files.
    .filter(f => path.dirname(f).split('/')[0] == rootFolder) // all under contents/ folder
    .filter((file, i, all) => all.indexOf(file) === i)        // unique

  return mdFiles ?? [];
}

function getNewlyUploadedFiles(allFiles: Data[], rootFolder: string): [Data[], boolean] {
  let newlyCreatedFiles: Data[] = [];
  const newMarkdownFiles = getNewMarkdownFiles(7, rootFolder);
  const sortedFilesViaCreated = allFiles.sort((a, b) => {
    if (!a.dates || !b.dates) {
      return 0;
    } else {
      return b.dates.created.getTime() - a.dates.created.getTime()
    }
  });
  sortedFilesViaCreated.forEach(file => {
    if (newMarkdownFiles.includes(file.filePath as string)) {
      newlyCreatedFiles.push(file)
    }
  });

  if (newlyCreatedFiles.length > 0){
    return [newlyCreatedFiles, true];
  }

  // if there are no created md files last 7 days, just get the latest 5 pages.
  const NTH = 5;
  const lastFiveCreatedFiles = sortedFilesViaCreated.slice(0, NTH);
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
    
    const [newlyUploadedFiles, isNew] = getNewlyUploadedFiles(allFiles, ctx.argv.directory);

    if (options.hideWhenEmpty && newlyUploadedFiles.length == 0) {
      return null
    }

    return (
      <div class={classNames(displayClass, "newly-uploaded-files")}>
        <h3>{isNew ? "Newly Uploaded Pages" : "Recently Added Pages"}</h3>
        <OverflowList>
          {newlyUploadedFiles.length > 0 ? (
            newlyUploadedFiles.map((f, i) => (
              <li>
                <a href={resolveRelative(fileData.slug!, f.slug!)} class="internal">
                  <span>{f.frontmatter?.title}</span> { isNew && (<div><span class="new-tag">NEW!</span></div>)}
                </a>
              </li>
            ))
          ) : (<></>)}
        </OverflowList>
      </div>
    )
  }

  NewlyUplodadedFiles.css = style
  NewlyUplodadedFiles.afterDOMLoaded = overflowListAfterDOMLoaded

  return NewlyUplodadedFiles
}) satisfies QuartzComponentConstructor
