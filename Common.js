//triggers homepage
function onHomepage(e) {
    console.log(e);
    return createYANtree(true);
  }
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////* /////////////////////////////////////
  function logging(item_id){
   
    var objeto = treeStructure(item_id);
    console.log('holaMUNDOOOOOO');
   
   let allCards = [];
   objeto.forEach((element)=>  construirCard(element));
  
   function construirCard(element){
    //get the folder name of each returned element (folders that includes other folders)
    let folder_name = element[0].folderName; 
  
    //get values
    let allInfo=[]
    element.forEach((uno) =>{
      let parentName = uno.folderName;
      allInfo.push(parentName)
  
    })
    
    elemento = JSON.stringify(element); 
       let cardSection = CardService.newCardSection().setHeader('YANtree')
                      .addWidget(CardService.newDecoratedText()
                      .setText("<b>"+`${allInfo}`+"</b>").setWrapText(true));
        var card = CardService.newCardBuilder()
                .setHeader(CardService.newCardHeader().setTitle(`${folder_name}`))
                .addSection(cardSection).build();
    allCards.push(card);
  
   }
    //var section = CardService.newCardSection().setHeader("QUEMASVE");
     return allCards;
  
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  
  function treeStructure(item_id) {
    const getDocList = (folderId, allFolders = []) => {
      const folder = DriveApp.getFolderById(folderId);
      const folders = folder.getFolders();
      let temp = [];
      while (folders.hasNext()){
        const oneFolder = folders.next();
        const files = oneFolder.getFiles();
        let docList = [];
        while (files.hasNext()){
          const oneFile = files.next();
          docList.push({
            fileName:oneFile.getName()//,
            //fileId: oneFile.getId()
            });
        }
        temp.push({
          folderName: oneFolder.getName(),
          folderId: oneFolder.getId(),
          parentDirId: folderId,
          //parentDirName: folder.getName(), 
          childFiles: docList
        });
      }
      if (temp.length > 0 ) {
        allFolders.push(temp);
        temp.forEach((event) => getDocList(event.folderId, allFolders));
      }
      return allFolders;
    };
    const directoryId = item_id;
    const result = getDocList(directoryId);
  
    return result;
  }
  
  //x/x/x/x/x/x/x/x/x/x/x/x/x/x/x/x/x/x/x/x//x/x/x/x/x/x/x/x/x/x/x/x/x/x//xx//x/x/x/x/x/x/x/x/x/x//x/x/x/x/x/x/x/x//x/x/
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //x/x/x/x/x/x/x/x/x/x/x/x/x/x/x/x/x/x/x/x//x/x/x/x/x/x/x/x/x/x/x/x/x/x//xx//x/x/x/x/x/x/x/x/x/x//x/x/x/x/x/x/x/x//x/x/x
  
  function createYANtree(isHomePage){
    if (!isHomePage){
      isHomePage = false;
    }
  
    var button = CardService.newTextButton()
      .setText('WhereAmI')
      .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
  
    var buttonSet = CardService.newButtonSet()
      .addButton(button);
  
    // Assemble the widgets and return the card
    
    var section = CardService.newCardSection()
      .addWidget(buttonSet);
    var card = CardService.newCardBuilder()
      .addSection(section);
  
    if (!isHomePage){
      var peekHeader = CardService.newCardHeader()
        .setTitle('Contextual Dir')
      card.setPeekCardHeader(peekHeader)
    }
    return card;
  }
  