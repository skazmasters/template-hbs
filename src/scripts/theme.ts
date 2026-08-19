export {}

function boot() {
  document.querySelectorAll<HTMLElement>('[data-popup]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault()
      const id = trigger.dataset.popup
      if (!id) return
      const dialog = document.getElementById(id)
      if (dialog instanceof HTMLDialogElement) dialog.showModal()
    })
  })

  document.querySelectorAll('dialog').forEach((dialog) => {
    dialog.querySelectorAll('[data-close]').forEach((button) => {
      button.addEventListener('click', () => dialog.close())
    })
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close()
    })
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot)
} else {
  boot()
}
