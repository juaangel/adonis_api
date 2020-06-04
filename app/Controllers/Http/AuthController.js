'use strict'
const User = use('App/Models/User')

class AuthController {
  async login({ request, auth, response }) {
    const { email, password } = request.all()

    if (await auth.attempt(email, password)) {
      let user = await User.findBy('email', email)
      let token = await auth.generate(user)

      Object.assign(user, token)
      return response.json(user)
    }
  }

  async logout() {
    await auth.logout()
  }

  async signUp({ request, auth, response }) {
    const data = request.only(['username', 'email', 'password'])

    // looking for user in database
    let userExists = await User.findBy('username', data.username)

    // if user doesn't exist, it'll be saved in DB
    if (userExists) {
      return { msg: 'username exists' }
    }

    // looking for email in database
    userExists = await User.findBy('email', data.email)
    if (userExists) {
      return { msg: 'email taken' }
    }

    const user = await User.create(data)
    let token = await auth.generate(user)

    Object.assign(user, token)

    return response.json(user)
  }
}

module.exports = AuthController
