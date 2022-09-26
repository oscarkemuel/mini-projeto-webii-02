import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('estudante', 'EstudantesController.showForm')
Route.post('estudante/register', 'EstudantesController.register')
Route.get('estudante/getListaEstudantes', 'EstudantesController.showEstudantes')
Route.get('estudante/detalhes/:id', 'EstudantesController.showDetalhes')
Route.get('estudante/deletar/:id', 'EstudantesController.deleteEstudante')

Route.get('curso/form', 'CursosController.showForm')
Route.post('curso/register', 'CursosController.register')
Route.get('curso/lista', 'CursosController.showCursos')
Route.get('curso/remover/:id', 'CursosController.removeCurso')
Route.get('curso/editar/:id', 'CursosController.showEditForm')
Route.post('curso/editar/:id', 'CursosController.editCurso')

Route.get('avatar/registerAvatar', 'AvatarsController.showForm')
Route.post('avatar/register', 'AvatarsController.register')
Route.get('avatar/lista', 'AvatarsController.lista')
