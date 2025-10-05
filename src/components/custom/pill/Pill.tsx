
export default function Pill({ text }: { text: string }) {
  return (
    <a className="md:flex px-2 py-1 bg-primary/5 hover:bg-primary/10 rounded-sm" href={`https://www.google.com/search?q=${text}`} target="_blank" rel="noopener noreferrer">
      <p className="text-xs text-primary">{text}</p>
    </a>
  )
}