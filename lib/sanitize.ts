import sanitizeHtml from 'sanitize-html'

const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'em', 'u', 's',
  'h1', 'h2', 'h3', 'h4',
  'ul', 'ol', 'li',
  'blockquote', 'pre', 'code',
  'a',
  'div',
  'iframe',
]

const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions['allowedAttributes'] = {
  a: ['href', 'target', 'rel'],
  iframe: ['src', 'width', 'height', 'allowfullscreen', 'frameborder', 'allow'],
  div: ['data-youtube-video'],
}

const ALLOWED_IFRAME_HOSTNAMES = [
  'www.youtube.com',
  'youtube.com',
  'www.youtube-nocookie.com',
  'player.vimeo.com',
]

export function sanitizeContent(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedIframeHostnames: ALLOWED_IFRAME_HOSTNAMES,
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', {
        target: '_blank',
        rel: 'noopener noreferrer nofollow',
      }),
    },
  })
}

/** Returns true if the sanitized HTML has no meaningful text content. */
export function isSanitizedContentEmpty(html: string): boolean {
  const textOnly = html.replace(/<[^>]*>/g, '').trim()
  return textOnly.length === 0
}
