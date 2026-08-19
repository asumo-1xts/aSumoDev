// Social media icon components
import GitHub from '../components/icons/GitHub.astro'
import Twitter from '../components/icons/Twitter.astro'

export type IconName = 'GitHub' | 'Twitter'

export const iconMap: Record<IconName, any> = {
  GitHub,
  Twitter
}

export function getIcon(iconName: IconName) {
  return iconMap[iconName]
}
