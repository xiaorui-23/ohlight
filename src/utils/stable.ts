


let timer: number | null = null

const stable = (fn : Function, delay:number = 200) => {

    if(timer){
        clearTimeout(timer)
        timer = null
    }

    timer = setTimeout(fn, delay);
    
}

export default stable