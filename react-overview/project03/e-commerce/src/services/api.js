const API = 'https://fakestoreapi.com/products'


export const Login = ({ email, password }) => {
  const data = localStorage.getItem('users')
  const users = data ? JSON.parse(data) : []

  const isUserExist = users.find(
    user => user.email === email && user.password === password
  )

  if (isUserExist) {
    console.log("Login successfully ✅")
    return isUserExist   // return user to component
  } else {
    console.log("Email or password is wrong ❌")
    return null
  }
}


export const Logout = () => {
  console.log('Logout successfully ✅')
  return null
}


export const Create = ({ name, email, password }) => {
  const data = localStorage.getItem('users')
  const users = data ? JSON.parse(data) : []

  const isUserExist = users.find(user => user.email === email)

  if (isUserExist) {
    console.log("User already exists ❌")
    return null
  }

  const newUser = { name, email, password }
  users.push(newUser)

  localStorage.setItem('users', JSON.stringify(users))

  console.log("User created successfully ✅")
  return newUser
}

export const getAllProducts = async () => {
  try {
    const response = await fetch(API)
    const data = await response.json()
    return data
  } catch (error) {
    console.log("Products not fetched ❌", error)
  }
}


export const getProductDetail = async (id) => {
  try {
    const response = await fetch(`${API}/${id}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log('Product detail not fetched ❌', error)
  }
}