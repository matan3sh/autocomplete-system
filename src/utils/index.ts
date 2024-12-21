export const debounce = <T extends (...args: unknown[]) => unknown>(
  fn: (...args: unknown[]) => T,
  delay: number
) => {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>): void => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}
