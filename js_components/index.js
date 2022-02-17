const booksForm =`
<div class="message">
<form action="submit">
<h2 class="form-title">New Book:</h2>
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
<input id="sub" value="Add" type="submit">
</form>
</div>
`
const visitorForm = `
<div class="message">
<form action="submit">
<h2 class="form-title">New Visitor:</h2>
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
$(document).ready(function () {
   
    let bkpg = new BooksPage(`<div class="functional">
<h3>
    all books:
</h3>
<button id="add">New book</button>
</div>
<form>
<div class="sorting">
    <label for="Sort">Sort by:</label>
    <select id="Sort">
        <option value="ID">ID</option>

    </select>
    <button>Sort</button>
</div>
<div class="searching">
    <label for="Search">Search:</label>
    <input type="text" id="Search">
    <button>Search</button>
</div>
</form>
<table id="booksTable">
<thead>
    <tr>
        <td>ID</td>
        <td>Title</td>
        <td>Author</td>
        <td>Published</td>
        <td>Publisher</td>
        <td>Pages Amount</td>
        <td>Copies</td>
        <td>Edit</td>
        <td>Delete</td>
    </tr>
</thead>
<tbody>

</tbody>
</table>`,[]);
bkpg.loadFromStorage();
let vistpg = new VisitorsPage(`<div class="functional">
<h3>
    all visitors:
</h3>
<button id="add">New visitor</button>
</div>
<form>
<div class="sorting">
    <label for="Sort">Sort by:</label>
    <select id="Sort">
        <option value="ID">ID</option>
    </select>
    <button>Sort</button>
</div>
<div class="searching">
    <label for="Search">Search:</label>
    <input type="text" id="Search">
    <button>Search</button>
</div>
</form>
<table id="visitorsTable">
<thead>
    <tr>
        <td>ID</td>
        <td>Name</td>
        <td>Phone</td>
        <td>Edit</td>
    </tr>
</thead>
<tbody>

</tbody>
</table>`,[]);
vistpg.loadFromStorage();
let crdPage = new CardsPage(`<div class="functional">
<h3>
    all cards:
</h3>
<button id="add">New card</button>
</div>
<form>
<div class="sorting">
    <label for="Sort">Sort by:</label>
    <select id="Sort">
        <option value="ID">Return Date</option>
    </select>
    <button>Sort</button>
</div>
<div class="searching">
    <label for="Search">Search:</label>
    <input type="text" id="Search">
    <button>Search</button>
</div>
</form>
<table id="cardsTable">
<thead>
    <tr>
        <td>ID</td>
        <td>Visitor</td>
        <td>Book</td>
        <td>Borrow Date</td>
        <td>Return Date</td>
    </tr>
</thead>
<tbody>

