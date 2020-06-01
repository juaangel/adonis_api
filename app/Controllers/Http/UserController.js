'use strict'
const User = use('App/Models/User')

class UserController {
  async show ({auth, params}) {
    if (auth.user.id !== Number(params.id)) {
      return 'You cannot see someone else\'s profile'
    }

    return auth.user
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
