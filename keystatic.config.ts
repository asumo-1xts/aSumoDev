import { config, fields, collection, singleton } from '@keystatic/core'

const contentSidebarPositionOptions = [
  { label: 'Right', value: 'right' },
  { label: 'Left', value: 'left' }
] as const

export default config({
  storage: import.meta.env.PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
    ? {
        kind: 'github',
        repo: {
          owner: import.meta.env.PUBLIC_KEYSTATIC_REPO_OWNER!,
          name: import.meta.env.PUBLIC_KEYSTATIC_REPO_NAME!
        }
      }
    : {
        kind: 'local'
      },

  singletons: {
    hero: singleton({
      label: 'Hero Section',
      path: 'src/content/hero/',
      schema: {
        name: fields.text({
          label: 'Name',
          description: 'Your name or site name'
        }),
        title: fields.text({
          label: 'Title',
          description: 'Main headline/tagline'
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          description: 'Hero section description'
        }),
        avatar: fields.image({
          label: 'Avatar',
          directory: 'src/assets/hero',
          publicPath: '@assets/hero/'
        }),
        location: fields.text({
          label: 'Location',
          description: 'e.g., "🇧🇷 Brazil"'
        }),
        socialLinks: fields.array(
          fields.object({
            url: fields.text({
              label: 'URL',
              description: 'Profile URL or mailto: link',
              validation: { isRequired: true }
            }),
            icon: fields.select({
              label: 'Icon',
              description: 'Select a social media icon',
              options: [
                { label: 'GitHub', value: 'GitHub' },
                { label: 'X', value: 'Twitter' }
              ],
              defaultValue: 'GitHub'
            }),
            label: fields.text({
              label: 'Aria Label',
              description: "Accessibility label (e.g., 'GitHub', 'Email')",
              validation: { isRequired: true }
            })
          }),
          {
            label: 'Social Links',
            itemLabel: (props) => props.fields.label.value || 'New Link',
            description: 'Your social media and contact links'
          }
        )
      }
    }),

    general: singleton({
      label: 'General Settings',
      path: 'src/content/general/',
      schema: {
        projectsLayout: fields.select({
          label: 'Projects Page Layout',
          description: 'Choose the layout style for the projects listing page',
          options: [
            {
              label: 'Grid (default) — Category sections with card grids',
              value: 'grid'
            },
            {
              label: 'Horizontal Tabs — Category tabs at the top',
              value: 'tabs-horizontal'
            },
            {
              label: 'Sidebar — Category menu on the left side',
              value: 'tabs-vertical'
            }
          ],
          defaultValue: 'grid'
        }),
        showContentSidebar: fields.checkbox({
          label: 'Show Content Sidebar',
          description:
            'Show H1/H2 links with collapsible H3 sublevels on article and project pages',
          defaultValue: true
        }),
        contentSidebarPosition: fields.select({
          label: 'Content Sidebar Position',
          description: 'Choose the default side for the article content menu',
          options: contentSidebarPositionOptions,
          defaultValue: 'right'
        }),
        showProjectsSection: fields.checkbox({
          label: 'Show Projects Section',
          defaultValue: true
        })
      }
    })
  },

  collections: {
    projects: collection({
      label: 'Projects',
      path: 'src/content/projects/*',
      slugField: 'title',
      entryLayout: 'content',
      format: {
        contentField: 'content'
      },
      schema: {
        featured: fields.checkbox({
          label: 'Featured Project',
          description: 'Show this project on the homepage',
          defaultValue: false
        }),
        category: fields.relationship({
          label: 'Category',
          description:
            'Assign a category to group this project on the projects page',
          collection: 'projectCategories'
        }),
        title: fields.slug({
          name: { label: 'Project Name' }
        }),
        description: fields.text({
          label: 'Short Description',
          multiline: true,
          description: 'Brief project summary for cards'
        }),
        image: fields.image({
          label: 'Project Image',
          directory: 'src/assets/projects',
          publicPath: '@assets/projects/',
          validation: { isRequired: true },
          description: 'Main project image'
        })
        sourceLink: fields.url({
          label: 'Source Code Link',
          description: 'GitHub or repository URL (optional)'
        })
      }
    })
  }
})
