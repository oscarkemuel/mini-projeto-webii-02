import Curso from "App/Models/Curso";

interface ICursoPayload {
  nome: string;
  descricao: string;
}

class CursosService {
  public async salvarCurso(payload: ICursoPayload) {
    const curso = await Curso.create(payload)

    return curso;
  }

  public async listaCursos() {
    const cursos = await Curso.all();

    return cursos;
  }

  public async removeCurso(id: number) {
    const curso = await Curso.findOrFail(id);

    await curso.delete()
  }

  public async buscaCurso(id: number) {
    const curso = await Curso.findOrFail(id);

    return curso;
  }

  public async editCurso(id: number, payload: ICursoPayload) {
    const curso = await Curso.findOrFail(id);

    curso.nome = payload.nome;
    curso.descricao = payload.descricao;

    await curso.save();
  }
}

export default CursosService;
