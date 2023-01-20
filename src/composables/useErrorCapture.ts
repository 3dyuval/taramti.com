import { useToast } from 'primevue/usetoast'

export default function useErrorCapture({
  summary = 'שגיאה',
  detail = 'משהו לא עבד',
}) {
  const toast = useToast()

  const errorToast = (error = detail) =>
    toast.add({
      severity: 'error',
      summary: summary,
      detail: `${error}`,
      life: 2000,
    })

  return { errorToast }
}
