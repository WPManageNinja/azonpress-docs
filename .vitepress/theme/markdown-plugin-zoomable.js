/**
 * markdown-it rule that replaces every markdown image with the <ZoomableImage>
 * component so screenshots can be clicked to zoom.
 *
 * Three details here are load-bearing — see CLAUDE.md ("Image zoom") before changing them:
 *
 * 1. No slot. The component renders its own <img> from the `src` prop, so the
 *    server and the client produce identical markup.
 * 2. escapeAttr() on both values. Alt text containing " & < > would otherwise
 *    terminate the attribute early and break the tag (and is an XSS vector).
 * 3. <ClientOnly> wrapper. The component renders <div>s, which markdown puts
 *    inside a <p>; the browser's HTML parser closes the <p> early, which would
 *    be a hydration mismatch and make Vue discard the image. Rendering client
 *    side only means there is no server markup to mismatch against.
 *
 * The `src` prop is a plain string and therefore does NOT go through Vite's
 * asset pipeline on its own. This site writes image paths as on-disk paths
 * (/guide/public/images/...) that only exist at build time, so `ZoomableImage`
 * is registered in `vue.template.transformAssetUrls` in config.js to make Vite
 * hash and bundle them exactly as it does for a plain <img src>. Without that
 * entry every image 404s in production.
 */

/** Escape for an HTML attribute value to avoid broken markup and XSS. */
function escapeAttr(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function zoomablePlugin(md) {
  const defaultRender =
    md.renderer.rules.image ||
    ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options))

  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    if (!token.attrs) return defaultRender(tokens, idx, options, env, self)

    const srcIndex = token.attrIndex('src')
    if (srcIndex < 0) return defaultRender(tokens, idx, options, env, self)

    const src = token.attrs[srcIndex][1]
    const alt = token.content || ''

    // Explicit closing tag, not a self-closing one — Vue's parsing of
    // markdown-emitted markup is more reliable with it.
    return `<ClientOnly><ZoomableImage src="${escapeAttr(src)}" alt="${escapeAttr(alt)}"></ZoomableImage></ClientOnly>`
  }
}
