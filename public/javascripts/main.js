var isSubView = false;

function toggleSubView(){
    if(!isSubView){
        document.body.className = "subView";
        isSubView = true;
    }else{
        document.body.className = "";
        isSubView = false;
    }
}