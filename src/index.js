const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  dialog,
  screen,
  shell
} = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')
const { exec } = require('child_process');


if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const CHANNEL_NAMES = ["compilerun", "res"]
function getDirectories (srcpath) {

  return fs
    .readdirSync(srcpath)
    .map(file => path.join(srcpath, file))
    .filter(path => fs.statSync(path).isDirectory());
}

function getFilesArray (folderArray) {

  let files = []
  for (var i = 0; i < folderArray.length; i++) {
    files.push([
      folderArray[i],
      fs
        .readdirSync(folderArray[i])
        .map(file => path.join(folderArray[i], file))
        .filter(path => !fs.statSync(path).isDirectory())
    ])
  }
  // console.log(files);
  fileNameCache = files
  return files
}

//IPC
ipcMain.on(CHANNEL_NAMES[0], (e, args) => {
  // exec('F:\Projects\Studysense-master\Studysense-master\src');
  if (args !== null) {
    
    fs.writeFileSync("./src/jim.cpp", args);
    console.log('hello');
    
    
    exec('cd ' + __dirname + ' & g++ -o jim jim.cpp&jim.exe', (err, stdout, stderr) => {
      console.log('here');
      
      console.log(err, stdout, stderr);
      
  if (err) {
      e.sender.send(CHANNEL_NAMES[1], ["Error", err]);

  } else {
     e.sender.send(CHANNEL_NAMES[1], ["Success",`${stdout}`]);
    if(`${stderr}` !== "") {
     e.sender.send(CHANNEL_NAMES[1], ["Error",`${stderr}`]);
    }
    
  }
});
  }

})

const createWindow = () => {
  const _width = screen.getPrimaryDisplay().bounds.width
  const _height = screen.getPrimaryDisplay().bounds.height

  win = new BrowserWindow({
    x: 10,
    y: _height / 2 - 300,
    width: 800,
    height: 600,
    icon: __dirname + '/assets/icons/win/icon.ico',
    frame: true,
    webPreferences: { nodeIntegration: true, webviewTag: true }
  })

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  );
  
  win.on('closed', () => {
    app.quit()
  })

};


app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
