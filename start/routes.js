'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () =>  'Hello world in JSON')

// User login and register authentification
Route.post('/auth/login', 'AuthController.login')
// User registration
Route.post('/auth/register', 'AuthController.register')
// Logout
Route.get('/auth/logout', 'AuthController.logout').middleware('auth')

// Check user info if it's logged
Route.get('users/:id', 'UserController.show').middleware('auth')
// User delete
Route.delete('users/:id', 'UserController.delete').middleware('auth')
// User update
Route.patch('users/:id', 'UserController.update').middleware('auth')
