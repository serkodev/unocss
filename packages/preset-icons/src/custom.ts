import type { IconifyIconBuildResult } from '@iconify/utils'
import { convertParsedSVG, iconToSVG, parseSVGContent } from '@iconify/utils'

export function customIconsPreloader() {
  const results = new Map<string, IconifyIconBuildResult>()
  return {
    preload: (svg: string, collection: string, icon: string) => {
      const _svg = parseSVGContent(svg)
      if (_svg) {
        const _icon = convertParsedSVG(_svg)
        if (_icon) {
          // calculates the SVG size in ratio base on 1em
          results.set(`${collection}:${icon}`, iconToSVG(_icon))
        }
      }
    },
    assignProps: (collection: string, icon: string, props: Record<string, string>) => {
      const customIcon = results.get(`${collection}:${icon}`)
      if (customIcon) {
        const { attributes } = customIcon

        if (attributes.width)
          props.width = attributes.width

        if (attributes.height)
          props.height = attributes.height
      }
    },
  }
}
