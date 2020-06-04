'use strict'
const User = use('App/Models/User')

class UserController {
  async index () {
    return User.all()
  }

  async show ({params}) {
    const searchFactor = params.searchFactor
    let user

    if (isNaN(searchFactor)) // Search by username
      user = await User.findBy('username', searchFactor)
    else // Search by Id
      user = await User.find(searchFactor)

    if (user) return user
  }

  async destroy ({params}) {
    const user = await User.find(Number(params.id))
    await user.delete()
  }

  async update ({auth, request, params}) {
    if (auth.user.id !== Number(params.id)) {
      return 'Forbidden'
    }

    const user = await User.find(Number(params.id))

    user.merge(request.only(['username', 'email', 'password']))

    await user.save()
  }
}

module.exports = UserController
