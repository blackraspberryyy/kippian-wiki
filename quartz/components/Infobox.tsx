import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { find } from 'unist-util-find'
import { toHtml } from "hast-util-to-html"
import { Root } from "hast"

interface Options {
  favouriteNumber: number
}
  
const defaultOptions: Options = {
  favouriteNumber: 42,
}
   
export default ((userOpts?: Options) => {
  const opts = { ...userOpts, ...defaultOptions }

  const Infobox: QuartzComponent = (props: QuartzComponentProps) => {
    // if the config says no (e.g. hideInfobox: false), then just dont bother.
    if (props.cfg && !props.cfg.hideInfobox) {
      return;
    }

    // find the blockquote for infobox
    const infoboxNode = find(props.tree, (node: any) => {
      return (
        node.type === "element" && 
        node.tagName === 'blockquote' && 
        node?.properties?.className?.some((c: string) => c === 'infobox')
      )
    });
    
    // if none find, don't bother
    if (!infoboxNode) {
      return;
    }

    // revert the "display:none" made by HideInfobox transformer
    (infoboxNode as any).properties.style = `${(infoboxNode as any).properties?.style ?? ''} display:block;`

    // hide the annoying infobox text header on blockquote
    const infoboxheader = find(infoboxNode, (node: any) => {
      return (
        node.value === 'Infobox'
      )
    });
    (infoboxheader as any).value = 'Information'

    return <div dangerouslySetInnerHTML={{__html: toHtml(infoboxNode as Root)}}></div>;
  };
  
  return Infobox
}) satisfies QuartzComponentConstructor