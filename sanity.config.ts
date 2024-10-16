/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import schema from './sanity/schema'
import { visionTool } from '@sanity/vision'
import {
  DocumentActionComponent,
  PluginOptions,
  defineConfig,
  isDev,
} from 'sanity'
import { tags } from 'sanity-plugin-tags'
import { customStructure } from 'sanity-structure'
import { slugOnPublish } from 'sanity-studio/actions/slug-on-publish'
import { Icon } from 'sanity-studio/components/studio-navbar'
import { DocumentType } from 'sanity-studio/types'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'

const plugins: PluginOptions[] = [
  ...(isDev
    ? [
        structureTool({ structure: customStructure }),
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
      ]),
  tags({}),
]

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemas' folder
  schema: { types: schema },
  plugins,
  icon: Icon,
  // studio: { components: { navbar: StudioNavBar } },
  // tools: [{ name: 'exit', title: 'Exit Studio', component: () => null }],
  document: {
    actions: (prev, context) => {
      switch (context.schemaType as DocumentType) {
        case 'general':
        case 'aboutPage':
          return prev?.filter(
            (action) =>
              !(
                [
                  'delete',
                  'unpublish',
                  'duplicate',
                ] as DocumentActionComponent['action'][]
              )?.includes(action?.action),
          )
        case 'bio':
          return prev?.filter(
            (action) =>
              !(['delete'] as DocumentActionComponent['action'][])?.includes(
                action?.action,
              ),
          )
        case 'post':
        case 'recipe':
          return prev?.map((action) =>
            action?.action === 'publish' ? slugOnPublish(action) : action,
          )
        case 'userComment':
          return prev?.filter(
            (action) =>
              !(['duplicate'] as DocumentActionComponent['action'][])?.includes(
                action?.action,
              ),
          )
        default:
          return prev
      }
    },
  },
})
