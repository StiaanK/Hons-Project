const path = require('path')
const {contextBridge, ipcRenderer} = require('electron');
const { channel } = require('diagnostics_channel');
const sqlite3 = require('sqlite3').verbose();


contextBridge.exposeInMainWorld('htmlChange',{
    goToAssets: () => ipcRenderer.invoke('goToAssets','goToAssets'),
    goToUsers: ()=> ipcRenderer.invoke('goToUsers','goToUsers'),
    goToBookings: () => ipcRenderer.invoke('goToBookings', 'goToBookings'),
    goToAddAssets: ()=> ipcRenderer.invoke('goToAddAssets','goToAddAssets'), 
    goToEditAssets: () => ipcRenderer.invoke('goToEditAssets','goToEditAssets'),
    goToAddUsers: () =>ipcRenderer.invoke('goToAddUsers','goToAddUsers'), 
    goToEditUsers: () => ipcRenderer.invoke('goToEditUsers','goToEditUsers'),
    
})

contextBridge.exposeInMainWorld('sqlite',{
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
    
    deleteRow: (tableName, rowId) => {
        ipcRenderer.send('deleteRow', {tableName, rowId})  
    },

})

//send data to main to add to asset table
contextBridge.exposeInMainWorld('sendAssetData', (data) => {
    ipcRenderer.send('sendAssetData', data);
})

//send data to main to edit an asset record
contextBridge.exposeInMainWorld('editAssetData',(data) =>{
    ipcRenderer.send('editAssetData', data);
})

//send data to main to add to user table
contextBridge.exposeInMainWorld('sendUserData', (data) => {
    ipcRenderer.send('sendUserData', data);
})

//send data to main to edit an user record
contextBridge.exposeInMainWorld('editUserData',(data) =>{
    ipcRenderer.send('editUserData', data);
})

contextBridge.exposeInMainWorld('sendId', (data) => {
    ipcRenderer.send('sendId',data)
})

contextBridge.exposeInMainWorld('recieveId', (callback)=>{
    ipcRenderer.on('recieveId', (event, data) =>{
        console.log(data + " preload")
        callback(data)
    })

})

contextBridge.exposeInMainWorld('popUserDrop', (callback)=>{
    const db = new sqlite3.Database(path.join(__dirname,'./test.db'))
    db.all('SELECT name FROM users', (err,rows)=>{
        if(err){
            console.error(err.message)
            return
        }
        callback(rows)
    })
})

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

//used to display messageboxes
contextBridge.exposeInMainWorld('message',{
    show: (message) =>{
        ipcRenderer.send('showMessageBox', message);
    },
})


