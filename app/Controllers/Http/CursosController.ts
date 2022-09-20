import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CursosService from "App/Services/CursosService";

interface ICursoPayload {
  nome: string;
}

export default class CursosController {
  public cursosService = new CursosService();

  public async showForm(ctx: HttpContextContract) {
    return ctx.view.render('curso/form')
  }

  public async register(ctx:  HttpContextContract) {
    const cursoPayload = ctx.request.all() as ICursoPayload;

    await this.cursosService.salvarCurso(cursoPayload)

    return ctx.response.redirect('/curso/lista')
  }

  public async showCursos(ctx:  HttpContextContract) {
    const cursos = await this.cursosService.listaCursos();

    return ctx.view.render('curso/lista', {cursos})
  }
}
