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
                { label: 'LinkedIn', value: 'LinkedIn' },
                { label: 'Twitter/X', value: 'Twitter' },
                { label: 'Bluesky', value: 'Bluesky' },
                { label: 'Instagram', value: 'Instagram' },
                { label: 'YouTube', value: 'YouTube' },
                { label: 'Email', value: 'Email' },
                { label: 'CodeTips (Folder)', value: 'FolderCode' }
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
        extraLinks: fields.array(
          fields.object({
            link: fields.text({
              label: 'Link URL',
              description: 'URL or path (e.g., /blog or https://example.com)',
              validation: { isRequired: true }
            }),
            icon: fields.select({
              label: 'Icon',
              description: 'Select an icon from Lucide icon library',
              options: [
                { label: 'Flower (Flower2)', value: 'Flower2' },
                { label: 'Book (BookOpen)', value: 'BookOpen' },
                { label: 'File (FileText)', value: 'FileText' },
                { label: 'Code (CodeXml)', value: 'CodeXml' },
                { label: 'Mail (Mail)', value: 'Mail' },
                { label: 'Home (Home)', value: 'Home' },
                { label: 'User (User)', value: 'User' },
                { label: 'Briefcase (Briefcase)', value: 'Briefcase' },
                {
                  label: 'Graduation Cap (GraduationCap)',
                  value: 'GraduationCap'
                },
                { label: 'Link (Link)', value: 'Link' }
              ],
              defaultValue: 'Link'
            }),
            label: fields.text({
              label: 'Tooltip Label',
              description: 'Label shown on hover',
              validation: { isRequired: true }
            }),
            displayOn: fields.select({
              label: 'Display On',
              description: 'Where this link should be displayed',
              options: [
                { label: 'Both (Dock & Fab)', value: 'both' },
                { label: 'Only Dock (Mobile)', value: 'dock' },
                { label: 'Only Fab (Desktop)', value: 'fab' }
              ],
              defaultValue: 'dock'
            })
          }),
          {
            label: 'Extra Links',
            itemLabel: (props) => props.fields.label.value || 'New Link',
            description: 'Links to display in the floating action button'
          }
        ),
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
        }),
        startDate: fields.date({
          label: 'Start Date',
          validation: { isRequired: true }
        }),
        endDate: fields.date({
          label: 'End Date',
          description: 'Leave empty if ongoing'
        }),
        demoLink: fields.url({
          label: 'Demo Link',
          description: 'Live demo URL (optional)'
        }),
        sourceLink: fields.url({
          label: 'Source Code Link',
          description: 'GitHub or repository URL (optional)'
        })
      }
    })
  }
})
