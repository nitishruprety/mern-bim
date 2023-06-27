export const inStorage = (key, value, remember = false) => 
    remember ?
        localStorage.setItem(key, value) :
        sessionStorage.setItem(key, value)

export const fromStorage = key =>
    localStorage.getItem(key) || sessionStorage.getItem(key)

export const clearStorage = key => {
    localStorage.removeItem(key)
    sessionStorage.removeItem(key)
}