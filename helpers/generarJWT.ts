import jwt from 'jsonwebtoken';

export const generarJWT = (uid = '') => {
  return new Promise<any>((resolve, reject) => {
    const payload = {uid};
  jwt.sign(payload,process.env.SECRETORPRIVATEKEY as string,{expiresIn:'4h'}, (err, token) => {
    if (err) {
      console.log(err);
      reject('No se pudo generar el token')
    } else {
      resolve(token);
    }
  })
  })
}

// module.exports={generarJWT}
