type AreasResponse = {
  areaId: string;
  name: string;
};

type UserByIdResponse = {
  nombre_completo: string;
  cedula_id: string;
};

type VerifyCodesByAreaResponse = {
  code: string;
  belongsToThisArea: boolean;
};
