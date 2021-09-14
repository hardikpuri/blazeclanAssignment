const fs = require('fs');
const path =require('path');
const targetPath =path.join(__dirname,'./../views');
console.log('target:'+targetPath);
fs.readdir(targetPath,(err,files)=>{
    if (err) {
        return;
      }
      
      files.forEach((file,i)=>{
          fs.stat(`${targetPath}/${file}`, (err, stat) => {
            if (err) {
              console.log(`Some Error ${err.message}`);
              return;
            }
            if(stat.isFile()) {
                console.log(file);
            }
            if(stat.isDirectory()){
                console.log(`dir: ${targetPath}\\${file}`);
               fs.readdir(`${targetPath}\\${file}`,(er,f)=>{
                if(er){
                    return;
                }
                f.forEach((fi,index)=>{
                    console.log(fi);
                })
               });
            }
          });
      });
});