/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
  const sessionid = cookies.get('sessionid');

  const uname = cookies.get('username') || ''
  const passw = cookies.get('password') || ''
  const loggedin = cookies.get('loginToken') !== undefined
  
 
  return {
    username: Buffer.from(uname, 'base64').toString('utf-8'),
    password: Buffer.from(passw, 'base64').toString('utf-8'),
    loggedin: loggedin
  };
}