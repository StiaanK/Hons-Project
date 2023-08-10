const path = require('path')
const {contextBridge, ipcRenderer} = require('electron')
const sqlite3 = require('sqlite3').verbose();

contextBridge.exposeInMainWorld('htmlChange',{
    goToAssets: () => ipcRenderer.invoke('goToAssets','goToAssets'),
    goToUsers: ()=> ipcRenderer.invoke('goToUsers','goToUsers'),
    goToAddAssets: ()=> ipcRenderer.invoke('goToAddAssets','goToAddAssets'), 
    goToEditAssets: () => ipcRenderer.invoke('goToEditAssets','goToEditAssets'),
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

//used to send messageboxes
contextBridge.exposeInMainWorld('message',{
    show: (message) =>{
        ipcRenderer.send('showMessageBox', message);
    }
})