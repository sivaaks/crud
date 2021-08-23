//class work 20-08-2021

const url='https://611f266e9771bf001785c74c.mockapi.io/users';

getUsers(url);

async function getUsers(url){

    clearBody();
    const data= await fetch(url);
    const users= await data.json();
    users.forEach(user=>{
        listUsers(user);
    })
}

function listUsers({name,createdAt,avatar,id}){

    let userDetails= {
        name:name,
        createdAt:createdAt,
        avatar:avatar,
        id:id,
    }
    const date= new Date(createdAt).toLocaleString();
   const infoSection=document.querySelector('.user-list');
    const info = document.createElement('div');
    info.setAttribute('class','container');
      
      info.innerHTML=`
      <div class="flag-container">
      <img class="flag" src=${avatar} width="75px" height="75px" />
 </div>
 
 <div class="details">
   <h3>${name}</h3>
   <p>${date}</p>
   <button class="button" onclick=deleteUser(${id})>Delete</button>
   <button class="button" onclick=updateUser(${id})>Edit</button>
 </div>
</div>`

      infoSection.append(info);
      document.body.append(infoSection);

}

function clearBody(){
    const infoSection=document.querySelector('.user-list').innerHTML=``;
}

async function updateUser(id){
    console.log(id);
    let editName= prompt('Enter the name');
    let editImage= prompt('Enter image url');
    const time= new Date().toISOString();
    console.log(editName,editImage);
    const user={};
    if(editName !='') user['name']= editName;
    if(editImage !='') user['avatar']=editImage;
    user['createdAt']= time;
    user['id']= id;

    console.log(user);

    if(user['name']!=null || user['avatar'] !=null) {
    const data= await fetch(`${url}/${id}`,
    {
        method:'PUT',
        body:JSON.stringify(user),
        headers:{
            'Content-type':'application/json'
        }
    }
    );
   if(data.status=='200') {
    alert('User updated successfully')
    getUsers(url);
   }
}

}

async function addUser(){
    let name= document.querySelector('#name').value;
    let image= document.querySelector('#image').value;
    const time= new Date().toISOString();
    const user= {
        createdAt:time,
        name:name,
        avatar:image,
    }
    console.log(user);

    try {
    const data= await fetch(`${url}`,
    {
        method:'POST',
        body:JSON.stringify(user),
        headers:{
            'Content-type':'application/json'
        }
    }
    );
    if (data.status=='201'){
        alert('User created successfully');
        getUsers(url);
        } 
    }
    catch(msg) {
        alert(msg);
    }
    
}

async function deleteUser(id){
    console.log(`${url}/${id}`);
    const data= await fetch(`${url}/${id}`,{method:'DELETE'});
    const users= await data.json();
    getUsers(url);
}

