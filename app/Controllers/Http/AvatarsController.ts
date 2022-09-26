import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AvatarService from 'App/Services/AvatarService';
import EstudantesService from 'App/Services/EstudantesService';

export interface IAvatarPayload {
  nomeFantasia: string;
  estudanteId: number;
}

export default class AvatarsController {
  public avatarService = new AvatarService()
  public estudantesService = new EstudantesService()

  public async showForm(ctx: HttpContextContract) {
    const estudantes = await this.estudantesService.getListaEstudante()

    return ctx.view.render('avatar/form_avatar', {estudantes})
  }

  public async register(ctx:  HttpContextContract) {
    const avatarPayload = ctx.request.all() as IAvatarPayload;

    await this.avatarService.salvarAvatar(avatarPayload)

    return ctx.response.redirect('lista');
  }

  public async lista(ctx: HttpContextContract) {
    const avatars = await this.avatarService.getListaAvatar()

    return ctx.view.render('avatar/lista', {avatars})
  }
}
