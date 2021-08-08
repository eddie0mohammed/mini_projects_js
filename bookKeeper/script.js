
const modal = document.getElementById('modal');
const addBookmarkBtn = document.getElementById('show-modal');
const modalCloseBtn = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');


let bookmarks = [];


function init(){
    const bookmarkFromStorage = localStorage.getItem('bookmarks');
    console.log(bookmarkFromStorage);
    if (bookmarkFromStorage){
        bookmarks = JSON.parse(bookmarkFromStorage);
    } else {
        bookmarks = [{
            name: 'Jacinto Design',
            url: 'https://jacinto.design',
        }]
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    buildBookmarks();
}

// show modal + focus on input
function showModal(){
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

function closeModal(){
    modal.classList.remove('show-modal');
    websiteUrlEl.value = '';
    websiteNameEl.value = '';
}

function validateInputs(name, url){
    if (name.length === 0) return false;

    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return regex.test(url);
}

function storeBookmark(e){
    e.preventDefault();
    const nameValue = websiteNameEl.value.trim();
    let urlValue = websiteUrlEl.value.trim();
    
    if (!urlValue.includes('http') || !urlValue.includes('https')){
        urlValue = `https://${urlValue}`;
    }

    const validate = validateInputs(nameValue, urlValue);
    if (!validate) {
        alert('Invalid Inputs');
    } else {
        const bookmark = {
            name: nameValue,
            url: urlValue,
        }
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        init();
        closeModal();
    }

}

function buildBookmarks (){
    bookmarksContainer.textContent = '';
    bookmarks.forEach((bookmark) => {
        buildBookmark(bookmark);
    })
}

function deleteBookmark(url){
    const index = bookmarks.findIndex((bookmark) => {
        return bookmark.url === url;
    })
    console.log(index);

    if (index !== -1){
        bookmarks.splice(index, 1);
        console.log(bookmarks);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        init();
    }
}

function buildBookmark(bookmark){
    const { name, url } = bookmark;
    const item = document.createElement('div');
    item.classList.add('item');
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-times');
    closeIcon.setAttribute('title', 'Delete bookmark');
    closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    const favicon = document.createElement('img');
    favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
    favicon.setAttribute('alt', 'Favicon');
    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', '_blank');
    link.textContent = name;
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
}


// event listener
addBookmarkBtn.addEventListener('click', showModal);
modalCloseBtn.addEventListener('click', closeModal);
bookmarkForm.addEventListener('submit', storeBookmark);



init();