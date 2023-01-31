const ulElement = document.querySelector('.posts');
const postTemplateElement = document.getElementById('single-post');
const [addButtonElement, fetchPostsButtonElement] = document.getElementsByTagName('button');
const titleInputElement = document.getElementById('title');
const contentInputElement = document.getElementById('content');
const formElement = document.getElementsByTagName('form')[0];


// const sendHttpRequest = (method, url, body) => {

//   // const promise = new Promise((resolve, reject) => {

//   //   // const xhr = new XMLHttpRequest();
  
//   //   // xhr.open(method, url);    
  
//   //   // xhr.responseType = 'json';

//   //   // xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

//   //   // xhr.addEventListener('load', function(){
//   //   //   debugger;
//   //   //   if (xhr.status >= 200 && xhr.status < 300) {
//   //   //     resolve(xhr.response);
//   //   //   } else {
//   //   //     // I just throw an error with a message because the API sends empty responses {}
//   //   //     reject(new Error('something went wrong'));
//   //   //   }
//   //   // });

//   //   // xhr.addEventListener('error', function(){
//   //   //   debugger;
//   //   //   reject(new Error('failed to send request!'));
//   //   // })

//   //   // xhr.send(JSON.stringify(body)); // it's ok to send undefined
//   // });

//   // return promise;


//   const options = {
//     method,
//     // headers: {
//     //   'Content-Type': 'application/json; charset=UTF-8'
//     // },
//     // body: JSON.stringify(body) 
//     body
//   }

//   let hasErrorBeenThrown = false;

//   return fetch(url, options)
//   .then(res => {
//     // I can still access the save Response object
//     if (res.status >= 200 && res.status < 300){
//       return res.json(); // returns the response body in JS format
//     } else {
//       return res.json()
//         .then(data => {
//           console.log(data);// I wanna console log the res body! ✅
//           hasErrorBeenThrown = true;
//           throw new Error('oops, there was an error server side, status not in the 200 range');
//         })
//     }
//   })  
//   .catch(error => {
//     if (hasErrorBeenThrown){
//       throw error; // just forward the error
//     } else {
//       debugger;
//       console.log(error)
//       throw new Error('oops, the request didnt leave the browser'); // throw a new Error
//     }
//   })
// }





const fetchPosts = async () => {
  try {
    // postsJSON is a readable stream
    const {data: posts} = await axios.get('https://jsonplaceholder.typicode.com/posts');
    debugger;
    const tenPosts = posts.slice(0,10);
    tenPosts.forEach(post => {
      const postNode = document.importNode(postTemplateElement.content, true);
      postNode.querySelector('h2').innerText = post.title;
      postNode.querySelector('p').innerText = post.body;
      postNode.querySelector('li').id = post.id;
      // postNode.querySelector('button').addEventListener('click', deletePost.bind(null, post.id));
      ulElement.append(postNode);
    });
  } catch (error){
    debugger;
    console.log(error.message);
  }
}

const createPost = async (title, content) => {
  const userId = Math.round(Math.random()*100);
  // const post = {
  //   title,
  //   body: content,
  //   userId
  // }
  // debugger;
  const post = new FormData(formElement);
  post.append('userId', userId);

  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', post);
    console.log('post created with this data: ', response);
  } catch (error) {
    console.log(error.message);
  }

}

const deletePost = async (id) => {
  try {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  } catch(error){
    console.log(error.message);
  }
}


addButtonElement.addEventListener('click', function(event){
  event.preventDefault();
  const title = titleInputElement.value.trim();
  const content = contentInputElement.value.trim();

  if (title && content){
    createPost(title, content);
  } else {
    alert('title and content can not be empty');
  }
});


fetchPostsButtonElement.addEventListener('click', fetchPosts);

ulElement.addEventListener('click', function(event){
  const target = event.target;
  if (target.tagName !== 'BUTTON'){
    return;
  }
  const id = target.parentNode.id;
  deletePost(id);
})











