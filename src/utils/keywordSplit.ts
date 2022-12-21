
const keywordSplit = (keyword : string, splitWord : string) : Array<string> => {
    let content : string = keyword
    let contentSplit: Array<string> = []
    if(content.includes(splitWord)){
        contentSplit = content.split(splitWord)
    } else {
        contentSplit = [keyword]
    }

    return contentSplit
} 


export default keywordSplit