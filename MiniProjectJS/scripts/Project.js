/*В index.html
1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули*/

//Index.html
let usersList = document.getElementById('usersList');
let baseUrs = 'http://jsonplaceholder.typicode.com/'
let getUsersUrl = baseUrs + '/users'
let getUserById = (id)=> getUsersUrl + '/' + id
fetch(getUsersUrl)
    .then((response) => response.json())
    .then((users) => {
        for (const user of users) {
            let userList = document.createElement('div');
            let userIdView = document.createElement('div');
            let userName = document.createElement('div');
            let userButton = document.createElement('button');
            userIdView.innerText = `ID: ${user.id}`
            userName.innerText = `Name: ${user.name}`
            userList.classList.add('userlist');
            userButton.innerText = 'Details'
            userButton.addEventListener('click', () =>{
                window.location.href = `user-details.html?id=${user.id}`;
            })
            userList.append(userIdView, userName, userButton);
            usersList.appendChild(userList)
        }
    })



/*На странице user-details.html:
4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
(для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
    6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.


//User-details.html*/
let userDetailsContainer = document.getElementById('userDetails');
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((response) => response.json())
    .then((user) => {
        console.log(user)
        let userInfo = document.createElement('div');
        let userDetails = document.createElement('div');
        let userAddress =  document.createElement('div');
        let userCompany = document.createElement('div');
        let postOfCurrentUser = document.createElement('button');
        let userPosts = document.createElement('div')
        userInfo.classList.add('userInfo')
        userDetails.classList.add('userDetails')
        userAddress.classList.add('userDetails')
        userCompany.classList.add('userDetails')
        userDetails.innerText = `ID: ${user.id}
        Name: ${user.name}
        Phone: ${user.phone}
        Username: ${user.username}
        Website: ${user.website}`
        userAddress.innerText = `Address: City: ${user.address.city} Geo: ${user.address.geo.lat}, ${user.address.geo.lng} Street: ${user.address.street} Suite: ${user.address.suite} Zipcode: ${user.address.zipcode}`
        userCompany.innerText =`Company: bs: ${user.company.bs} catchPhrase: ${user.company.catchPhrase} name: ${user.company.name}`
        postOfCurrentUser.classList.add('PostButton')
        postOfCurrentUser.textContent = 'Post Of Current User';
        let postButtonClicked = false;
        postOfCurrentUser.addEventListener('click',()=>{
            if (!postButtonClicked) {
                postButtonClicked = true;
                fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
                    .then((response) => response.json())
                    .then((posts) => {
                        for (const post of posts) {
                            console.log(post)
                            let userPost = document.createElement('div');
                            let userPostButton = document.createElement('button');
                            let userPostBlock = document.createElement('div');
                            userPostBlock.classList.add('userPostBlock')
                            userPosts.classList.add('userPosts');
                            userPostButton.textContent = 'Post Details'
                            userPostButton.addEventListener('click', () => {
                                window.location.href = `post-details.html?id=${post.id}`
                            });
                            userPost.innerText = `${post.title}`
                            userPostBlock.append(userPost, userPostButton)
                            userPosts.append(userPostBlock);
                        }
                    });
            }
        });
        userInfo.append(userDetails, userAddress, userCompany);
        userDetailsContainer.append(userInfo, postOfCurrentUser, userPosts)
    });


//



/*    На странице post-details.html:
7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)


//post-details.html*/
let postContainer = document.getElementById('postContainer');
const postId = urlParams.get('id');
fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((response) => response.json())
    .then((post) => {
        let postInfo = document.createElement('div');
        postInfo.classList.add('postInfo')
        postInfo.innerText = `ID: ${post.id}
        Title: ${post.title}
        Body: ${post.body}
        User ID: ${post.userId}`
        postContainer.append(postInfo);
    });
let commentsContainer = document.getElementById('commentsContainer');
fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then((response) => response.json())
    .then((comments) => { console.log(comments)
        for (const comment of comments) {
            let commentBox = document.createElement('div');
            commentBox.classList.add('commentBox');
            commentBox.innerText = `ID: ${comment.id}
            email: ${comment.email}
            body: ${comment.body}
            name: ${comment.name}
            Post ID: ${comment.postId}`
            commentsContainer.appendChild(commentBox);
        }
    });


/*Стилизація проєкта -
index.html - всі блоки з user - по 2 в рядок. кнопки/аосилвння розташувати під інформацією про user.
    user-details.html - блок з інфою про user зверху сторінки. Кнопка нижчє, на 90% ширини сторінки, по центру.
    блоки з короткою іфною про post - в ряд по 5 .
    post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.
    Всі елементи котрі характеризують users, posts, comments візуалізувати, так, щоб було видно що це блоки (дати фон. марджини і тд)*/