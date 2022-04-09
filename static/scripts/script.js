const form = document.getElementById('form')

document.addEventListener('DOMContentLoaded', async ()=>{
   const data = await fetch('http://localhost:6062/api/sedes').then(res=> res.json()).catch(err => err)
   console.log(data)
})


form.addEventListener('submit', async (e) => {
    e.preventDefault()
    //Capturo datos desde html
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    //Formo el body
    const data = {email,password} 

    //Hacer la petición para crear una sede
    const result = await fetch('http://localhost:6062/api/sedes/', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => error)

      console.log(result)
})

