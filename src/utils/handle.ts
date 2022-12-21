


const handle = (content: string, keywords: Array<string>, style: string) :string => {

    let c = content
    let s = getStyle(style)

    for(let keyword of keywords){
        
        c = c.replace(new RegExp(keyword, 'g'), `<mark style="${s}">${keyword}</mark>`)
    }

    return c
}

const getStyle = (style: string) => {

    let sv = {}

    let s:string = ''

    if(style.length > 1) sv = JSON.parse(style)
    
    for(let key in sv){

        let item = sv[key]

        s += `${key}:${item};`
    }

    return s
}

export default handle