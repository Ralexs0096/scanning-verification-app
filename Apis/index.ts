import { fetchBase } from './fetch';

export const fetchUserById = async (id: string) => {
  try {
    const response = await fetchBase({
      endpoint: `user/${id}`,
      method: 'GET'
    });
    const data = (await response.json()) as Array<UserByIdResponse>;

    return data[0];
  } catch (error) {
    console.log(error);
  }
};

export const verifyCodesByArea = async (area: string, userCodes: string[]) => {
  try {
    const response = await fetchBase({
      endpoint: `verification`,
      method: 'POST',
      data: {
        area,
        userCodes
      }
    });

    return (await response.json()) as Array<VerifyCodesByAreaResponse>;
  } catch (error) {
    console.log(error);
  }
};
