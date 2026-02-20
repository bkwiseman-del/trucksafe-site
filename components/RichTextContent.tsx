'use client'

interface RichTextContentProps {
  content: string
  className?: string
}

function isHtmlContent(content: string): boolean {
  return /<[a-z][\s\S]*>/i.test(content)
}

function plainTextToHtml(text: string): string {
  return text
    .split('\n\n')
    .map((paragraph) => {
      const inner = paragraph
        .split('\n')
        .map((line) => line.replace(/</g, '&lt;').replace(/>/g, '&gt;'))
        .join('<br />')
      return `<p>${inner}</p>`
    })
    .join('')
}

export default function RichTextContent({
  content,
  className = '',
}: RichTextContentProps) {
  const html = isHtmlContent(content) ? content : plainTextToHtml(content)

  return (
    <div
      className={`prose prose-sm max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
