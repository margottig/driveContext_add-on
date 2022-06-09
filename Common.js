//triggers homepage
function onHomepage(e) {
    console.log(e);
    return createYANtree(true);
  }
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////* /////////////////////////////////////
  function logging(item_id){
   //call treeStructure function
    var treeStructure_result = treeStructure(item_id);
   
   let allCards = []; //empty list where all cards will be pushed
   //iterate through the returned data from the tree Structure function, for each element build a new card
   treeStructure_result.forEach((data_set)=>  construirCard(data_set));
  
   function construirCard(data_set){
      //get the name of the parent folder container from the returned data_set (folders that includes other folders)
      console.log("CARPETA PADRE", data_set)
      let folder_name = data_set[0].parentFolderName; 
    
      let cardSection = CardService.newCardSection();
      // for each folder get the its link, name and files 
      data_set.forEach((child_folder)=>{
        cardSection.addWidget(CardService.newDecoratedText()
                      .setText("<a href="+`${child_folder.folderLink}`+">"+`${child_folder.folderName}`+"</a>"+
                      "<br>"+"<b>"+`${JSON.stringify(child_folder.childFiles)}`+"</b>").setWrapText(true));

      })
    /* // in case for wrapping text
       let cardSection = CardService.newCardSection().setHeader('YANtree')
                      .addWidget(CardService.newDecoratedText()
                      .setText("<b>"+`${element.length}`+"</b>"+"<br>"+"QUEMASVE").setWrapText(true));
                      */
        // create the context folder that contains information about  cards
        var card = CardService.newCardBuilder()
                .setHeader(CardService.newCardHeader().setTitle(`${folder_name}`))
                .addSection(cardSection).build();
    allCards.push(card);
  
   }
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
          parentFolderName:folder.getName(),
          folderName: oneFolder.getName(),
          folderLink:oneFolder.getUrl(),
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
  