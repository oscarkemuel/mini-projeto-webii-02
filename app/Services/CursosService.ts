import Curso from "App/Models/Curso";

interface ICursoPayload {
  nome: string;
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
}

export default CursosService;
