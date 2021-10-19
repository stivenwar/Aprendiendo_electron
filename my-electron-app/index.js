const {app,BrowserWindow} = require('electron');

function createWindow(){
    const win = new BrowserWindow({
        width:800,
        height:600
    })

    win.loadFile('index.html');
}
app.whenReady().then(()=>{
    app.on('activate',function (){
        if (BrowserWindow.getAllWindows().length===0){
            createWindow();
        }
    })


})
