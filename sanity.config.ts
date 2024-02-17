/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import schema from './sanity/schema'
import { visionTool } from '@sanity/vision'
import { PluginOptions, defineConfig, isDev } from 'sanity'
import { customStructure } from 'sanity-structure'
import StudioNavBar from 'sanity-studio/components/studio-navbar'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'

const plugins: PluginOptions[] = isDev
  ? [
      structureTool(),
      visionTool({ defaultApiVersion: apiVersion }),
      presentationTool({
        previewUrl: {
          draftMode: {
            enable: '/api/draft',
          },
        },
      }),
    ]
  : [
      structureTool({ structure: customStructure }),
      presentationTool({
        previewUrl: {
          draftMode: {
            enable: '/api/draft',
          },
        },
      }),
    ]

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemas' folder
  schema: { types: schema },
  plugins,
  studio: { components: { navbar: StudioNavBar } },
})
