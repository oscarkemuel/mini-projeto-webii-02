import { IAvatarPayload } from "App/Controllers/Http/AvatarsController";
import Avatar from "App/Models/Avatar";

class AvatarService {
  public async salvarAvatar(avatarPayload: IAvatarPayload):  Promise<IAvatarPayload> {
      console.log(avatarPayload)

      const avatar = await Avatar.create({
        nomeFantasia: avatarPayload.nomeFantasia,
        estudanteId: avatarPayload.estudanteId,
      })

      return avatar;
  }

  public async getListaAvatar(): Promise<Avatar[]> {
    const avatar = await Avatar.all()

    await Promise.all(avatar.map(async (avatar) => {
      await avatar.load('estudante')
      await avatar.estudante.load('curso')
    }))

    return avatar;
  }
}

export default AvatarService;
