function getCurrentDate(){
     var today = new Date();
     var dd = String(today.getDate()).padStart(2, '0');
     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
     var yyyy = today.getFullYear();
     today = dd + '.' + mm + '.' + yyyy;
     return today;
}
class HTMLElement{
    htmlsetup;
    arrayOfObj;
    constructor(htpstp,arr){
        this.arrayOfObj = arr;
        this.htmlsetup = htpstp;
    }
}
class BooksPage extends HTMLElement{
    constructor(htpstp,arr){
        super(htpstp,arr);
    }
    editForm = `
    <div class="message">
<form action="submit">
<h2 class="form-title">Edit Book:</h2>
<div class="field">
<div class="label-field">
     <label for="ID">ID:</label>
</div>
     <input type="text" id="ID">
</div>
<div class="field">
<div class="label-field">
     <label for="Title">Title:</label>
</div>
     <input type="text" id="Title">
</div>
<div class="field">
<div class="label-field">
     <label for="Author">Author Name:</label>
</div>
     <input type="text" id="Author">
</div>
<div class="field">
<div class="label-field">
     <label for="yop">Year of publication:</label>
</div>
     <input type="text" id="yop">
</div>
<div class="field">
<div class="label-field">
     <label for="publisher">Publisher:</label>
</div>
     <input type="text" id="publisher">
</div>
<div class="field">
<div class="label-field">
     <label for="pages">Pages:</label>
</div>
     <input type="text" id="pages">
</div>
<div class="field">
<div class="label-field">
     <label for="Copies">Copies:</label>
</div>
     <input type="text" id="Copies">
</div>
<input id="sub" value="Save" type="submit">
</form>
</div>
    `
    addBook(id,title,auth,yop,pub,pgs,cps){
        this.arrayOfObj.push(new Book(id,title,auth,yop,pub,pgs,cps));
    }
    getTitleById(id){
     for(let i = 0;i<this.arrayOfObj.length;i++){
          console.log(this.arrayOfObj[i])
          if(this.arrayOfObj[i].id == id){
               console.log(this.arrayOfObj[i].title);
               return this.arrayOfObj[i].title;
          }
      }
    }
    removeBook(id){
        for(let i = 0;i<this.arrayOfObj.length;i++){
            if(this.arrayOfObj[i].id == id){
                this.arrayOfObj.splice(i,1);
                break;
            }
        }
        $('.books-page').trigger('click');
    }
    editBook(id){
        this.arrayOfObj.forEach(book=>{
            console.log('works');
            if(book.id == id){
                $.fancybox.open(this.editForm);
                $('form #ID').val(book.id);
                $('form #Title').val(book.title);
                $('form #Author').val(book.authorName);
                $('form #yop').val(book.YOP);
                $('form #publisher').val(book.publisherName);
                $('form #pages').val(book.pageNum);
                $('form #Copies').val(book.copies);
                $('.message > form').on('submit',function(e){
                     e.preventDefault();
                    book.id = $('form #ID').val();
                    book.title = $('form #Title').val();
                    book.authorName = $('form #Author').val();
                    book.YOP = $('form #yop').val();
                    book.publisherName = $('form #publisher').val();
                    book.pageNum = $('form #pages').val();
                    book.copies = $('form #Copies').val();
                     $.fancybox.close();           
                     $('.books-page').trigger('click');
                   })
            }
        })
    }
   drawTable(){
       console.log('it worked');
        let main = '';
         this.arrayOfObj.forEach(book=>{
            let tr = `
                 <tr>
                      <td>${book.id}</td>
                      <td>${book.title}</td>
                      <td>${book.authorName}</td>
                      <td>${book.YOP}</td>
                      <td>${book.publisherName}</td>
                      <td>${book.pageNum}</td>
                      <td>${book.copies}</td>
                      <td class="edit">&#9998;</td>
                      <td class="delete">&#10007;</td>
                 </tr>
            `
            main+=tr;        

       })
       
       $('#booksTable tbody').html(main);
    
    }
    validateForm(){
     let idInput = document.querySelector('form #ID');
     let titleInput = document.querySelector('form #Title');
     let authInput = document.querySelector('form #Author');
     let yopInput = document.querySelector('form #yop');
     let pubInput = document.querySelector('form #publisher');
     let pgsInput = document.querySelector('form #pages');
     let cpsInput = document.querySelector('form #Copies');
     if(idInput.value){
          if(isNaN(idInput.value)){
               if(idInput.previousElementSibling.querySelector('span'))
               idInput.previousElementSibling.querySelector('span').remove();
               idInput.previousElementSibling.insertAdjacentElement('beforeend',getError('Id must be a number'));
               return false;
          }else{
               if((+idInput.value)<0){
                    if(idInput.previousElementSibling.querySelector('span'))
                    idInput.previousElementSibling.querySelector('span').remove();
                    idInput.previousElementSibling.insertAdjacentElement('beforeend',getError('Id must be > 0'));
                    return false;
               }
          }
     }else{
          console.log(idInput.previousElementSibling,idInput.previousSibling);
          if(idInput.previousElementSibling.querySelector('span'))
          idInput.previousElementSibling.querySelector('span').remove();
          idInput.previousElementSibling.insertAdjacentElement('beforeend',getError('Fields cannot be empty'));
          return false;
     }
     if(idInput.previousElementSibling.querySelector('span'))
               idInput.previousElementSibling.querySelector('span').remove();
     if(!titleInput.value){
          console.log(idInput.previousElementSibling,idInput.previousSibling);
          if(titleInput.previousElementSibling.querySelector('span'))
          titleInput.previousElementSibling.querySelector('span').remove();
          titleInput.previousElementSibling.insertAdjacentElement('beforeend',getError('Fields cannot be empty'));
          return false;
     }
     if(titleInput.previousElementSibling.querySelector('span'))
     titleInput.previousElementSibling.querySelector('span').remove();
     if(!authInput.value){
          console.log(idInput.previousElementSibling,idInput.previousSibling);
          if(authInput.previousElementSibling.querySelector('span'))
          authInput.previousElementSibling.querySelector('span').remove();
          authInput.previousElementSibling.insertAdjacentElement('beforeend',getError('Fields cannot be empty'));
          return false;
     }
     if(authInput.previousElementSibling.querySelector('span'))
     authInput.previousElementSibling.querySelector('span').remove();
     if(yopInput.value){
          if(isNaN(yopInput.value)){
               if(yopInput.previousElementSibling.querySelector('span'))
               yopInput.previousElementSibling.querySelector('span').remove();
               yopInput.previousElementSibling.insertAdjacentElement('beforeend',getError('Id must be a number'));
               return false;
          }else{
               if((+yopInput.value)<0){
                    if(yopInput.previousElementSibling.querySelector('span'))
                    yopInput.previousElementSibling.querySelector('span').remove();
                    yopInput.previousElementSibling.insertAdjacentElement('beforeend',getError('Id must be > 0'));
                    return false;
               }
          }
     }else{
          console.log(idInput.previousElementSibling,idInput.previousSibling);
          if(yopInput.previousElementSibling.querySelector('span'))
          yopInput.previousElementSibling.querySelector('span').remove();
          yopInput.previousElementSibling.insertAdjacentElement('beforeend',getError('Fields cannot be empty'));
          return false;
     }
     if(yopInput.previousElementSibling.querySelector('span'))
               yopInput.previousElementSibling.querySelector('span').remove();
               if(!pubInput.value){
                    console.log(idInput.previousElementSibling,idInput.previousSibling);
                    if(pubInput.previousElementSibling.querySelector('span'))
                    pubInput.previousElementSibling.querySelector('span').remove();
                    pubInput.previousElementSibling.insertAdjacentElement('beforeend',getError('Fields cannot be empty'));
                    return false;
               }
               if(pubInput.previousElementSibling.querySelector('span'))
               pubInput.previousElementSibling.querySelector('span').remove();
               if(pgsInput.value){
                    if(isNaN(pgsInput.value)){
                         if(pgsInput.previousElementSibling.querySelector('span'))
                         pgsInput.previousElementSibling.querySelector('span').remove();
                         pgsInput.previousElementSibling.insertAdjacentElement('beforeend',getError('Id must be a number'));
                         return false;
                    }else{
                         if((+pgsInput.value)<0){
                              if(pgsInput.previousElementSibling.querySelector('span'))
                              pgsInput.previousElementSibling.querySelector('span').remove();
                              pgsInput.previousElementSibling.insertAdjacentElement('beforeend',getError('Id must be > 0'));
                              return false;
                         }
                    }
               }else{
                    console.log(idInput.previousElementSibling,idInput.previousSibling);
                    if(pgsInput.previousElementSibling.querySelector('span'))
                    pgsInput.previousElementSibling.querySelector('span').remove();
                    pgsInput.previousElementSibling.insertAdjacentElement('beforeend',getError('Fields cannot be empty'));
                    return false;
               }
               if(pgsInput.previousElementSibling.querySelector('span'))
                         pgsInput.previousElementSibling.querySelector('span').remove();
               
                         if(cpsInput.value){
                              if(isNaN(cpsInput.value)){
                                   if(cpsInput.previousElementSibling.querySelector('span'))
                                   cpsInput.previousElementSibling.querySelector('span').remove();
                                   cpsInput.previousElementSibling.insertAdjacentElement('beforeend',getError('Id must be a number'));
                                   return false;
                              }else{
                                   if((+cpsInput.value)<0){
                                        if(cpsInput.previousElementSibling.querySelector('span'))
                                        cpsInput.previousElementSibling.querySelector('span').remove();
                                        cpsInput.previousElementSibling.insertAdjacentElement('beforeend',getError('Id must be > 0'));
                                        return false;
                                   }
                              }
                         }else{
                              console.log(idInput.previousElementSibling,idInput.previousSibling);
                              if(cpsInput.previousElementSibling.querySelector('span'))
                              cpsInput.previousElementSibling.querySelector('span').remove();
                              cpsInput.previousElementSibling.insertAdjacentElement('beforeend',getError('Fields cannot be empty'));
                              return false;
                         }
                         if(cpsInput.previousElementSibling.querySelector('span'))
                                   cpsInput.previousElementSibling.querySelector('span').remove();

     return true;
    }
   saveToStorage(){
        localStorage.setItem('bk',JSON.stringify(this));
   }
   loadFromStorage(){
        let obj = JSON.parse(localStorage.getItem('bk'));
        if(obj){
        this.htmlsetup = obj.htmlsetup;
        this.arrayOfObj = obj.arrayOfObj;
        }
   }
}

