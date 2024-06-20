async function GetUsers(){
    const UserName = document.getElementById('UserName').value 
    const URL = `https://api.github.com/users/${UserName}`
    
    try{
        const response = await fetch(URL)
        if(!response.ok){
            throw new Error ('Network`s issue: '+response.statusText)
        }
        const user = await response.json();
        // console.log(user)

        let setUserLocal = localStorage.setItem('user', JSON.stringify(user))
        
        let getUserLocal = JSON.parse(localStorage.getItem('user'))
        ShowUsers(getUserLocal)

    } catch(error){
        console.log('There is a problem: ',error)
        document.createElement('result').innerHTML = `
        <p>Network is not responding</p>
        `
    }
    setTimeout(() =>{
        document.getElementById('result').innerHTML=''
        UserName=''
    }, 7000);
}  

function ShowUsers(user){
    document.getElementById('result').innerHTML=`
    <div class="card" style="width: 18rem;">
  <img src="${user.avatar_url}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${user.login}</h5>
    <p class="card-text">${user.bio}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Repositories: ${user.public_repos}</li>
    <li class="list-group-item">Location: ${user.location}</li>
    <li class="list-group-item">Created: ${user.created_at}</li>
  </ul>
  <div class="card-body">
    <a href="https://github.com/${UserName}" class="card-link">Know more</a>

  </div>
</div>
    `
}