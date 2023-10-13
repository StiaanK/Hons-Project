// Import necessary modules
const path = require('path')
const {contextBridge, ipcRenderer} = require('electron');
const { channel } = require('diagnostics_channel');
const sqlite3 = require('sqlite3').verbose();

// Expose functions to the renderer process related to HTML changes
contextBridge.exposeInMainWorld('htmlChange',{
    // Function to navigate to assets
    goToAssets: () => ipcRenderer.invoke('goToAssets','goToAssets'),
    // Function to navigate to users
    goToUsers: ()=> ipcRenderer.invoke('goToUsers','goToUsers'),
    // Function to navigate to add assets
    goToAddAssets: ()=> ipcRenderer.invoke('goToAddAssets','goToAddAssets'), 
    // Function to navigate to edit assets
    goToEditAssets: () => ipcRenderer.invoke('goToEditAssets','goToEditAssets'),
    // Function to navigate to add users
    goToAddUsers: () =>ipcRenderer.invoke('goToAddUsers','goToAddUsers'), 
    // Function to navigate to edit users
    goToEditUsers: () => ipcRenderer.invoke('goToEditUsers','goToEditUsers'),
})

// Expose functions related to SQLite database operations
contextBridge.exposeInMainWorld('sqlite',{
    // Function to execute a query on the database
    queryDB:(query, params, callback) =>{
        const db = new sqlite3.Database(path.join(__dirname,'./test.db'))

        db.all(query,   params, (err,rows)=>{
            db.close();
            if(err){
                return callback([])
            }
            callback(rows)
        })
    },
    
    // Function to delete a row in the database
    deleteRow: (tableName, rowId) => {
        ipcRenderer.send('deleteRow', {tableName, rowId})  
    },
})

// Expose functions to send and receive data for asset operations
contextBridge.exposeInMainWorld('sendAssetData', (data) => {
    ipcRenderer.send('sendAssetData', data);
})
contextBridge.exposeInMainWorld('editAssetData',(data) =>{
    ipcRenderer.send('editAssetData', data);
})

// Expose functions to send and receive data for user operations
contextBridge.exposeInMainWorld('sendUserData', (data) => {
    ipcRenderer.send('sendUserData', data);
})
contextBridge.exposeInMainWorld('editUserData',(data) =>{
    ipcRenderer.send('editUserData', data);
})

// Expose functions to send and receive IDs
contextBridge.exposeInMainWorld('sendId', (data) => {
    ipcRenderer.send('sendId',data)
})
contextBridge.exposeInMainWorld('recieveId', (callback)=>{
    ipcRenderer.on('recieveId', (event, data) =>{
        console.log(data + " preload")
        callback(data)
    })
})

// Expose function to fetch user data
contextBridge.exposeInMainWorld('fetchUserData', ()=>{
    try {
        // Make an asynchronous request to the main process to fetch user data
        const userData = ipcRenderer.invoke('fetchUserData');
        return userData;
      } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
      }
    })

// Expose function to display message boxes
contextBridge.exposeInMainWorld('message',{
    show: (message) =>{
        ipcRenderer.send('showMessageBox', message);
    },
})
