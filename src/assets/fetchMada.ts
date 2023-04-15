
const headers = {
    'authority': 'www.mdais.org',
    'sec-ch-ua': '"Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
    'dnt': '1',
    'accept-language': 'he',
    'sec-ch-ua-mobile': '?0',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36',
    'content-type': 'application/json',
    'accept': 'application/json, text/plain, */*',
    'sec-ch-ua-platform': '"macOS"',
    'origin': 'https://www.mdais.org',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    'referer': 'https://www.mdais.org/blood-donation',
    'cookie': '_ga=GA1.2.1698825273.1637841226; _fbp=fb.1.1637841226441.19954475; GCLB=CMuT68yTs7z6xAE; _gac_UA-24996870-1=1.1647332460.CjwKCAjw8sCRBhA6EiwA6_IF4Yrpkz8zbC_zbqueVJ9xQsSIE5-Ut3xnlD-doB2LUAWJrkGtVJrbsBoCqG4QAvD_BwE; __atssc=google%3B11; rbzid=wTUy/MCWPbEze27/q474mUvgL9+iw6ZKPwoMoEJuvcaiOjiJtRAnAOuTuIOK3z42nWFgs6h6jnwJJutlaEpoY1wyKLit2HeXYNdC46lwbeWP1Orm6hpnREN7du0941CIyneZdPonOOME3h9KacD0DuCQvejcFjejtsJqx0N8r/q9d1w5jgmrmWWsCC3fHUZqGsb4E5j/71RiOLQJCkJBNmE1SLB8JXmpq5GhSar/5dx/Jy9ddQx2GfT1SLwh+tJu; rbzsessionid=7c39416851351028a35fee43a1a9f74b; _gid=GA1.2.1852248166.1649138329; __atuvc=1%7C10%2C18%7C11%2C0%7C12%2C0%7C13%2C3%7C14; __atuvs=624bda9cfc8f12f3002; _gat_gtag_UA_24996870_1=1'
}
const body = '{"RequestHeader":{"Application":101,"Module":"BloodBank","Function":"GetAllDetailsDonations","Token":""},"RequestData":""}'


const request = new Request(import.meta.env.VITE_MADA_URL, {
    method: 'POST',
    headers,
    body
})

export default fetch(request)