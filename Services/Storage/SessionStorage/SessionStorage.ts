export const GetItemFromSessionStorage = (name: string) => {
    return sessionStorage.getItem(name)
}

export const SetToSessionStorage = (key: string, value: string) => {

    sessionStorage.setItem(key, value)


}


