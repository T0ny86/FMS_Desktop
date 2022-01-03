const {app, BrowserWindow, Menu, MenuItem ,ipcMain , dialog} = require('electron')
const path = require("path");

//==============
let mainWindow;

//==============
const mainMenuTemplate =
[
  {
    label:'Add New',
    click(){
    }
  },
  {
    label: '|'
  },
  {
   label:'Settings',
   click(){
   }    
 }
];

//================
function createMainWindow() {
    mainWindow = new BrowserWindow({
     minWidth: 1400,
     minHeight: 800,
     icon: './icon.png',
     webPreferences: {
         nodeIntegration: false,
         contextIsolation:true,
     },
   });
mainWindow.loadFile(
    path.join(__dirname, "src/main/main.html"));
     // build menu form a template:
const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // insert the menu:
Menu.setApplicationMenu(mainMenu);
 
mainWindow.on("closed", ()=>{
       app.quit();
     });
   // Open the DevTools.
    mainWindow.webContents.openDevTools();
 }

 app.whenReady().then(() => {
    createMainWindow();
  app.allowRendererProcessReuse = false;
  // const appIcon = new Tray('./icon.ico')
    app.on("activate", () => {
      // On OS X it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
      }
    });

    const ctxMenu = new Menu();
    ctxMenu.append(new MenuItem({role:'cut'}));
    ctxMenu.append(new MenuItem({role:'copy'}));
    ctxMenu.append(new MenuItem({role:'paste'}));
    mainWindow.webContents.on('context-menu', (e, params)=>{
      ctxMenu.popup(mainWindow, params.x, params.y)
    })
  });
  
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });