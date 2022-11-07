const DATA_MAX_LENGTH = 500;
const IMAGE_MAX_WIDTH = 1000;
const IMAGE_MIN_WIDTH = 10;

function onSheetsWorkSpace(e) {
    //console.log(e);
    //console.log(SpreadsheetApp.getActiveSheet().getActiveCell().getValue(), "SPREADSHEETS")
    const builder = CardService.newCardBuilder();
    /* WATCH HERE!!!!!!!!!!!!!!!!!!!!!! */
    
    const submitAction = CardService.newAction()
        .setFunctionName('qrGeneratorForm')
        .setLoadIndicator(CardService.LoadIndicator.SPINNER);
    const submitButton = CardService.newTextButton()
        .setText('Create QR code')
        .setBackgroundColor('#004357')
        .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
        .setOnClickAction(submitAction);

    const optionsSection = CardService.newCardSection()
        .addWidget(CardService.newDecoratedText()
                    .setText('Before pushing the button, please select the cell containing the data you want to encode')
                    .setWrapText(true))
        .addWidget(submitButton);

    builder.addSection(optionsSection);
    return builder.build();
  
}

function qrGeneratorForm(e){
  const builder = CardService.newCardBuilder();
  //const action = CardService.newAction().setFunctionName('refreshValue')
  const dataInput = CardService.newTextInput()
      .setTitle('Data to encode')
      .setValue(SpreadsheetApp.getActiveSheet().getActiveCell().getValue())
      .setFieldName('data')
      .setHint(`Required. Up to ${DATA_MAX_LENGTH} characters`)

  const widthInput = CardService.newTextInput().setTitle('Generated image width')
      .setFieldName('width')
      .setValue('200')
      .setHint(`Required. Number between ${IMAGE_MIN_WIDTH} and ${IMAGE_MAX_WIDTH}, inclusive.`);

    const nameInput = CardService.newTextInput()
      .setTitle('Name of the QR file')
      .setFieldName('QRname')
      .setHint("Name under which the QR file will be saved")

  const submitAction = CardService.newAction()
      .setFunctionName('onGenerateImage')
      .setLoadIndicator(CardService.LoadIndicator.SPINNER);

  const submitButton = CardService.newTextButton()
      .setText('Generate and insert QR code')
      .setBackgroundColor('#004357')
      .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
      .setOnClickAction(submitAction);

  const optionsSection = CardService.newCardSection()
      .addWidget(dataInput)
      .addWidget(widthInput)
      .addWidget(nameInput)
      .addWidget(submitButton);

  builder.addSection(optionsSection);
  return builder.build();
  
}

function onGenerateImage(e) {
    const data = e.formInput.data;
    let width = e.formInput.width;
    let qr_file_name = e.formInput.QRname;

    //INPUT VALIDATORS SECTION
    if (!data || data.length == 0) {
      return notification_message('Please specify the data to encode.');
    }
    if (data.length > DATA_MAX_LENGTH) {
      return notification_message('Data is too long. Please limit to 500 characters.');
    }
    if (!qr_file_name || qr_file_name.length == 0){
      return notification_message('Please specify the name of the QR file')
    }
  
    try {
      width = parseInt(width);
    } catch (e) {
      return notification_message('Width must be a number.');
    }
  
    if (width < IMAGE_MIN_WIDTH || !width ) {
      return notification_message('Image width Must be between 10 and 1000.');
    }
  
    if (width > IMAGE_MAX_WIDTH  ) {
      return notification_message('Image width must be between 10 and 1000.');
    }
  
    const imageUrl = generateQrCodeUrl(data, width);
    let image;
    let folder = DriveApp.getFolderById(qr_host_temp())
    switch (e.hostApp) {
      case 'sheets':
        const sheets = SpreadsheetApp.getActiveSpreadsheet();
        // TO BE IMPLEMENTED: maybe get the file ID in order to call getParents() then save qr_image inside one of the parent folder
        console.log(sheets, "QUEMASVE")
        const cell = sheets.getCurrentCell();
        if (!cell) {
          return notification_message('Unable to insert image, no cursor.');
        }
        image = UrlFetchApp.fetch(imageUrl);
        let blob = UrlFetchApp.fetch(imageUrl).getBlob();
        folder.createFile(blob).setName(qr_file_name);
        cell.getSheet().insertImage(image, cell.getColumn(), cell.getRow());
        return notification_message('QR code inserted');
      default:
        return notification_message('Host app not supported.');
    }
  }

function generateQrCodeUrl(data, width) {
    // encodeURIComponent() encodes a URI by replacing escape sequences representing the UTF-8 encoding of the character
    const encodedData = encodeURIComponent(data);
    console.log(encodedData, "ENCODED DATA")
    const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodedData}&size=${width}x${width}`;
    return url;
}

function notification_message(message) {
    const notification = CardService.newNotification().setText(message);
    return CardService.newActionResponseBuilder()
        .setNotification(notification)
        .build();
}