</tbody>
</table>`,[],vistpg,bkpg);
crdPage.loadFromStorage();


console.log(bkpg);
 $('nav > ul > li').on('click',function(){
     if($(this).html() == 'Books'){
        $('nav > ul > li').each(function(){
            $(this).css('border-bottom','none');
        })
        $(this).css('border-bottom','3px #009595 solid');
        $('.interface-display').html(bkpg.htmlsetup);
        bkpg.drawTable();
        document.querySelectorAll('.edit').forEach(edit=>{
          edit.addEventListener('click',e=>{
             let id = edit.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
               bkpg.editBook(id);
                bkpg.saveToStorage()
           })
      })
      document.querySelectorAll('.delete').forEach(del=>{
           del.addEventListener('click',e=>{
               let id = del.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
               bkpg.removeBook(id);
               bkpg.saveToStorage()
           })
      })
        $('#add').on('click',function(){
            $.fancybox.open(booksForm);
            $('.message > form').on('submit',function(e){
                 e.preventDefault();

                 if(bkpg.validateForm()){
                 let id = $('form #ID').val();
                 let title = $('form #Title').val();
                 let auth = $('form #Author').val();
                 let yop = $('form #yop').val();
                 let pub = $('form #publisher').val();
                 let pgs = $('form #pages').val();
                 let cps = $('form #Copies').val();
                 console.log(id,title,auth,yop,pub,pgs,cps);
                 bkpg.addBook(id,title,auth,yop,pub,pgs,cps);
                 bkpg.saveToStorage();
                 $.fancybox.close();  
                 }
                 bkpg.drawTable();
                 document.querySelectorAll('.edit').forEach(edit=>{
                    edit.addEventListener('click',e=>{
                       let id = edit.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
                         bkpg.editBook(id);
                         bkpg.saveToStorage();
                    })
              

                })
                document.querySelectorAll('.delete').forEach(del=>{
                    del.addEventListener('click',e=>{
                        let id = del.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
                        bkpg.removeBook(id);
                        bkpg.saveToStorage();

                    })

               })
                               
        })
        })
     }
    if($(this).html() == 'Visitors'){
     $('nav > ul > li').each(function(){
          $(this).css('border-bottom','none');
      })
      $(this).css('border-bottom','3px #009595 solid');
      $('.interface-display').html(vistpg.htmlsetup);
      vistpg.drawTable();
      document.querySelectorAll('.edit').forEach(edit=>{
          edit.addEventListener('click',e=>{
             let id = edit.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
               vistpg.editVisitor(id);
               vistpg.saveToStorage();
           })
           vistpg.saveToStorage();

      })
      $('#add').on('click',function(){
          $.fancybox.open(visitorForm);
          $('.message > form').on('submit',function(e){
               e.preventDefault();
               if(vistpg.validateForm()){
               let id = $('form #ID').val();
               let name = $('form #Name').val();
               let phone = $('form #Phone').val();
               vistpg.addVisitor(id,name,phone);
               vistpg.saveToStorage();
               vistpg.drawTable();
               $.fancybox.close();
               }           
               document.querySelectorAll('.edit').forEach(edit=>{
                    edit.addEventListener('click',e=>{
                         let id = edit.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
                         vistpg.editVisitor(id);
                         vistpg.saveToStorage();
                     })
                     vistpg.saveToStorage();

                })
             })
      });
   
    }
    if($(this).html() == 'Cards'){
     $('nav > ul > li').each(function(){
          $(this).css('border-bottom','none');
      })
      $(this).css('border-bottom','3px #009595 solid');
      $('.interface-display').html(crdPage.htmlsetup);
      crdPage.drawTable();
      $('.return').on('click',function(){
        let idOfReturned = `${$(this).data('key')}`;
        $(this).html(getCurrentDate());
        crdPage.BksPage.arrayOfObj.forEach(bk=>{
             if(idOfReturned == bk.id){
                  bk.copies = `${(+bk.copies + 1)}`;
                  crdPage.BksPage.saveToStorage();
                  crdPage.arrayOfObj.forEach(card=>{
                      if(card.BookId == bk.id){
                          card.ReturnDate = getCurrentDate();
                      }
                  })
                  crdPage.saveToStorage();
                }
        })
     })
      $('#add').on('click',function(){
          $.fancybox.open(crdPage.getCardAddForm());
          $('.message > form').on('submit',function(e){
               e.preventDefault();
               let visId = $('form #VisitorList').val();
               console.log(visId);
               let bkId = $('form #BookList').val();
               crdPage.addCard(visId,bkId);
               crdPage.saveToStorage();
               console.log(crdPage);
               crdPage.drawTable();
               $('.return').on('click',function(){
                let idOfReturned = `${$(this).data('key')}`;
                $(this).html(getCurrentDate());
                crdPage.BksPage.arrayOfObj.forEach(bk=>{
                     if(idOfReturned == bk.id){
                          bk.copies = `${(+bk.copies + 1)}`;
                          crdPage.BksPage.saveToStorage();
                          crdPage.arrayOfObj.forEach(card=>{
                              if(card.BookId == bk.id){
                                  card.ReturnDate = getCurrentDate();
                              }
                          })
                     crdPage.saveToStorage();
                        }
                })
             })
               $.fancybox.close();
          })
      })
    }
 })
 $('.books-page').trigger('click');
})