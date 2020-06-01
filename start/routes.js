'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
| Documentation: http://adonisjs.com/docs/4.1/routing
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  // User login and register authentification
  Route.post('login', 'AuthController.login')
  // User registration
  Route.post('register', 'AuthController.register')
  // Logout
  Route.get('logout', 'AuthController.logout').middleware('auth')
}).prefix('auth');

Route.resource('users', 'UserController').only(['destroy', 'show', 'update'])
  .middleware('auth')
