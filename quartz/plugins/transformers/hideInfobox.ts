import { QuartzTransformerPlugin } from "../types"
import { BuildCtx } from "../../util/ctx"
import { PluggableList } from "unified";
import { visit } from "unist-util-visit";

export const HideInfobox: QuartzTransformerPlugin = () => {
  return {
    name: "HideInfobox",
    htmlPlugins: (ctx: BuildCtx) => {
      const plugins: PluggableList = [];

      plugins.push(
        () => {
          return (tree, _file) => {
            // if the config says no, then dont. (e.g. hideInfobox: false at quartz.config.ts)
            if (!ctx.cfg.configuration.hideInfobox) {
              return;
            }

            // visit all element and hide the blockquotes
            visit(tree, "element", (node) => {
              if (
                node.type === "element"
                && node.tagName === 'blockquote' 
                && node?.properties?.className?.split(' ')?.some((c: string) => c === "infobox")
              ) {
                if ((node as any)?.properties?.className) {
                  (node as any).properties.className = [...(node as any)?.properties?.className.split(' '), 'orig-infobox'];
                }
              }
            })
          }
        }
      );

      return plugins;
    }
  }
}