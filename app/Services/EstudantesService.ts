import { IEstudante } from "App/Controllers/Http/EstudantesController";
import Estudante from "App/Models/Estudante";
class EstudantesService {
    public async salvarEstudante(estudantePayload: IEstudante):  Promise<IEstudante> {
        const estudante = await Estudante.create({
          nome: estudantePayload.nome,
          cursoId: estudantePayload.cursoId,
        })

        await estudante.load('curso')

        return estudante;
    }

    public async getListaEstudante(): Promise<Estudante[]> {
      const estudantes = await Estudante.all();

      await Promise.all(estudantes.map(async estudante => {
        await estudante.load('curso')
      }))

      return estudantes;
    }

    public async deletaEstudante(id: number): Promise<void> {
      const estudante = await Estudante.findOrFail(id);

      await estudante.delete();
    }

    public async estudantePorId(id: number): Promise<Estudante> {
      const estudante = await Estudante.findOrFail(id);

      await estudante.load('curso');

      return estudante;
    }
}

export default EstudantesService;
