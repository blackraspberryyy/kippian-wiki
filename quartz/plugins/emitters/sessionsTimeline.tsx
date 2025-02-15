import { QuartzEmitterPlugin } from "../types"
import { QuartzComponentProps } from "../../components/types"
import { pageResources, renderPage } from "../../components/renderPage"
import { FullPageLayout } from "../../cfg"
import { FilePath, FullSlug } from "../../util/path"
import { defaultContentPageLayout, sharedPageComponents } from "../../../quartz.layout"
import { defaultProcessedContent } from "../vfile"
import { write } from "./helpers"
import { SessionsTimeline } from "../../components"

export const SessionsTimelinePage: QuartzEmitterPlugin = () => {
  const opts: FullPageLayout = {
    ...sharedPageComponents,
    ...defaultContentPageLayout,
    pageBody: SessionsTimeline(),
  }

  const { head, header, beforeBody, pageBody, afterBody, left, right, footer } = opts;

  return {
    name: "SessionsTimelinePage",
    getQuartzComponents() {
      return [head, ...header, ...beforeBody, pageBody, ...afterBody, ...left, ...right, footer]
    },
    async emit(ctx, _content, resources): Promise<FilePath[]> {
      const cfg = ctx.cfg.configuration
      const slug = "sessions-timeline" as FullSlug

      let url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
      if (ctx.argv.serve) {
        url = new URL(`http://localhost:${ctx.argv.port ?? "example.com"}`)
      }

      const path = url.pathname as FullSlug
      const externalResources = pageResources(path, resources)
      const [tree, vfile] = defaultProcessedContent({
        slug,
        text: 'Sessions Timeline',
        description: 'A list of sessions that transpired during the campaign.',
        frontmatter: { title: 'Sessions Timeline', tags: [] },
      })
      const componentData: QuartzComponentProps = {
        ctx,
        fileData: vfile.data,
        externalResources,
        cfg,
        children: [],
        tree,
        allFiles: [],
      }

      return [
        await write({
          ctx,
          content: renderPage(cfg, slug, componentData, opts, externalResources),
          slug,
          ext: ".html",
        }),
      ]
    },
  }
}
