import handle from "../utils/handle";
import isEmpty from "../utils/isEmpty";
import keywordSplit from "../utils/keywordSplit";
import stable from "../utils/stable";


interface Params {
    content?: Object;
}


class OLight extends HTMLElement {

    lightKeywords!: string[];
    lightStyles: any;
    lightBody: any;
    lightStable!: number;
    lightDefaultStable!: number;

    constructor (){
        super()
        this.lightDefaultStable = 200
    }

    renderer(){

        this.attachShadow({
            mode: 'open'
        })


        let content = this.getAttributes('content')
        let keywords = this.getAttributes('keywords')
        let styles = this.getAttributes('styles')


        const node = document.createElement('div')

        
        let keywordsValue:Array<string> = keywordSplit((keywords?.value || ''), ',')


        this.lightKeywords = keywordsValue
        this.lightStyles = styles
        this.lightBody = content
        this.lightStable = parseInt(this.getAttributes('stableTime').value || this.lightDefaultStable)


        node.innerHTML = handle(isEmpty(content?.value || ''), keywordsValue, (styles?.value || ''))


        this.shadowRoot?.appendChild(node)

        this.load()
    }



    // load 
    load () {
        this.dispatchedEvent('load', this)
    }




    // 当自定义元素第一次被连接到文档 DOM 时被调用
    connectedCallback(){
        this.renderer()

        this.dispatchedEvent('onConnectedCallback')
    }

    // 当自定义元素与文档 DOM 断开连接时被调用
    disconnectedCallback(){
        this.dispatchedEvent('onDisconnectedCallback')
    }

    // 当自定义元素被移动到新文档时被调用
    adoptedCallback(){
        this.dispatchedEvent('onAdoptedCallback')
    }

    // 当自定义元素的一个属性被增加、移除或更改时被调用。
    attributeChangedCallback(name: any, oldValue: any, newValue: any){
        
        stable(() => {
            
            let data = {
                name, oldValue, newValue
            }
            
            this.update(this, data)

            this.dispatchedEvent('onAttributeChangedCallback', data)
        }, this.lightStable)
    }

    /*
    
        如果需要在元素属性变化后，触发attributeChangedCallback()回调函数，你必须监听这个属性。
        这可以通过定义observedAttributes() get 函数来实现，
        observedAttributes()函数体内包含一个 return 语句，返回一个数组，包含了需要监听的属性名称：
    */ 
    static get observedAttributes () {
        return ['content', 'keywords', 'styles', 'stableTime']
    }





    // 修改自身元素
    update (element: this, data: { name: any; oldValue: any; newValue: any; }) {

        const sRoot = element.shadowRoot as ShadowRoot
        const { name, oldValue, newValue } = data

        // 内容
        if(name.includes('content') && oldValue != null){
            this.lightBody.value = newValue
        }
        // 关键字
        else if(name.includes('keywords') && oldValue != null){
            this.lightKeywords = keywordSplit((newValue || ''), ',')
        }
        // 样式
        else if(name.includes('styles') && oldValue != null){
            this.lightStyles.value = newValue
        }
        // 防抖时间
        else if(name.includes('stableTime') && oldValue != null){
            this.lightStable = parseInt(newValue || this.lightDefaultStable)
        }

        if( oldValue != null){
            sRoot.innerHTML = handle(isEmpty(this.lightBody.value || ''), this.lightKeywords, (this.lightStyles.value || ''))
        }
    }

    // 获取元素自身属性
    getAttributes (attName: string) {
        let attributesList : (Params & NamedNodeMap)  = this.attributes

        return (attributesList[attName] || {})
    }

    // 创建事件
    dispatchedEvent (name:string, detail?: any) {
        this.dispatchEvent(
            new CustomEvent(
                name,
                {
                    detail
                }
            )
        )
    }

}


const _emit = () => {
    customElements.define('o-light', OLight)
}

_emit()



export default OLight