export const URLParser = (currentPath: string) => {
  const splittedPath = currentPath.split('/')
  let id

  if (
    splittedPath[1] === 'api' &&
    splittedPath[2] === 'users' &&
    splittedPath.length === 4
  ) {
    id = splittedPath[splittedPath.length - 1]
    return {
      url: splittedPath.slice(0, splittedPath.length - 1).join('/'),
      id,
    }
  }

  return { url: splittedPath.join('/'), id }
}
