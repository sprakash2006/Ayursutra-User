import { useState, useCallback } from 'react'

const toastTimeouts = new Map()

export function useToast() {
  const [toasts, setToasts] = useState([])

  const toast = useCallback(({ title, description, variant = 'default', duration = 5000, action, ...props }) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { id, title, description, variant, action, ...props }

    setToasts(prev => [...prev, newToast])

    if (duration > 0) {
      const timeoutId = setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id))
        toastTimeouts.delete(id)
      }, duration)
      toastTimeouts.set(id, timeoutId)
    }

    return {
      id,
      dismiss: () => {
        const timeoutId = toastTimeouts.get(id)
        if (timeoutId) {
          clearTimeout(timeoutId)
          toastTimeouts.delete(id)
        }
        setToasts(prev => prev.filter(toast => toast.id !== id))
      }
    }
  }, [])

  const dismiss = useCallback((toastId) => {
    const timeoutId = toastTimeouts.get(toastId)
    if (timeoutId) {
      clearTimeout(timeoutId)
      toastTimeouts.delete(toastId)
    }
    setToasts(prev => prev.filter(toast => toast.id !== toastId))
  }, [])

  return {
    toast,
    dismiss,
    toasts
  }
}
