// uno.config.ts
import {
    defineConfig, presetIcons,
    presetUno, presetWebFonts,
    transformerDirectives, transformerVariantGroup
  } from 'unocss'
  
  export default defineConfig({
    presets: [
      presetUno(),
      presetIcons(),
      presetWebFonts({
        fonts: {
            sans: 'Roboto',
            mono: ['Fira Code', 'Fira Mono:400,700'],

        },
      }),
    ],
    transformers: [
      transformerDirectives(),
      transformerVariantGroup(),
    ],
  })