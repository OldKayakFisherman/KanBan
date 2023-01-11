
function wireEvents(){
    let newTagInput = document.getElementById('txtNewTag');
    newTagInput.addEventListener("keydown", handleAddTag)
}

function handleAddTag(ev){
    if(ev.keyCode == 13){
        console.log('Hit Enter')
    }
}



window.onload = () => {
    wireEvents()
}