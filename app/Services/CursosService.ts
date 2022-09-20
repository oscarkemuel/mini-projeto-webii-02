import Curso from "App/Models/Curso";

interface ICursoPayload {
  nome: string;
}

class CursosService {
  public async salvarCurso(payload: ICursoPayload) {
    const curso = await Curso.create({nome: payload.nome})

    return curso;
  }

  public async listaCursos() {
    const cursos = await Curso.all();

    return cursos;
  }
}

export default CursosService;
