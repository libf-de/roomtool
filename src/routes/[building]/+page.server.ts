import type { Cookies } from '@sveltejs/kit';
import { OperationCanceledException } from 'typescript';
import { build } from 'vite';
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({params, cookies}) => {
  const resu = await fetchPlan(params.building, cookies);
  console.log(resu);
    return {
      data: resu,
      building: params.building
    };
  }

async function fetchPlan(building: String, cookies: import('@sveltejs/kit').Cookies): Promise<JSON> {
  const logToken = (cookies.get('loginToken') || '');

  const opts = {
    headers: {
        cookie: 'loginToken=' + logToken
    }
  };

  const res = await fetch(`https://navigator.tu-dresden.de/api/search/freerooms/${building}`, opts)
  if(res.status != 200) {
    //TODO: Try re-login
    if(await tryLogin(cookies)) return fetchPlan(building, cookies);
    return new Promise((resolve, reject) => { resolve(JSON.parse('{"error": "login failed :("}'))});
  }
  const rsp = await res.json();
  const weekDays = rsp.week;
  const dateTodayDate = new Date();
  const dateToday = dateTodayDate.getFullYear() + "-" + String(dateTodayDate.getMonth()+1).padStart(2, '0') + "-" + dateTodayDate.getDate();
  const today = weekDays.find((el: { date: string; }) => el.date === dateToday);
  return new Promise((resolve, reject) => {resolve(today);});
}

async function tryLogin(cookies: Cookies): Promise<boolean> {
  const user = cookies.get('username')
  const pass = cookies.get('password')
  if(user == undefined || pass == undefined) return new Promise((resolve, reject) => {resolve(false);});
  const authResponse = await fetch('https://navigator.tu-dresden.de/api/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/vnd.tud.navigator.v1+json;charset=UTF-8',
        },
        body: JSON.stringify({
            "username": user,
            "password": pass,
            "university": 1,
            "from": ""
        })
    });
  if(authResponse.status == 200) {
    const ajson = await authResponse.json();
    try {
    cookies.set('loginToken', ajson.loginToken, {
      path: '/',
      httpOnly: false,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
    });
    return new Promise((resolve, reject) => {resolve(true);});
  } catch(err) {
    return new Promise((resolve, reject) => {resolve(false);});
  }
  }
  return new Promise((resolve, reject) => {resolve(false);});
}