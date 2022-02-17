class Card{
    VisitorId;
    BookId;
    BorrowDate;
    ReturnDate;
    constructor(VisData,BkData,BDate,RDate=""){
        this.VisitorId = VisData;
        this.BookId = BkData;
        this.BorrowDate = BDate;
        this.ReturnDate = RDate;
        console.log(this.BookId,this.VisitorId)

    }   
}