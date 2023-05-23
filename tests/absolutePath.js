export function getAbsolutePath(relativePath) {
	const path = new URL(relativePath, import.meta.url).pathname
	return path.startsWith('/') ? path.slice(1) : path
}