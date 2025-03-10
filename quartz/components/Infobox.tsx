import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { find } from 'unist-util-find'
import { toHtml } from "hast-util-to-html"
import { Root } from "hast"
import infoboxStyle from "./styles/infobox.scss"
import cloneDeep from "lodash.clonedeep"

export default (() => {
  const Infobox: QuartzComponent = (props: QuartzComponentProps) => {
    // if the config says no (e.g. hideInfobox: false), then just dont bother.
    if (props.cfg && !props.cfg.hideInfobox) {
      return;
    }

    // find the blockquote for infobox
    const infoboxNode = cloneDeep(find(props.tree, (node: any) => {
      return (
        node.type === "element" && 
        node.tagName === 'blockquote' && 
        node?.properties?.className?.some((c: string) => c === 'infobox')
      )
    }));
    
    // if none find, don't bother
    if (!infoboxNode) {
      return;
    }

    // revert the "display:none" made by HideInfobox transformer
    if ((infoboxNode as any)?.properties?.className) {
      let classNames = (infoboxNode as any)?.properties?.className || [];

      if (classNames.includes('orig-infobox')) {
        classNames = classNames.filter((c: string) => c != 'orig-infobox');
      }

      classNames = [...classNames, 'new-infobox'];

      (infoboxNode as any).properties.className = classNames;
    }

    // hide the annoying infobox text header on blockquote
    const infoboxheader = find(infoboxNode, (node: any) => node.value === 'Infobox');
    if (infoboxheader) {
      (infoboxheader as any).value = 'Information'
    }

    return <div class="information-box" dangerouslySetInnerHTML={{__html: toHtml(infoboxNode as Root)}}></div>;
  };
  
  Infobox.css = infoboxStyle

  return Infobox
}) satisfies QuartzComponentConstructor