function getResolvedTheme(theme: "dark" | "light" | "system"): "light" | "dark" {
    if (theme !== "system") return theme
    if (typeof window === "undefined") return "light"
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function getProviderImageUrl(provider: { image: [string, string] }, resolvedTheme: "light" | "dark"): string {
    const url = provider.image.find((img) => img.includes(resolvedTheme))
    return url ?? provider.image[0]
}



export { getResolvedTheme, getProviderImageUrl }