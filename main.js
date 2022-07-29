(function(){
    let btnAddFolder = document.querySelector("#addFolder");
    let btnAddTextFile = document.querySelector("#addTextFile");
    let btnAddAlbum = document.querySelector("#addAlbum")
    let template = document.querySelector("template");
    let breadcrumb = document.querySelector("#breadcrumb");
    let aRootPath = breadcrumb.querySelector("a");
    let divContainer = document.querySelector("#container");
    let resources = [];
    let cfid = -1;
    let rid =0;

    let divApp = document.querySelector("#app");
    let divAppTitleBar = document.querySelector("#app-title-bar");
    let divAppTitle = document.querySelector("#app-title");
    let divAppMenuBar = document.querySelector("#app-menu-bar");
    let divAppBody = document.querySelector("#app-body");
    let appClose = document.querySelector("#app-close");

    btnAddFolder.addEventListener("click",addFolder);
    btnAddTextFile.addEventListener("click",addTextFile);
    btnAddAlbum.addEventListener("click",addAlbum);
    aRootPath.addEventListener("click",viewFolderFromPath);
    appClose.addEventListener("click",closeApp);

    function closeApp(){
        divAppTitle.innerHTML = "title will come here";
        divAppTitle.setAttribute("rid","");
        divAppMenuBar.innerHTML="";
        divAppBody.innerHTML="";
    }
    function addFolder(){
        let rname = prompt("Enter folder's name");
        if(rname!=null)
            rname=rname.trim();
        if(!rname)
        {
            alert("Empty name is not allowed");
            return ;
        }
        let alreadyExists = resources.some(r => r.rname==rname && r.pid==cfid)
        if(alreadyExists==true)
        {
            alert(rname + " already exists");
            return;
        }
        rid++;
        let pid = cfid;
        addFolderHTML(rname,rid,pid);
        resources.push({
            rid:rid,
            rname:rname,
            rtype:"folder",
            pid:cfid

        })
        saveToStorage();

    }
    function addTextFile() {
        let rname = prompt("Enter file's name");
        if(rname!=null)
            rname=rname.trim();
        if(!rname)
        {
            alert("Empty name is not allowed");
            return ;
        }
        let alreadyExists = resources.some(r => r.rname==rname && r.pid==cfid)
        if(alreadyExists==true)
        {
            alert(rname + " already exists");
            return;
        }
        rid++;
        let pid = cfid;
        addTextFileHTML(rname,rid,pid);
        resources.push({
            rid:rid,
            rname:rname,
            rtype:"text-file",
            pid:cfid,
            isBold: false,
            isItalic: true,
            isUnderline:false,
            bgColor:"#000000",
            textColor:"#FFFFFF",
            fontFamily:"cursive",
            fontSize:20,
            content:"Write your notes from here"

        })
        saveToStorage();

    }
    function addAlbum() {
        let rname = prompt("Enter album's name");
        if(rname!=null)
            rname=rname.trim();
        if(!rname)
        {
            alert("Empty name is not allowed");
            return ;
        }
        let alreadyExists = resources.some(r => r.rname==rname && r.pid==cfid)
        if(alreadyExists==true)
        {
            alert(rname + " already exists");
            return;
        }
        rid++;
        let pid = cfid;
        addAlbumHTML(rname,rid,pid);
        resources.push({
            rid:rid,
            rname:rname,
            rtype:"album",
            pid:cfid,
        })
        saveToStorage();

    }
    function addAlbumHTML(name,rid,pid){
        let divAlbumTemplate = template.content.querySelector(".album");
        let divAlbum = document.importNode(divAlbumTemplate,true);

        let spanRename = divAlbum.querySelector("[action='rename']");
        let spanDelete = divAlbum.querySelector("[action='delete']");
        let spanView = divAlbum.querySelector("[action='view']");

        spanRename.addEventListener("click",renameAlbum);
        spanDelete.addEventListener("click",deleteAlbum);
        spanView.addEventListener("click",viewAlbum);
        let divName = divAlbum.querySelector("div[purpose='name']");
        divAlbum.setAttribute("rid",rid);
        divAlbum.setAttribute("pid",pid);
        divName.innerHTML = name;

        divContainer.appendChild(divAlbum);
    }
    function addTextFileHTML(name,rid,pid){
        let divTextFileTemplate = template.content.querySelector(".text-file");
        let divTextFile = document.importNode(divTextFileTemplate,true);

        let spanRename = divTextFile.querySelector("[action='rename']");
        let spanDelete = divTextFile.querySelector("[action='delete']");
        let spanView = divTextFile.querySelector("[action='view']");

        spanRename.addEventListener("click",renameTextFile);
        spanDelete.addEventListener("click",deleteTextFile);
        spanView.addEventListener("click",viewTextFile);
        let divName = divTextFile.querySelector("div[purpose='name']");
        divTextFile.setAttribute("rid",rid);
        divTextFile.setAttribute("pid",pid);
        divName.innerHTML = name;

        divContainer.appendChild(divTextFile);
    }
    function addFolderHTML(name,rid,pid){
        let divFolderTemplate = template.content.querySelector(".folder");
        let divFolder = document.importNode(divFolderTemplate,true);

        let spanRename = divFolder.querySelector("[action='rename']");
        let spanDelete = divFolder.querySelector("[action='delete']");
        let spanView = divFolder.querySelector("[action='view']");

        spanRename.addEventListener("click",renameFolder);
        spanDelete.addEventListener("click",deleteFolder);
        spanView.addEventListener("click",viewFolder);
        let divName = divFolder.querySelector("div[purpose='name']");
        divFolder.setAttribute("rid",rid);
        divFolder.setAttribute("pid",pid);
        divName.innerHTML = name;

        divContainer.appendChild(divFolder);
    }
    function renameAlbum(){
    }
    function deleteAlbum(){
    }
    function viewAlbum(){
    }
    function renameFolder(){
        let nrname = prompt("Enter folder's name : ");
        if(nrname !=null)
            nrname = nrname.trim();
        
        // empty validation
        if(!nrname)
        {
            alert("Empty name is not allowed");
            return;
        }

        let spanRename = this;
        let divFolder = spanRename.parentNode;
        let divName = divFolder.querySelector("[purpose='name']");
        let orname = divName.innerHTML;
        let ridTBU = parseInt(divFolder.getAttribute("rid"));
        //old validation
        if(orname == nrname)
        {
            alert("Please enter a new name.");
            return;
        }

        //unique validation
        let alreadyExists = resources.some(r=> r.rname == nrname && r.pid==cfid);
        if(alreadyExists == true)
        {
            alert(nrname+" already exists");
            return;
        }

        //change in html
        divName.innerHTML = nrname;
        //change in ram
        let resource = resources.find(r=> r.rid == ridTBU);
        resource.rname = nrname;
        //change in storage
        saveToStorage();
    }
    function renameTextFile(){
        let nrname = prompt("Enter file's name : ");
        if(nrname !=null)
            nrname = nrname.trim();
        
        // empty validation
        if(!nrname)
        {
            alert("Empty name is not allowed");
            return;
        }

        let spanRename = this;
        let divTextFile = spanRename.parentNode;
        let divName = divTextFile.querySelector("[purpose='name']");
        let orname = divName.innerHTML;
        let ridTBU = parseInt(divTextFile.getAttribute("rid"));
        //old validation
        if(orname == nrname)
        {
            alert("Please enter a new name.");
            return;
        }

        //unique validation
        let alreadyExists = resources.some(r=> r.rname == nrname && r.pid==cfid);
        if(alreadyExists == true)
        {
            alert(nrname+" already exists");
            return;
        }

        //change in html
        divName.innerHTML = nrname;
        //change in ram
        let resource = resources.find(r=> r.rid == ridTBU);
        resource.rname = nrname;
        //change in storage
        saveToStorage();
    }
    function renameAlbum(){
        let nrname = prompt("Enter album's name : ");
        if(nrname !=null)
            nrname = nrname.trim();
        
        // empty validation
        if(!nrname)
        {
            alert("Empty name is not allowed");
            return;
        }

        let spanRename = this;
        let divAlbum = spanRename.parentNode;
        let divName = divAlbum.querySelector("[purpose='name']");
        let orname = divName.innerHTML;
        let ridTBU = parseInt(divAlbum.getAttribute("rid"));
        //old validation
        if(orname == nrname)
        {
            alert("Please enter a new name.");
            return;
        }

        //unique validation
        let alreadyExists = resources.some(r=> r.rname == nrname && r.pid==cfid);
        if(alreadyExists == true)
        {
            alert(nrname+" already exists");
            return;
        }

        //change in html
        divName.innerHTML = nrname;
        //change in ram
        let resource = resources.find(r=> r.rid == ridTBU);
        resource.rname = nrname;
        //change in storage
        saveToStorage();
    }
    function deleteFolder(){
        let spanDelete = this;
        let divFolder = spanDelete.parentNode;

        let divName = divFolder.querySelector("[purpose='name']");
        let fid = parseInt(divFolder.getAttribute("rid"));
        let fname = divName.innerHTML;

        let childrenExists = resources.some(r=> r.pid == fid);
        let sure = confirm(`Are you sure you want to delete ${fname} ?` + (childrenExists? " It has childrens. ":""));
        if(!sure)
            return;
        
        //html
        divContainer.removeChild(divFolder);
        //ram
        deleteHelper(fid);
        //storage
        saveToStorage();

    }
    function deleteHelper(fid){
        let children = resources.filter(r=> r.pid == fid);

        for(let i=children.length-1;i>=0;i--)
        {
            deleteHelper(children[i].rid);
        }
        let parentidx = resources.findIndex(r=> r.rid == fid);
        resources.splice(parentidx,true);

    }
    function deleteTextFile(){
        let spanDelete = this;
        let divTextFile = spanDelete.parentNode;

        let divName = divTextFile.querySelector("[purpose='name']");
        let fid = parseInt(divTextFile.getAttribute("rid"));
        let fname = divName.innerHTML;

        let sure = confirm(`Are you sure you want to delete ${fname} ?`);
        if(!sure)
            return;
        
        //html
        divContainer.removeChild(divTextFile);
        //ram
        let fidx = resources.findIndex(r=> r.rid==fid);
        resources.splice(fidx,1);
        //storage
        saveToStorage();
    }
    function deleteAlbum(){
        let spanDelete = this;
        let divAlbum = spanDelete.parentNode;

        let divName = divAlbum.querySelector("[purpose='name']");
        let fid = parseInt(divAlbum.getAttribute("rid"));
        let fname = divName.innerHTML;

        let sure = confirm(`Are you sure you want to delete ${fname} ?`);
        if(!sure)
            return;
        
        //html
        divContainer.removeChild(divAlbum);
        //ram
        let fidx = resources.findIndex(r=> r.rid==fid);
        resources.splice(fidx,1);
        //storage
        saveToStorage();
    }
    function viewFolder(){
        let spanView = this;
        let divFolder = spanView.parentNode;
        let divName = divFolder.querySelector("[purpose='name']");

        let fname = divName.innerHTML;
        let fid = parseInt(divFolder.getAttribute("rid"));

        let aPathTemplate = template.content.querySelector("a");
        let aPath = document.importNode(aPathTemplate,true);

        aPath.innerHTML = fname;
        aPath.setAttribute("rid",fid);
        aPath.addEventListener("click",viewFolderFromPath);

        breadcrumb.appendChild(aPath);

        cfid=fid;
        divContainer.innerHTML="";

        for(let i=0;i<resources.length;i++)
        {
            if(resources[i].pid==cfid)
            {  if(resources[i].rtype=="folder")
                    addFolderHTML(resources[i].rname,resources[i].rid,resources[i].pid);
                else if(resources[i].rtype=="text-file")
                    addTextFileHTML(resources[i].rname,resources[i].rid,resources[i].pid);
                else if(resources[i].rtype=="album")
                    addAlbumHTML(resources[i].rname,resources[i].rid,resources[i].pid);
            }
        }


    }
    function viewFolderFromPath(){
        
        let aPath= this;
        let fid = parseInt(aPath.getAttribute("rid"));

        while(aPath.nextSibling){
            aPath.parentNode.removeChild(aPath.nextSibling);
        }

        let cfid =fid;
        divContainer.innerHTML="";

        for(let i=0;i<resources.length;i++)
        {
            if(resources[i].pid==cfid)
            {  if(resources[i].rtype=="folder")
                    addFolderHTML(resources[i].rname,resources[i].rid,resources[i].pid);
                else if(resources[i].rtype=="text-file")
                    addTextFileHTML(resources[i].rname,resources[i].rid,resources[i].pid);
                else if(resources[i].rtype=="album")
                    addAlbumHTML(resources[i].rname,resources[i].rid,resources[i].pid);
            }
        }

    }
    function viewTextFile(){
        let spanView = this;
        let divTextFile = spanView.parentNode;
        
        let divName = divTextFile.querySelector("[purpose='name']");
        let fname = divName.innerHTML;
        let fid = divTextFile.getAttribute("rid");

        let divNotepadMenuTemplate = template.content.querySelector("[purpose='notepad-menu']");
        let divNotepadMenu = document.importNode(divNotepadMenuTemplate,true);

        divAppMenuBar.innerHTML="";
        divAppMenuBar.appendChild(divNotepadMenu);

        let divNotepadBodyTemplate = template.content.querySelector("[purpose='notepad-body']");
        let divNotepadBody = document.importNode(divNotepadBodyTemplate,true);

        divAppBody.innerHTML="";
        divAppBody.appendChild(divNotepadBody);

        divAppTitle.innerHTML=fname;
        divAppTitle.setAttribute("rid",fid);

        let spanSave = divAppMenuBar.querySelector("[action='save']");
        let spanBold = divAppMenuBar.querySelector("[action='bold']");
        let spanItalic = divAppMenuBar.querySelector("[action='italic']");
        let spanUnderline = divAppMenuBar.querySelector("[action='underline']");
        let inputBGColor = divAppMenuBar.querySelector("[action='bg-color']");
        let inputTextColor = divAppMenuBar.querySelector("[action='fg-color']");
        let selectFontFamily = divAppMenuBar.querySelector("[action='font-family']");
        let selectFontSize = divAppMenuBar.querySelector("[action='font-size']");
        let textarea = divAppBody.querySelector("textarea");
        let spanDownload = divAppMenuBar.querySelector("[action='download']");
        let spanForUpload = divAppMenuBar.querySelector("[action='forUpload']");
        let inputUpload = divAppMenuBar.querySelector("[action='upload']");
        

        spanSave.addEventListener("click",saveTextFile);
        spanBold.addEventListener("click",makeNotepadBold);
        spanItalic.addEventListener("click",makeNotepadItalic);
        spanUnderline.addEventListener("click",makeNotepadUnderline);
        inputBGColor.addEventListener("change",changeNotepadBGColor);
        inputTextColor.addEventListener("change",changeNotepadTextColor);
        selectFontFamily.addEventListener("change",changeNotepadFontFamily);
        selectFontSize.addEventListener("change",changeNotepadFontSize);
        spanDownload.addEventListener("click",downloadNotepad);
        inputUpload.addEventListener("change",uploadNotepad);
        spanForUpload.addEventListener("click",function(){
            inputUpload.click();
        });

        let resource = resources.find(r=> r.rid == fid);

        spanBold.setAttribute("pressed",!resource.isBold);
        spanItalic.setAttribute("pressed",!resource.isItalic);
        spanUnderline.setAttribute("pressed",!resource.isUnderline);
        inputBGColor.value = resource.bgColor;
        inputTextColor.value = resource.textColor;
        selectFontFamily.value = resource.fontFamily;
        selectFontSize.value = resource.fontSize;
        textarea.value = resource.content;

        spanBold.dispatchEvent(new Event("click"));
        spanItalic.dispatchEvent(new Event("click"));
        spanUnderline.dispatchEvent(new Event("click"));
        inputBGColor.dispatchEvent(new Event("change"));
        inputTextColor.dispatchEvent(new Event("change"));
        selectFontFamily.dispatchEvent(new Event("change"));
        selectFontSize.dispatchEvent(new Event("change"));
  
    }
    function viewAlbum(){
        let spanView = this;
        let divAlbum = spanView.parentNode;
        
        let divName = divAlbum.querySelector("[purpose='name']");
        let fname = divName.innerHTML;
        let fid = divAlbum.getAttribute("rid");

        let divAlbumMenuTemplate = template.content.querySelector("[purpose='album-menu']");
        let divAlbumMenu = document.importNode(divAlbumMenuTemplate,true);

        divAppMenuBar.innerHTML="";
        divAppMenuBar.appendChild(divAlbumMenu);

        let divAlbumBodyTemplate = template.content.querySelector("[purpose='album-body']");
        let divAlbumBody = document.importNode(divAlbumBodyTemplate,true);

        divAppBody.innerHTML="";
        divAppBody.appendChild(divAlbumBody);

        divAppTitle.innerHTML=fname;
        divAppTitle.setAttribute("rid",fid);
        
        let spanAdd = divAlbumMenu.querySelector("[action='add']");
        spanAdd.addEventListener("click",addPictureToAlbum);
  
    }
    function addPictureToAlbum(){
        let iurl = prompt("Enter an image url");
        let img = document.createElement("img");

        img.setAttribute("src",iurl);
        img.addEventListener("click",showPictureInMain);

        let divPictureList = divAppBody.querySelector(".picture-list");
        divPictureList.appendChild(img);
    }
    function showPictureInMain(){
        let divPictureMainImg = divAppBody.querySelector(".picture-main img");
        divPictureMainImg.setAttribute("src",this.getAttribute("src"));
        this.setAttribute("pressed",true);
    }
    function downloadNotepad(){
        let fid = parseInt(divAppTitle.getAttribute("rid"));
        let resource = resources.find(r=> r.rid==fid);
        let divNotepadMenu = this.parentNode;

        let strForDownload = JSON.stringify(resource);
        let encodedata = encodeURIComponent(strForDownload);

        let aDownload = divNotepadMenu.querySelector("[purpose='download']");
        aDownload.setAttribute("href","data:text/json;charset=utf-8,"+encodedata);
        aDownload.setAttribute("download",resource.rname + ".json");
        aDownload.click();
    }
    function uploadNotepad(){
       let file = window.event.target.files[0];
       let reader = new FileReader();
       reader.addEventListener("load",function(){
            let data = window.event.target.result;
            let resource = JSON.parse(data);


            let spanBold = divAppMenuBar.querySelector("[action='bold']");
            let spanItalic = divAppMenuBar.querySelector("[action='italic']");
            let spanUnderline = divAppMenuBar.querySelector("[action='underline']");
            let inputBGColor = divAppMenuBar.querySelector("[action='bg-color']");
            let inputTextColor = divAppMenuBar.querySelector("[action='fg-color']");
            let selectFontFamily = divAppMenuBar.querySelector("[action='font-family']");
            let selectFontSize = divAppMenuBar.querySelector("[action='font-size']");
            let textarea = divAppBody.querySelector("textarea");
            
                
            spanBold.setAttribute("pressed",!resource.isBold);
            spanItalic.setAttribute("pressed",!resource.isItalic);
            spanUnderline.setAttribute("pressed",!resource.isUnderline);
            inputBGColor.value = resource.bgColor;
            inputTextColor.value = resource.textColor;
            selectFontFamily.value = resource.fontFamily;
            selectFontSize.value = resource.fontSize;
            textarea.value = resource.content;
        
            spanBold.dispatchEvent(new Event("click"));
            spanItalic.dispatchEvent(new Event("click"));
            spanUnderline.dispatchEvent(new Event("click"));
            inputBGColor.dispatchEvent(new Event("change"));
            inputTextColor.dispatchEvent(new Event("change"));
            selectFontFamily.dispatchEvent(new Event("change"));
            selectFontSize.dispatchEvent(new Event("change"));
       });
       reader.readAsText(file);
    }
    function saveTextFile() {
        let fid = divAppTitle.getAttribute("rid");
        let resource = resources.find(r=> r.rid == fid);


        let spanBold = divAppMenuBar.querySelector("[action='bold']");
        let spanItalic = divAppMenuBar.querySelector("[action='italic']");
        let spanUnderline = divAppMenuBar.querySelector("[action='underline']");
        let inputBGColor = divAppMenuBar.querySelector("[action='bg-color']");
        let inputTextColor = divAppMenuBar.querySelector("[action='fg-color']");
        let selectFontFamily = divAppMenuBar.querySelector("[action='font-family']");
        let selectFontSize = divAppMenuBar.querySelector("[action='font-size']");
        let textarea = divAppBody.querySelector("textarea");

        resource.isBold = spanBold.getAttribute("pressed")=="true";
        resource.isItalic =spanItalic.getAttribute("pressed")=="true";
        resource.isUnderline = spanUnderline.getAttribute("pressed")=="true";
        resource.bgColor = inputBGColor.value;
        resource.textColor = inputTextColor.value;
        resource.fontFamily = selectFontFamily.value;
        resource.fontSize = selectFontSize.value;
        resource.content = textarea.value;

        saveToStorage();

    }
    function makeNotepadBold(){
        let textarea = divAppBody.querySelector("textarea");
        let IsPressed = this.getAttribute("pressed")=="true";
        if(IsPressed==false)
        {
            this.setAttribute("pressed",true);
            textarea.style.fontWeight="bold";
        }
        else
        {
            this.setAttribute("pressed",false);
            textarea.style.fontWeight="normal";
        }
        
    }
    function makeNotepadItalic(){
        let textarea = divAppBody.querySelector("textarea");
        let IsPressed = this.getAttribute("pressed")=="true";
        if(IsPressed==false)
        {
            this.setAttribute("pressed",true);
            textarea.style.fontStyle="italic";
        }
        else
        {
            this.setAttribute("pressed",false);
            textarea.style.fontStyle="normal";
        }
    }
    function makeNotepadUnderline(){
        let textarea = divAppBody.querySelector("textarea");
        let IsPressed = this.getAttribute("pressed")=="true";
        if(IsPressed==false)
        {
            this.setAttribute("pressed",true);
            textarea.style.textDecoration="underline";
        }
        else
        {
            this.setAttribute("pressed",false);
            textarea.style.textDecoration="none";
        }
    }
    function changeNotepadBGColor(){
        let color = this.value;
        let textarea =  divAppBody.querySelector("textarea");
        textarea.style.backgroundColor = color;
    }
    function changeNotepadTextColor(){
        let color = this.value;
        let textarea =  divAppBody.querySelector("textarea");
        textarea.style.color = color;
    }
    function changeNotepadFontFamily(){
        let fontfamily = this.value;
        let textarea =  divAppBody.querySelector("textarea");
        textarea.style.fontFamily = fontfamily;
    }
    function changeNotepadFontSize(){
        let fontsize = this.value;
        let textarea =  divAppBody.querySelector("textarea");
        textarea.style.fontSize = fontsize;
    }
    function loadFromStorage(){
      let json = localStorage.getItem("data");
      
      if(!json)
        return ;
    
        resources=JSON.parse(json);
        for(let i=0;i<resources.length;i++)
        {
                if(resources[i].pid==cfid)
                {  if(resources[i].rtype=="folder")
                        addFolderHTML(resources[i].rname,resources[i].rid,resources[i].pid);
                    else if(resources[i].rtype=="text-file")
                        addTextFileHTML(resources[i].rname,resources[i].rid,resources[i].pid);
                    else if(resources[i].rtype=="album")
                        addAlbumHTML(resources[i].rname,resources[i].rid,resources[i].pid);
                }
                
                if(resources[i].rid>rid)
                    rid = resources[i].rid;
        }

    }
    function saveToStorage(){
        let json = JSON.stringify(resources);
        localStorage.setItem("data",json);
    }
    loadFromStorage();
})()