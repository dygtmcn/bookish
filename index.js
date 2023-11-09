import { bookpostsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.addEventListener('click', function (e) {
    if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    }
    else if(e.target.dataset.rebookpost){
        handleRebookpostClick(e.target.dataset.rebookpost)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'bookpost-btn'){

        handleBookpostBtnClick()
    }
})

function handleLikeClick(bookpostId) {
    const targetBookpostObj = bookpostsData.filter(function (bookpost) {
        return bookpost.uuid === bookpostId
    })[0]
    if (targetBookpostObj.isLiked) {
        targetBookpostObj.likes--
    }
    else (
        targetBookpostObj.likes++
    )
    targetBookpostObj.isLiked = !targetBookpostObj.isLiked
    render()
}

function handleRebookpostClick(bookpostId) {
    const targetBookpostObj = bookpostsData.filter(function (bookpost) {
        return bookpost.uuid === bookpostId
    })[0]
    if (targetBookpostObj.isRebookposted) {
        targetBookpostObj.rebookposts--
    }
    else {
        targetBookpostObj.rebookposts++
    }
    targetBookpostObj.isRebookposted = !targetBookpostObj.isRebookposted
    render()
}

function handleReplyClick(replyId) {
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleBookpostBtnClick() {
    const bookpostInput = document.getElementById('bookpost-input')
    if (bookpostInput.value){
        bookpostsData.unshift(
            {
                handle: `@Duygu`,
                profilePic: `images/girl.jpeg`,
                likes: 0,
                rebookposts: 0,
                bookpostText: bookpostInput.value,
                replies: [],
                isLiked: false,
                isRebookposted: false,
                uuid: uuidv4(),
            }) 
            render()
            bookpostInput.value =''
        }
}

function getFeedHtml() {
    let feedHtml = ''

    bookpostsData.forEach(function (bookpost) {
        let likeIconClass = ''

        if (bookpost.isLiked) {
            likeIconClass = 'liked'
        }

        let rebookpostIconClass = ''

        if (bookpost.isRebookposted) {
            rebookpostIconClass = 'rebookposted'
        }

        let repliesHtml = ''

        if (bookpost.replies.length > 0) {
            bookpost.replies.forEach(function(reply){
            repliesHtml += `
            <div class="bookpost-reply">
                <div class="bookpost-inner">
                    <img src="${reply.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${reply.handle}</p>
                        <p class="bookpost-text">${reply.bookpostText}</p>
                    </div>
                </div>
            </div>    `
        })
    }

        feedHtml += `
        <div class="bookpost">
            <div class="bookpost-inner">
                <img src="${bookpost.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${bookpost.handle}</p>
                    <p class="bookpost-text">${bookpost.bookpostText}</p>
                    <div class="bookpost-details">
                        <span class="bookpost-detail">
                            <i class="fa-regular fa-comment-dots" 
                            data-reply=${bookpost.uuid}
                            ></i>
                            ${bookpost.replies.length}
                        </span>
                        <span class="bookpost-detail">
                            <i class="fa-solid fa-heart ${likeIconClass}" 
                            data-like=${bookpost.uuid}
                            ></i>
                            ${bookpost.likes}
                        </span>
                        <span class="bookpost-detail">
                           <i class="fa-solid fa-retweet ${rebookpostIconClass}" 
                           data-rebookpost=${bookpost.uuid}
                           ></i>
                            ${bookpost.rebookposts}
                        </span>
                    </div>   
                </div>            
            </div>
            <div class="hidden" id="replies-${bookpost.uuid}">
                ${repliesHtml}
            </div>
        </div>
         `
    })

    return feedHtml
}

function render() {
   document.getElementById('feed').innerHTML = getFeedHtml()
}

render()