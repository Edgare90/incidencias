export interface Usuario {
    id_usuario: string;
    usuario: string;
    email: string;
    perfil: string;
    estatus: string;
    id_departamento: string;
    nombre_departamento: string;
    id_perfil: string,
    nombre_perfil: string,
}

export interface Departamentos{
    id_departamento: string;
    departamento: string;
}

export interface perfiles{
    id_perfil: string,
    perfil: string,
    estatus:string
}
