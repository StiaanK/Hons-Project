//backend script
const { rejects } = require('assert');
const {app, BrowserView, BrowserWindow, ipcMain, dialog }= require('electron')
const path = require('path')
const sqlite3 = require('sqlite3').verbose()

let sql;

//connecting to database
const db = new sqlite3.Database('./test.db',sqlite3.OPEN_READWRITE,(err)=>{
    if (err) return console.error(err.message)
})



// Function to create the main window of the Electron app
function createMainWindow(){
    //making main window
    const mainWindow = new BrowserWindow({
        title: 'Asset Manager',
        width:  1920,
        height: 1080,
        webPreferences: {
           preload: path.join(__dirname,'preload.js'),
           nodeIntegration: true
        }
        
    });
    
    // Load the main HTML file into the main window
    mainWindow.loadFile(path.join(__dirname,'./renderer/index.html'));
    //mainWindow.webContents.openDevTools();  //uncomment to assist with development
    
    // IPC listener to show a message box when called, receives a message when called
    ipcMain.on('showMessageBox', (event, message) =>{
        dialog.showMessageBox(mainWindow, {
            type: 'info',
            title: 'Info',
            message: message,
            buttons: ['OK']
        })
    })
    
    //IPC handlers for changing HTML views based on user actions
    //htmlChange for Assets pages
    // Main asset Page 
    ipcMain.handle('goToAssets',async(event,goToAssets)=>{
        mainWindow.loadFile(path.join(__dirname,'./renderer/assets.html'));
        console.log("assets")
        tableName="assets"
    })

    // Add asset page
    ipcMain.handle('goToAddAssets',async(event, goToAddAssets)=>{
        mainWindow.loadFile(path.join(__dirname,'./renderer/addAssets.html'));
        console.log("addAssets")
    })

    // Edit asset page
    ipcMain.handle('goToEditAssets',async(event,goToEditAssets)=>{
        mainWindow.loadFile(path.join(__dirname,'./renderer/editAssets.html'));
        console.log("editAssets")
    })

    //htmlChange for Users pages
    // Main Users page
    ipcMain.handle('goToUsers',async(event,goToUsers)=>{
        mainWindow.loadFile(path.join(__dirname,'./renderer/users.html'));
        console.log("users")
        tableName="users"
    })

    // Add Users page 
    ipcMain.handle('goToAddUsers',async(event, goToAddUsers)=>{
        mainWindow.loadFile(path.join(__dirname,'./renderer/addUsers.html'));
        console.log("addUsers")
    })

    // Edit Users page
    ipcMain.handle('goToEditUsers',async(event,goToEditUsers)=>{
        mainWindow.loadFile(path.join(__dirname,'./renderer/editUsers.html'));
        console.log("editUsers")
    })
}


//Function to run the app
app.whenReady().then(()=>{
    createMainWindow()

    // Activate the app when no windows are open
    app.on('activate',()=>{
        if (BrowserWindow.getAllWindows().length ===0){
            createMainWindow()
        }
    })

})

//Close the app on Macs
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit()
    }
})

// IPC listner to add data to the assets table in the database, when called
ipcMain.on('sendAssetData', (event, data) => {
    console.log('Data received from renderer:', data);

    // assigning data to variables
    const  name  = data.name;
    const sn = data.sn
    const userId = data.userId
    const dateAdded = data.dateAdded
    
    // Use a parameterized query to prevent SQL injection
    const sql = `INSERT INTO assets (name, sn, userId, dateAdded) VALUES (?,?,?,?)`;

    // Running the parameterized SQL statement
    db.run(sql, [name,sn, userId, dateAdded], (err) => {
        if (err) {
            console.error('Error inserting data:', err.message);
            event.reply('insertDataResponse', { success: false, error: err.message });
        } else {
            console.log('Data inserted successfully.');
            event.reply('insertDataResponse', { success: true });
        }
    });
})

// Add data to users table
ipcMain.on('sendUserData', (event, data) => {
    console.log('Data received from renderer:', data);

    // assigning data to variables
    const name = data.name;
    const un = data.un;

    // Use a parameterized query to prevent SQL injection
    const sql = 'INSERT INTO users (name, un) VALUES (?, ?)';

    // Running the parameterized SQL statement
    db.run(sql, [name, un], (err) => {
        if (err) {
            console.error('Error inserting data:', err.message);
            event.reply('insertDataResponse', { success: false, error: err.message });
        } else {
            console.log('Data inserted successfully.');
            event.reply('insertDataResponse', { success: true });
        }
    });
});


//delete a row
ipcMain.on('deleteRow', (event, { tableName, rowId }) => {
    // Construct SQL statement with a parameter placeholder for id
    const sql = 'DELETE FROM ' + tableName + ' WHERE id = ?';

    // Use a parameterized query to prevent SQL injection
    db.run(sql, [rowId], (err) => {
        if (err) {
            // Handle errors during deletion
            console.error(err.message);
            event.sender.send('deleteRowResponse', { success: false, error: err.message });
        } else {
            // Log successful deletion
            console.log('Row is deleted from ' + tableName);
            event.sender.send('deleteRowResponse', { success: true });
        }
    });
});

  

// Recieving rowId from renderer when a record is selected, used for editing
let rowId
ipcMain.on('sendId', (event, data) => {
    rowId = data
    console.log("rowId set to : "+rowId)
})


//edit asset data 
ipcMain.on('editAssetData', (event, data) => {
    console.log('Data received from renderer:', data);

    // Extracting data from the input
    const { name, sn, userId, dateAdded} = data;

    if (!rowId) {
        console.error("Row ID is missing");
        return;
    }

    // Initialize the SQL statement and parameters array
    let sql = "UPDATE assets SET ";
    const params = [];

    if (name !== '') {
        sql += "name = ?, ";
        params.push(name);
    }

    if (sn !== '') {
        sql += "sn = ?, ";
        params.push(sn);
    }

    if (userId !== '') {
        sql += "userId = ?, ";
        params.push(userId);
    }

    if (dateAdded !== '') {
        sql += "dateAdded = ?, ";
        params.push(dateAdded);
    }

    // Remove the trailing comma and space
    sql = sql.slice(0, -2);

    // Add the WHERE clause with parameter placeholder for rowId
    sql += ` WHERE id = ?`;
    params.push(rowId);

    // Use a parameterized query to prevent SQL injection
    db.run(sql, params, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Asset Row is edited");
        }
    });

    // Reset rowId to null
    rowId = null;
});

//edit user data 
ipcMain.on('editUserData', (event, data) => {
    console.log('Data received from renderer:', data);

    const { name, un} = data;

    if (!rowId) {
        console.error("Row ID is missing");
        return;
    }

    let sql = "UPDATE users SET ";

    // Initialize an array to hold the parameters
    const params = [];

    if (name !== '') {
        sql += "name = ?, ";
        params.push(name);  // Add name to the parameters array
    }

    if (un !== '') {
        sql += "un = ?, ";
        params.push(un);  // Add un to the parameters array
    }

    // Remove the trailing comma and space
    sql = sql.slice(0, -2);

    // Add the WHERE clause with a parameter placeholder for rowId
    sql += " WHERE id = ?";
    params.push(rowId);  // Add rowId to the parameters array

    // Use a parameterized query to prevent SQL injection
    db.run(sql, params, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("User Row is edited");
        rowId = null;
    });
});
