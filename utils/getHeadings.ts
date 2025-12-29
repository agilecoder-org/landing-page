export function getHeadings(source: string) {
    const headingLines = source.split("\n").filter((line) => {
        return line.match(/^#{2,4}\s/)
    })

    return headingLines.map((raw) => {
        const text = raw.replace(/^#{2,4}\s/, "")
        const level = raw.match(/^#{2,4}/)?.[0].length || 2
        // Basic slugification - must match rehype-slug logic
        const id = text
            .toLowerCase()
            .trim() // remove leading/trailing whitespace
            .replace(/[^\w\s-]/g, "") // remove non-word chars
            .replace(/[\s_-]+/g, "-") // replace spaces/underscores with dashes
            .replace(/^-+|-+$/g, "") // remove leading/trailing dashes

        return { text, level, id }
    })
}
