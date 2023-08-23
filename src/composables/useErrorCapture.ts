import { useToast } from 'primevue/usetoast'

export default function useErrorCapture({
  summary = 'שגיאה',
  detail = 'משהו לא עבד',
}) {
  const toast = useToast()

  const toastError = (error = detail) => {
    console.error(`${detail}: ${error}`)

    toast.add({
      severity: 'error',
      summary: summary,
      detail: `${detail}: ${error}`,
      life: 2000,
    })
  }
  return { toastError }
}
