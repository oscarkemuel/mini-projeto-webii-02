import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CursosService from 'App/Services/CursosService';
import EstudantesService from 'App/Services/EstudantesService'


export interface IEstudante {
    nome: string;
    cursoId: number;
}

export default class EstudantesController {
    public estudantesService = new EstudantesService()
    public cursosService = new CursosService()

    public async showForm(ctx: HttpContextContract) {
        const cursos = await this.cursosService.listaCursos();

        return ctx.view.render('estudante/form_estudante', { cursos })
    }

    public async register(ctx:  HttpContextContract) {
        const estudantePayload = ctx.request.all() as IEstudante;

        const estudante = await this.estudantesService.salvarEstudante(estudantePayload)

        return ctx.view.render('estudante/paginaEstudante', { estudante });
    }

    public async showEstudantes({ view }: HttpContextContract) {
        const estudantes = await this.estudantesService.getListaEstudante()

        return view.render('estudante/listaEstudantes', { estudantes })
    }

    public async showDetalhes({ view, request }:  HttpContextContract) {
      const id = request.param('id');
      const estudante = await this.estudantesService.estudantePorId(id) as IEstudante;

      return view.render('estudante/detalhesEstudante', { estudante })
    }

    public async deleteEstudante({ request, response}:  HttpContextContract) {
      const id = request.param('id');

      await this.estudantesService.deletaEstudante(id)

      return response.redirect('/estudante/getListaEstudantes')
    }
}
