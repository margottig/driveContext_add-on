<div id="top"></div>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="add_a_logo_url_here">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h2 align="center">Drive Context add-on</h2>

  <p align="center">
    Need a side tree/context view for your shared G Drive workspace?
    <br />
    <a href="https://github.com/margottig/driveContext_add-on"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="">View Demo</a>
    ·
    <a href="https://github.com/margottig/driveContext_add-on/issues">Report Bug</a>
    ·
    <a href="https://github.com/margottig/driveContext_add-on/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a><li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project
<!-- add here a GIF -->
[![Product Name Screen Shot][product-screenshot]](https://example.com)

The aim of this project is to optimize the Gdrive folder structure visualization by using card nodes. When selecting a folder inside the Gdrive workspace, this add-on generates a top down list sidebar of card nodes. Each card node contains subfolder name, name of corresponding files and a link to the path of the subfolder as well.

Here's why:
* Your time is important. You should be focused on the workspace context that enables you to create a project or do an amazaing job. 
* Avoid distractions or noisy data when moving among files and folders. :smile:

Of course, your needs may be different. So I'll be adding more widgets in the near future. You may also suggest changes by forking this repo and creating a pull request or opening an issue. Thanks! 

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [Google Apps Script](https://developers.google.com/apps-scrip)
* [JavaScript]()


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started
To get it up and running follow these simple steps. If you are new to add-on development, take a look to the [Apps Script](https://developers.google.com/apps-script/add-ons/overview) documentation.

### Prerequisites

Be sure to have [Node.js](https://nodejs.org/en/) installed including the `npm` and `npx` tools for installing and executing packages. 

### Installation

_Setting up the add-on._

1. Clone the repo to your local machine or download it as a zip file and extract it:
   ```sh
   git clone https://github.com/margottig/driveContext_add-on.git
   ```
2. Install NPM packages, initialize the project:
   ```sh
   npm install
   ```
3. Deploy the add-on. Authorize clasp to manage the add-on scripts.
   ```sh
   npx @google/clasp login
   ```
4. Create a new project:
   ```sh
   npx @google/clasp create --type standalone --title "<name_of_new_project>"
   ```
5. Push the code:
   ```sh
   npx @google/clasp push -f -w
   ```  
6. Open the project:
   ```sh
   npx @google/clasp open
   ``` 
   1. Once inside the Apps Script editor, select **Deploy> Test deployments...** to open the *Deployments* dialog.
   2. Click **Install add-on** to install the currently saved version of the add-on in development-mode. 
7. Run the add-on
    1. Go to your drive workspace.
    2. The add-on should place a contextual card on the right-side of the window, with a message asking for authorization. Click the **Authorize access** link to open a dialog where you can authorize the add-on.
    3. Select the account that should authorize the add-on.
    4. Read the dialog, then click **Allow**.
    5. Once authorized, the add-on should automatically refresh and start operating.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

Additional screenshots, and demos will be added soon.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply [open an issue](https://github.com/margottig/driveContext_add-on/issues) with the tag "enhancement".

Don't forget to give the project a star! Thanks again!

<!-- LICENSE -->
## License

Distributed under the [Apache 2 License](https://github.com/margottig/driveContext_add-on/blob/main/LICENSE) 

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
<!-- ## Contact -->


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
_For more examples, please refer to:_
* [Add-ons Documentation](https://developers.google.com/workspace/add-ons/overview)
<!-- 
* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Pages](https://pages.github.com) -->

<p align="right">(<a href="#top">back to top</a>)</p>