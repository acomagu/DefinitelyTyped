import { Cookie, CookieJar, MemoryCookieStore } from 'tough-cookie';

let header = '';
const cb = () => { };

const cookie = Cookie.parse(header)!;
cookie.value = 'somethingdifferent';
cookie.sameSite = 'none';
header = cookie.toString();

const cookiejar = new CookieJar();
cookiejar.setCookie(cookie, 'http://currentdomain.example.com/path', cb);
// ...
cookiejar.getCookies('http://example.com/otherpath', (err, cookies) => {
    // res.headers['cookie'] = cookies.join('; ');
});

// All option are optional.
cookiejar.getCookies('http://example.com/otherpath', {}, () => {});

cookiejar.getCookies('http://example.com/otherpath', {
    now: new Date(),
    expire: false,
    allPaths: true,
    sameSiteContext: 'strict',
}, () => {});

CookieJar.deserializeSync("test cookie with store", new MemoryCookieStore());
CookieJar.deserializeSync("test cookie");
