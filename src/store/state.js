let username = 'admin'
let token = 'GRETWETEWRTWERTWERTERWERT'
try {
  if (localStorage.username) {
    username = localStorage.username
  }
  if (localStorage.token) {
    token = localStorage.token
  }
} catch (e) {
  console.log(e)
}

export default {
  username,
  token
}
