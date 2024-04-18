interface WallpaperDetail {
  headline: string,
  title: string,
  copyright: string,
  description: string,
  quickFact: string,
  knowMoreURL: string,
  timestamp: number,
  id: string
}

interface WallpaperGroup {
  month: string,
  data: WallpaperDetail[]
}

export type { WallpaperDetail, WallpaperGroup }