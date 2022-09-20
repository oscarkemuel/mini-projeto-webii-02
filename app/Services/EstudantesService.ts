import { IEstudante } from "App/Controllers/Http/EstudantesController";
import Estudante from "App/Models/Estudante";

interface IEstudantePorCurso {
  nome: string;
}

interface ILinguagem {
  linguagem: string;
  estudantes: IEstudantePorCurso[];
}

interface ICurso {
  curso: string;
  estudantes: IEstudantePorCurso[];
}
interface IEstudantePorCursoResponse {
  cursos: ICurso[];
  total: number;
}

interface IEstudantePorLinguagemResponse {
  linguagens: ILinguagem[];
  total: number;
}

class EstudantesService {
    public async salvarEstudante(estudantePayload: IEstudante):  Promise<IEstudante> {
        const estudante = await Estudante.create({
          primeiroNome: estudantePayload.primeiroNome,
          ultimoNome: estudantePayload.ultimoNome,
          curso: estudantePayload.curso,
          linguagem: estudantePayload.linguagem,
          sistemasOperacionas: estudantePayload.sistemasOperacionas as string,
        })

        return estudante;
    }

    public async getListaEstudante(): Promise<Estudante[]> {
      const estudantes = await Estudante.all();

      return estudantes;
    }

    public async deletaEstudante(id: number): Promise<void> {
      const estudante = await Estudante.findOrFail(id);

      await estudante.delete();
    }

    public async estudantePorId(id: number): Promise<Estudante> {
      const estudante = await Estudante.findOrFail(id);

      return estudante;
    }

    public async estudantesPorCurso(): Promise<IEstudantePorCursoResponse> {
      const estudantes =  await Estudante.all();

      let cursos: ICurso[] = [];

      for (let i = 0; i < estudantes.length; i++) {
        const estudante = estudantes[i];
        const estudanteName = `${estudante.primeiroNome} ${estudante.ultimoNome}`

        const cursoIndex = cursos.findIndex(curso => curso.curso === estudante.curso)


        if(cursoIndex === -1){
          cursos.push({ curso: estudante.curso, estudantes: [{nome: estudanteName}] })
        } else {
          cursos[cursoIndex].estudantes = [...cursos[cursoIndex].estudantes, { nome: estudanteName }]
        }
      }

      return { cursos, total: estudantes.length };
    }

    public async estudantesPorLinguagem(): Promise<IEstudantePorLinguagemResponse> {
      const estudantes =  await Estudante.all();

      let linguagens: ILinguagem[] = [];

      for (let i = 0; i < estudantes.length; i++) {
        const estudante = estudantes[i];
        const estudanteName = `${estudante.primeiroNome} ${estudante.ultimoNome}`

        const linguagemIndex = linguagens.findIndex(linguagem => linguagem.linguagem === estudante.linguagem)


        if(linguagemIndex === -1){
          linguagens.push({ linguagem: estudante.linguagem, estudantes: [{nome: estudanteName}] })
        } else {
          linguagens[linguagemIndex].estudantes = [...linguagens[linguagemIndex].estudantes, { nome: estudanteName }]
        }
      }

      return { linguagens, total: estudantes.length };
    }
}

export default EstudantesService;
