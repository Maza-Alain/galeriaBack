import bcrypt from "bcryptjs";

export const userData = (email:string, password:string) => {
    return new Promise<boolean>((resolve) => {
        const emailsValidos: string[] = ['jmazarosano@gmail.com'];
        const passwordValido: string = '$2a$10$qlS53dQS1rSynvaRC4AnROqduKJ0wdxd7kUpEB7zAjjRRxQ2uOsla';
        // const passwordsValidos: string[] = ['admin_ray123@!'];
        resolve(emailsValidos.includes(email) && bcrypt.compareSync(password, passwordValido) ? true : false);
    })
}
