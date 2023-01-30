import { fail, redirect } from '@sveltejs/kit'

import type { Action, Actions, PageServerLoad } from './$types'

const login: Action = async ({ cookies, request }) => {
    const data = await request.formData();
    console.log(data);
    const username = data.get('username')
    const password = data.get('password')
    const savePassword = data.has('savePassword')

    if (
        typeof username !== 'string' ||
        typeof password !== 'string' ||
        !username ||
        !password
    ) {
        return fail(400, { invalid: true })
    }

    const user64 = Buffer.from(username).toString('base64');
    const pass64 = Buffer.from(password).toString('base64');

    const authResponse = await fetch('https://navigator.tu-dresden.de/api/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/vnd.tud.navigator.v1+json;charset=UTF-8',
        },
        body: JSON.stringify({
            "username": user64,
            "password": pass64,
            "university": 1,
            "from": ""
        })
    });

    if (authResponse.status == 401) return fail(400, { credentials: true });

    const authData = await authResponse.json();

    console.log(authData);
    console.log(authData.loginToken);

    cookies.set('loginToken', authData.loginToken, {
        path: '/',
        httpOnly: false,
        // only requests from same site can send cookies
        // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
        sameSite: 'strict',
        // only sent over HTTPS in production
        secure: process.env.NODE_ENV === 'production',
        // set cookie to expire after a month
        maxAge: 60 * 60 * 24 * 30,
    });

    cookies.set('username', user64, {
        path: '/',
        httpOnly: false,
        // only requests from same site can send cookies
        // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
        sameSite: 'strict',
        // only sent over HTTPS in production
        secure: process.env.NODE_ENV === 'production',
        // set cookie to expire after a month
        maxAge: 60 * 60 * 24 * 30,
    });

    if(savePassword) {
        cookies.set('password', pass64, {
            path: '/',
            httpOnly: false,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30,
        });
    } else {
        cookies.set('password', '', {
            path: '/',
            httpOnly: false,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30,
        });
    }

    throw redirect(302, '/');
}

export const actions: Actions = { login }