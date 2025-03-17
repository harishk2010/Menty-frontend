export function deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Sat, 20 Jan 1970 00:00:00 GMT; path=/;`;
  }