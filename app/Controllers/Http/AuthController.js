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

    return response.json({ message: 'You first need to register!' })
  }

  async logout() {
    await auth.logout()
  }

  async register({ request, auth, response }) {
    const data = request.only(['username', 'email', 'password'])

    // looking for user in database
    const userExists = await User.findBy('username', data.username)

    // if user doesn't exist, it'll be saved in DB
    if (userExists) return 'The user already exists'

    const user = await User.create(data)
    let token = await auth.generate(user)

    Object.assign(user, token)

    return response.json(user)
  }
}

module.exports = AuthController
