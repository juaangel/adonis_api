'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
| Documentation: http://adonisjs.com/docs/4.1/routing
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('', () => "I'm an API :)")

Route.group(() => {
  // User login and register authentification
  Route.post('login', 'AuthController.login')
  // User registration
  Route.post('signup', 'AuthController.signUp')
  // Logout
  Route.get('logout', 'AuthController.logout').middleware('auth')

  Route.get('users', 'UserController.index')
  Route.get('users/:searchFactor', 'UserController.show')

  Route.resource('users', 'UserController')
    .only(['destroy', 'update']).middleware('auth')
}).prefix('api');
