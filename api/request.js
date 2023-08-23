export default () =>  (() => {
    return fetch("https://www.mdais.org/umbraco/api/invoker/execute", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "he",
            "content-type": "application/json",
            "sec-ch-ua": "\"Chromium\";v=\"112\", \"Google Chrome\";v=\"112\", \"Not:A-Brand\";v=\"99\"",
            'dnt': '1',
            'sec-ch-ua-mobile': '?0',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36',
            'origin': 'https://www.mdais.org',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://www.mdais.org/blood-donation',
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-gpc": "1",
            "cookie": "GCLB=CK2TyZmj2MaW0gE; rbzid=E5HZdntSNcf13hXTIFC4UsLbpwQ5zyq5xLxCRMohzas/+98rp7oaDL6PA5L2OY3ddSSXbvsvuyvw9hfoXLQRfL9Kv9fX30O/ROQABN+q/78iKgx6BE99Gf/r8RcFvNWyMzXPhV7UCUoqiZqZSAAfPwb0nZ3V5e0oAlIfQQV6ki4gdSZHBJwfflSWtj18X3GilYZ7jJXYFs7vkgFrkm8GolLs0vj9grJxq+sf3AS4jrs=; rbzsessionid=4f2dd1b7808cbafab95244794115c547; _ga=GA1.1.778795905.1681542814; _ga_X02F6V2R9K=GS1.1.1681551465.2.0.1681552979.0.0.0"
        },
        "referrer": "https://www.mdais.org/blood-donation",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{\"RequestHeader\":{\"Application\":101,\"Module\":\"BloodBank\",\"Function\":\"GetAllDetailsDonations\",\"Token\":\"\"},\"RequestData\":\"\"}",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    })
})().then(res => res.json()).then((data) => {
    if (data.Success) {
        return data.Result
    }
})