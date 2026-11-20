export function scrollToCurrentRoadmapModule({ root = document, behavior = 'smooth' } = {}) {
  const currentModule = root.querySelector('.roadmap-module-item.journey-current')
  if (!currentModule) return false

  currentModule.scrollIntoView({ behavior, block: 'center' })
  return true
}
