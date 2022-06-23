//triggers homepage
function onHomepage(e) {
    console.log(e);
    return createYANtree(true);
  }
  
  ////////////////////////////////////////////////////* /////////////////////////////////////
  function logging(item_id){
   //call treeStructure function
    let treeStructure_result = treeStructure(item_id);
    //Logger.log('treeStructure: ' + treeStructure_result);
   
   let allCards = []; //empty list where all cards will be pushed
   //iterate through the returned data from the treeStructure function, for each element build a new card
   treeStructure_result.forEach((data_set) => construirCard(data_set));
  
   function construirCard(data_set){
      //get the name of the folder folder container from the returned data_set (folders that includes other folders)
      console.log("CARPETA PADRE", typeof(data_set))
      if (data_set.length < 1){
        //hoist folder_name
        Logger.log("EMPY DATA SET:", data_set, item_id)
        let folder_name = "QUEMASVE";

        let cardSection = CardService.newCardSection();
        cardSection.addWidget(CardService.newDecoratedText()
                        .setText("No sub folders found").setWrapText(true));

        let card = CardService.newCardBuilder()
        .setHeader(CardService.newCardHeader().setTitle(`${folder_name}`))
        .addSection(cardSection).build();
        allCards.push(card);
      }
      else {
        let folder_name = data_set[0].parentFolderName;

        let cardSection = CardService.newCardSection();
        // for each folder get the links, names and files 
        data_set.forEach((child_folder)=>{
          cardSection.addWidget(CardService.newDecoratedText()
                        .setText("<a href="+`${child_folder.subFolderLink}`+">"+`${child_folder.subFolderName}`+"</a>"+
                        "<br>"+"<b>"+`${JSON.stringify(child_folder.childFiles)}`+"</b>").setWrapText(true));
  
        });
        var card = CardService.newCardBuilder()
        .setHeader(CardService.newCardHeader().setTitle(`${folder_name}`))
        .addSection(cardSection).build();
        allCards.push(card);
        
      }
        /* // in case for wrapping text
          let cardSection = CardService.newCardSection().setHeader('YANtree')
                          .addWidget(CardService.newDecoratedText()
                          .setText("<b>"+`${element.length}`+"</b>"+"<br>"+"QUEMASVE").setWrapText(true));
      
                          */
    }
     return allCards;
  }
 
  //x/x/x/x/x/x/x/x/x/x/x/x/x/x/x/x/x/x/x/x//x/x/x/x/x/x/x/x/x/x/x/x/x/x//xx//x/x/x/x/x/x/x/x/x/x//x/x/x/x/x/x/x/x//x/x/
   
function treeStructure(item_id) {
  // store all sub folders from result_ChildFolders
  let allSubFolders = [];
  try {
    // tree of any sub folder
    let folder = DriveApp.getFolderById(item_id);
    let result_ChildFolders = getChildFolders(folder);
    allSubFolders.push(result_ChildFolders);
  } catch (e) {
    Logger.log(e.toString(), "CATCH_CATCH_CATCH");
  }
  return allSubFolders;
}

function getChildFolders(folder) {
  let folders = folder.getFolders();
  let temp = [];
  //Logger.log('temp: ' + temp);
  while (folders.hasNext()) {
    let oneFolder = folders.next();     
    let docList = [];
    //Logger.log('docList: ' + docList);
    //Logger.log('Folder Name: ' + oneFolder.getName());
    // get all files from oneFolder
    let files = oneFolder.getFiles();

    while (files.hasNext()) {
      let oneFile = files.next();
      //Logger.log('File Name: ' +  oneFile.getName());
      docList.push({fileName:oneFile.getName()});
    }
    Logger.log('docList_2ndWhile: ' + docList);
    temp.push({
      parentFolderName:folder.getName(),
      parentDirId: folder.getId(), 
      subFolderName: oneFolder.getName(),
      subFolderLink:oneFolder.getUrl(),
      subFolderId: oneFolder.getId(),
      childFiles: docList
      });

  }
       // Time-Execution too long for recursive call for nested sub-folders
      //  getChildFolders(subFolder);  
  return temp;
}
  
  //x/x/x/x/x/x/x/x/x/x/x/x/x/x/x/x/x/x/x/x//x/x/x/x/x/x/x/x/x/x/x/x/x/x//xx//x/x/x/x/x/x/x/x/x/x//x/x/x/x/x/x/x/x//x/x/
  
  function createYANtree(isHomePage){
    if (!isHomePage){
      isHomePage = false;
    }
    // Create a footer to be shown at the bottom
    var footerSection = CardService.newFixedFooter()
      .setPrimaryButton(CardService.newTextButton()
      .setText('Powered by margottig')
      .setOpenLink(CardService.newOpenLink()
      .setUrl('https://euracoustics.org/yan/')));

    // Assemble the widgets and return the card.
    var section =  CardService.newCardSection()
        .addWidget(CardService.newImage()
        .setImageUrl('https://euracoustics.org/media/images/logo_YAN-deno_2.original.png')
        .setAltText('YAN'))

    var card = CardService.newCardBuilder()
    .addSection(section)
    .setFixedFooter(footerSection);

    return card.build();
  }
  