//backend script
const {app, BrowserView, BrowserWindow, ipcMain }= require('electron')
const path = require('path')
const sqlite3 = require('sqlite3').verbose()

let sql;
let tableName;

//connect to db
const db = new sqlite3.Database('./test.db',sqlite3.OPEN_READWRITE,(err)=>{
    if (err) return console.error(err.message)
})


//function to make pop windows
/*function createPopupWindow(){
    const popupWindow = new BrowserWindow({
        title: 'Pop-Up',
        width:  400,
        height: 250,
        webPreferences: {
           preload: path.join(__dirname,'preload.js'),
           nodeIntegration: true
        }
        
    })
    popupWindow.loadFile(path.join(__dirname,'./renderer/addAssets.html'))
} */


//function to make app window
function createMainWindow(){
    //making main window
    const mainWindow = new BrowserWindow({
        title: 'Asset Manager',
        width:  1000,
        height: 500,
        webPreferences: {
           preload: path.join(__dirname,'preload.js'),
           nodeIntegration: true
        }
        
    });
    

    mainWindow.loadFile(path.join(__dirname,'./renderer/index.html'));
    mainWindow.webContents.openDevTools();
    

    //htmlChange
    ipcMain.handle('goToAssets',async(event,goToAssets)=>{
        mainWindow.loadFile(path.join(__dirname,'./renderer/assets.html'));
        console.log("assets")
        tableName="assets"

        
    })

    ipcMain.handle('goToUsers',async(event,goToAssets)=>{
        mainWindow.loadFile(path.join(__dirname,'./renderer/users.html'));
        console.log("users")
        tableName="users"
    })

    ipcMain.handle('goToAddAssets',async(event, goToAddAssets)=>{
        mainWindow.loadFile(path.join(__dirname,'./renderer/addAssets.html'));
        console.log("addAssets")
    })

    // SQL
    /*
    ipcMain.on('addAsset',(name)=>{
        console.log(name)
        
        
        sql = 'INSERT INTO assets(name) VALUES(?)';
        db.run(sql,[String(name)],(err)=>{
            if(err) return console.error(err.message);
        })
        console.log("data inserted into asstes") 
    })
    

    ipcMain.handle('createTable',async(event, createTable)=>{
        sql = 'CREATE TABLE users(id INTEGER PRIMARY KEY, uname, password)';
        db.run(sql)
        console.log("table created")
    })

    ipcMain.handle('dropTable',async(event, dropTable)=>{
        sql = 'DROP table users';
        db.run(sql)
        console.log("table droped")
    })

    ipcMain.handle('insertData',async(event, insertData)=>{
        sql = 'INSERT INTO users(uname,password) VALUES(?,?)';
        db.run(sql,['mike','pass'],(err)=>{
            if(err) return console.error(err.message);
        })
        console.log("data inserted")
    })
    */
}



//running app
app.whenReady().then(()=>{
    createMainWindow()

    app.on('activate',()=>{
        if (BrowserWindow.getAllWindows().length ===0){
            createMainWindow()
        }
    })

})

//closing app on Macs
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit()
    }
})

ipcMain.on('dataFromRenderer', (event, data) => {
    console.log('Data received from renderer:', data);

    const  name  = data;
    const sql = `INSERT INTO assets (name) VALUES (?)`;

    db.run(sql, [name], (err) => {
        if (err) {
            console.error('Error inserting data:', err.message);
            event.reply('insertDataResponse', { success: false, error: err.message });
        } else {
            console.log('Data inserted successfully.');
            event.reply('insertDataResponse', { success: true });
        }
    });
})

/*ipcMain.on('addAsset', async (event, data) => {
    
});*/