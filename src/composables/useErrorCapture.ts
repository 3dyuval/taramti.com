import { useToast } from 'primevue/usetoast'

export default function useErrorCapture({
  summary = 'שגיאה',
  detail = 'משהו לא עבד',
  fatal = false,
}) {
  const toast = useToast()

  const toastError = (error = detail, fatal?: true) => {
    toast.add({
      severity: fatal ? 'error' : 'warn',
      summary: summary,
      detail: `${detail}: ${error}`,
      life: 2000,
    })

    if (fatal) {
      setTimeout(() => {
        location.href = import.meta.env.BASE_URL
      }, 2000)
    }
  }
  return { toastError }
}
