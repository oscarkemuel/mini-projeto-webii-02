// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CursosService from 'App/Services/CursosService';
import EstudantesService from 'App/Services/EstudantesService'


export interface IEstudante {
    primeiroNome: string;
    ultimoNome: string;
    curso: string;
    linguagem: string;
    sistemasOperacionas: string | string[];
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

        const hasManySystems = Array.isArray(estudantePayload.sistemasOperacionas);
        if(!hasManySystems) estudantePayload.sistemasOperacionas = [`${estudantePayload.sistemasOperacionas}`]

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

      estudante.sistemasOperacionas = (estudante.sistemasOperacionas as string).split(',')

      return view.render('estudante/detalhesEstudante', { estudante })
    }

    public async deleteEstudante({ request, response}:  HttpContextContract) {
      const id = request.param('id');

      await this.estudantesService.deletaEstudante(id)

      return response.redirect('/estudante/getListaEstudantes')
    }

    public async showEstudantesPorCurso({ view }: HttpContextContract) {
      const cursos = await this.estudantesService.estudantesPorCurso();

      return view.render('estudante/estudantesPorCurso', { cursos });
    }

    public async showEstudantesPorLinguagem({ view }: HttpContextContract) {
      const linguagens = await this.estudantesService.estudantesPorLinguagem();

      return view.render('estudante/estudantesPorLinguagem', { linguagens });
    }
}
