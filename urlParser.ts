export const URLParser =( currentPath : string) => {
    const splittedPath = currentPath.split('/')
    let id;
    if (!isNaN(splittedPath[splittedPath.length -1] as unknown as number)) {
      id = splittedPath[splittedPath.length -1]
      return {url : splittedPath.slice(0, splittedPath.length -1).join('/'), id}
    }
    return {url:splittedPath.join('/'), id}
}