//let srchId = 
function getError(message){
     let span = document.createElement('SPAN');
     span.style.color = 'red';
     span.innerHTML = message;
     return span;
}
class VisitorsPage extends HTMLElement{
    constructor(htpstp,arr){
        super(htpstp,arr);
    }
    editForm = `
    <div class="message">
<form action="submit">
<h2 class="form-title">Edit Visitor:</h2>
<div class="field">
<div class="label-field">
     <label for="ID">ID:</label>
</div>
     <input type="text" id="ID">
</div>
<div class="field">
<div class="label-field">
     <label for="Name">Name:</label>
</div>
     <input type="text" id="Name">
</div>
<div class="field">
<div class="label-field">
     <label for="Phone">Phone:</label>
</div>
     <input type="text" id="Phone">
</div>
<input id="sub" value="Add" type="submit">
</form>
</div>
    `
    addVisitor(id,name,phone){
        this.arrayOfObj.push(new Visitor(id,name,phone));
    }
    editVisitor(id){
        this.arrayOfObj.forEach(visitor=>{
            console.log('works');
            if(visitor.id == id){
                $.fancybox.open(this.editForm);
                $('form #ID').val(visitor.id);
                $('form #Name').val(visitor.name);
                $('form #Phone').val(visitor.phone);
                $('.message > form').on('submit',function(e){
                    e.preventDefault();
                   visitor.id = $('form #ID').val();
                   visitor.name = $('form #Name').val();
                   visitor.phone = $('form #Phone').val();
                    $.fancybox.close();           
                    $('.visitors-page').trigger('click');
                  })
            }
        })
    }
    getNameById(id){
     for(let i = 0;i<this.arrayOfObj.length;i++){
          console.log(this.arrayOfObj[i])
          if(this.arrayOfObj[i].id == id){
               return this.arrayOfObj[i].name;
          }
      }
    }
    validateForm(){
     let idInput = document.querySelector('form #ID');
     let nameInput = document.querySelector('form #Name');
     let phoneInput = document.querySelector('form #Phone');
     if(idInput.value){
          if(isNaN(idInput.value)){
               if(idInput.previousElementSibling.querySelector('span'))
               idInput.previousElementSibling.querySelector('span').remove();
               idInput.previousElementSibling.insertAdjacentElement('beforeend',getError('Id must be a number'));
               return false;
          }else{
               if((+idInput.value)<0){
                    if(idInput.previousElementSibling.querySelector('span'))
                    idInput.previousElementSibling.querySelector('span').remove();
                    idInput.previousElementSibling.insertAdjacentElement('beforeend',getError('Id must be > 0'));
                    return false;
               }
          }
     }else{
          console.log(idInput.previousElementSibling,idInput.previousSibling);
          if(idInput.previousElementSibling.querySelector('span'))
          idInput.previousElementSibling.querySelector('span').remove();
          idInput.previousElementSibling.insertAdjacentElement('beforeend',getError('Fields cannot be empty'));
          return false;
     }
     if(idInput.previousElementSibling.querySelector('span'))
               idInput.previousElementSibling.querySelector('span').remove();
     
               if(!nameInput.value){
                    console.log(idInput.previousElementSibling,idInput.previousSibling);
                    if(nameInput.previousElementSibling.querySelector('span'))
                    nameInput.previousElementSibling.querySelector('span').remove();
                    nameInput.previousElementSibling.insertAdjacentElement('beforeend',getError('Fields cannot be empty'));
                    return false;
               }
               if(nameInput.previousElementSibling.querySelector('span'))
               nameInput.previousElementSibling.querySelector('span').remove();
          
               
               if(!phoneInput.value){
                    console.log(idInput.previousElementSibling,idInput.previousSibling);
                    if(phoneInput.previousElementSibling.querySelector('span'))
                    phoneInput.previousElementSibling.querySelector('span').remove();
                    phoneInput.previousElementSibling.insertAdjacentElement('beforeend',getError('Fields cannot be empty'));
                    return false;
               }
               if(phoneInput.previousElementSibling.querySelector('span'))
               phoneInput.previousElementSibling.querySelector('span').remove();
     

     return true;

    }
    drawTable(){
        let main = '';
        this.arrayOfObj.forEach(visitor=>{
            let tr = `
                 <tr>
                      <td>${visitor.id}</td>
                      <td>${visitor.name}</td>
                      <td>${visitor.phone}</td>
                      <td class="edit">&#9998;</td>
                 </tr>
            `
            main+=tr;
       })
       
         $('#visitorsTable tbody').html(main);
    }
    saveToStorage(){
     localStorage.setItem('vs',JSON.stringify(this));
}
loadFromStorage(){
     let obj = JSON.parse(localStorage.getItem('vs'));
     console.log(obj);
     if(obj){
          this.htmlsetup = obj.htmlsetup;
          this.arrayOfObj = obj.arrayOfObj;
          }
}
}

