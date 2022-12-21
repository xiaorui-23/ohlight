

type T = string | undefined

const isEmpty = (content : T) => {
    return content || ''
}

export default isEmpty