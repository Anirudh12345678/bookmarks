let myleads=[]
const field = document.getElementById("input-fld")
const ulEl = document.getElementById("inputs")
const inputBtn = document.getElementById("save1")
const delBtn = document.getElementById("delete")
const saved = document.getElementById("save")

let leads = JSON.parse(localStorage.getItem("myleads"))
 if (leads) {
    myleads = leads
    renderleads(myleads)
 }


inputBtn.addEventListener("click",function() {
    myleads.push(field.value)
    field.value = ''
    localStorage.setItem("myleads",JSON.stringify(myleads))
    renderleads(myleads)
})

delBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myleads=[]
    renderleads(myleads)
})

saved.addEventListener("click",function(){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        myleads.push(tabs[0].url)
        localStorage.setItem("myleads",JSON.stringify(myleads))
        renderleads(myleads)
    })
})

function renderleads(leads) {
    let listitems=""
    for (let i=0;i<myleads.length;i++) {
        listitems += `
            <li>
                <a target='_blank' href='${myleads[i]}'>
                    ${myleads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML= listitems
}

