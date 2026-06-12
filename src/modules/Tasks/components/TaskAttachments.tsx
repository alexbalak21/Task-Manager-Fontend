import { ExternalLink } from 'lucide-react'

type Attachment = {
  id: string
  url: string
}

type Props = {
  attachments: Attachment[]
}

export default function TaskAttachments({ attachments }: Props) {
  return (
    <section>
      <h3 className="mb-4 text-2xl font-semibold text-zinc-700">Attachments</h3>
      <ul className="space-y-3">
        {attachments.map((attachment, index) => (
          <li
            key={attachment.id}
            className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4"
          >
            <div className="flex min-w-0 items-center gap-5">
              <span className="w-8 text-xl font-semibold text-zinc-400">{String(index + 1).padStart(2, '0')}</span>
              <a
                href={attachment.url}
                target="_blank"
                rel="noreferrer"
                className="truncate text-2xl font-medium text-zinc-900 hover:text-blue-700"
              >
                {attachment.url}
              </a>
            </div>
            <a
              href={attachment.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open attachment ${index + 1}`}
              className="text-zinc-400 transition-colors hover:text-zinc-700"
            >
              <ExternalLink size={26} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
