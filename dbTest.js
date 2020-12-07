const reso ="2195"
let arr = reso.split('')

     for(let i=0; i < arr.length; i++){
       if(arr[i]===','){
       
       var removed =arr.splice(i,1)
       console.log(arr)
       }}

       let noComma = arr.join('');
       console.log(noComma)
       

     
