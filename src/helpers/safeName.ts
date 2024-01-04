export function safeName(name: string): string {
  return name.replace(/[^a-z0-9\u0590-\u05fe]/gi, '_').toLowerCase()
}