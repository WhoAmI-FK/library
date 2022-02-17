class Book{
    id;
    title;
    authorName;
    YOP; // Year of Publication
    publisherName;
    pageNum;
    copies;
    constructor(Ident,Title,Author,YearOfP,Publisher,PageN,cps){
        this.id = Ident;
        this.title = Title;
        this.authorName = Author;
        this.YOP = YearOfP;
        this.publisherName = Publisher;
        this.pageNum = PageN;
        this.copies = cps;
    }
}