class CardsPage extends HTMLElement{
     VsPage;
     BksPage;
     constructor(htpstp,arr,VPage,BPage){
          super(htpstp,arr);
          this.VsPage = VPage;
          this.BksPage = BPage;
     }
     addCard(vsId,bkId){
          console.log(this.arrayOfObj,vsId,bkId);
          this.BksPage.arrayOfObj.forEach(bk=>{
               if(bk.id == bkId){
                    bk.copies = `${(+bk.copies - 1)}`;
               }
          })
          this.BksPage.saveToStorage();
          this.arrayOfObj.push((new Card(vsId,bkId,getCurrentDate(),'<i class="fas fa-undo-alt"></i>')));
     }
     getCardAddForm(){
          let toR =`
          <div class="message">
               <form action="submit">
               <h2 class="form-title">New Card:</h2>
               <div class="field">
               <div class="label-field">
               <label>
               Visitor:
               </label>
               </div>
               <select id="VisitorList">
          `
          this.VsPage.arrayOfObj.forEach(vs=>{
               toR +=`
               <option value="${vs.id}">${vs.name}</option>
               `
          })
          toR += `</select></div>`
          toR += `
          <div class="field">
          <div class="label-field">
          <label>
          Book:
          </label>
          </div>
          <select id="BookList">`
          this.BksPage.arrayOfObj.forEach(bk=>{
               toR += `
               <option value="${bk.id}">${bk.title}</option> 
               `
          })
          toR += `</select></div>`
          toR+=`<input id="sub" value="Add" type="submit">
          </form>
          </div>`;
          return toR;
     }
     drawTable(){
          let main = '';
          console.log(this.VsPage.getNameById("1"));
          this.arrayOfObj.forEach(card=>{
               console.log(this.VsPage,card);
              let tr = `
                   <tr>
                        <td>${this.arrayOfObj.indexOf(card)+1}</td>
                        <td>${this.VsPage.getNameById(card.VisitorId)}</td>
                        <td>${this.BksPage.getTitleById(card.BookId)}</td>
                        <td>${card.BorrowDate}</td>
                        <td data-key="${card.BookId}"class="return">${card.ReturnDate}</td>
                   </tr>
              `
              main+=tr;
         })
         
           $('#cardsTable tbody').html(main);

          }
     saveToStorage(){
     localStorage.setItem('crd',JSON.stringify(this));
     }
     loadFromStorage(){
          console.log('загрузка...')
          let obj = JSON.parse(localStorage.getItem('crd'));
          console.log(obj);
          if(obj){
               this.htmlsetup = obj.htmlsetup;
               this.arrayOfObj = obj.arrayOfObj;
               }
     }
}

