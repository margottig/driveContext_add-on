function onDriveYanTree(e) {
    //select items from the drive workspace
    // Logger.log("onDriveYanTree EVENTS" + e)
    var items = e.drive.selectedItems;
    // console.log("onDriveYanTree ITEMS" + items)
    // admit 1 item
    items = items.slice(0,1);
    var item_id = items.map(item => {
      //store and return the item id
      var id = item.id;
      return id;
    });
    return logging(item_id);
    //return generateFolderTree();
  }