export {}

function boot() {
  document.querySelectorAll<HTMLElement>('[data-copy]').forEach((node) => {
    node.addEventListener('click', async () => {
      const value = node.dataset.copy || node.textContent?.trim() || ''
      try {
        await navigator.clipboard.writeText(value)
      } catch {
        return
      }
      const toast = document.querySelector('[data-copy-toast]')
      if (!(toast instanceof HTMLElement)) return
      toast.dataset.active = 'true'
      window.setTimeout(() => {
        delete toast.dataset.active
      }, 900)
    })
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot)
} else {
  boot()
}
