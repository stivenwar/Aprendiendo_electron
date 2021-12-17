const {app,BrowserWindow} = require('electron');


// esto debe colocarse en la parte superior de main.js para manejar los eventos de configuración rápidamente
if (handleSquirrelEvent(app)) {
    // evento de squirrel manejado y la aplicación se cerrará en 1000 ms, así que no hagas nada más
    return;
}


function createWindow(){
    const win = new BrowserWindow({
        width:800,
        height:600
    })

    win.loadFile('index.html');

}

app.whenReady().then(() => {
    createWindow();

})
function handleSquirrelEvent(application) {
    if (process.argv.length === 1) {
        return false;
    }

    const ChildProcess = require('child_process');
    const path = require('path');

    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawn = function(command, args) {
        let spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, {
                detached: true
            });
        } catch (error) {}

        return spawnedProcess;
    };

    const spawnUpdate = function(args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            // Opcionalmente, haga cosas como:
            // - Agregue su .exe a la RUTA
            // - Escriba en el registro para cosas como asociaciones de archivos y
            //   menús contextuales del explorador

            // Instalar accesos directos del menú de inicio y del escritorio
            spawnUpdate(['--createShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-uninstall':
            // Deshace tdo lo que hiciste en el --squirrel-install y
            // --squirrel-updated handlers

            // Eliminar los accesos directos del escritorio y del menú de inicio
            spawnUpdate(['--removeShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-obsolete':
            // Esto se llama en la versión saliente de su aplicación antes
            // Actualizamos a la nueva versión - es lo contrario de
            // --update squirrel

            application.quit();
            return true;
    }
};
// app.whenReady().then(()=>{
//     app.on('activate',function (){
//         if (BrowserWindow.getAllWindows().length===0){
//             createWindow();
//         }
//     })
//
//
// })
// Module to control application life. (this variable should already exist)

