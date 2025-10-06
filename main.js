//Enable your user to enter the author's name and get book information

// listen for click, call the api
//get author's names from user

//got assistance from Karim. He also helped me debug the code


document.querySelector('button').addEventListener('click', getBook)
//show book info in the DOM
function getBook() {
    const author = document.querySelector('#authorsel').value;
   
    console.log(author);
    //console.log(encodeURIComponent(author);
     // stop if user didn’t select anything
    if (!author) {
        alert('Please select an author!')
        return
    }

    const url = 'https://www.googleapis.com/books/v1/volumes?q=inauthor:' + encodeURIComponent(author)//allowing the browser to read spaces in its way the user is gonna include

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.items, data.items.length);

            if (!data.items || data.items.length === 0) {
                document.querySelector('h2').innerText = 'No results';
                document.querySelector('title').innerText = ''
                return;
            }
            document.querySelector('h2').innerText = 'Untitled';
            const volumeInfo = data.items[0].volumeInfo;
            const title1 = data.items[0].volumeInfo.title;
           

            if (volumeInfo && title1) {
                document.querySelector('h2').innerText = title1;
            }

            const description=data.items[0].volumeInfo.description;
            if(volumeInfo && description){
                document.querySelector('.description').innerText = description;
            }

            //check if pdf is available
            let pdfAv = false;
            let pdfLink = '';
            const accessInfo = data.items[0].accessInfo;
            console.log('accesInfo ', accessInfo)
            if (accessInfo) {
              
                if (data.items[0].accessInfo.pdf) {
                    if (data.items[0].accessInfo.pdf.isAvailable) {
                        pdfAv = true;
                        if (data.items[0].accessInfo.webReaderLink) {
                            pdfLink = data.items[0].accessInfo.webReaderLink;
                        }
                    }
                }
            }
            console.log(pdfLink)
            if(!pdfAv && volumeInfo && volumeInfo.infoLink){
              pdfLink = volumeInfo.infoLink;
            }

            if(pdfAv && pdfLink){
               document.querySelector('.title').innerHTML = 'PDF is available <a href="' +pdfLink+ '">here</a>'; 
            } else{
               document.querySelector('.title').innerText = 'PDF is not available'

            }
        })
        

        .catch(err => {
           console.log(`error ${err}`);
           document.querySelector('h2').innerText = 'Something went wrong.'

        })

}