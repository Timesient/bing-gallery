# Bing Gallery
Collect wallpapers from Bing homepage everyday, inspired by:
- [peapix.com](https://peapix.com)
- [bing.ioliu.cn](https://bing.ioliu.cn/)
- [TimothyYe/bing-wallpaper](https://github.com/TimothyYe/bing-wallpaper)

and developed with [React](https://reactjs.org/) and [Next.js](https://nextjs.org/), deploy on [https://bing.dd1969.xyz](https://bing.dd1969.xyz)

## API

### basic
- Endpoint: `https://bing.dd1969.xyz/api/images`
- Method: `HTTP GET`

### parameters
- `mode`: **required**, must be one of:
  - `latest`: get the latest set of data
  - `random`: get one set of data randomly from database
  - `all`: get all data from database
- `cc`: **required**, means *country code*, must be one of:
  - `au`: Australia
  - `ca`: Canada
  - `cn`: China
  - `de`: Germany
  - `fr`: France
  - `in`: India
  - `jp`: Japan
  - `es`: Spain
  - `gb`: United Kingdom
  - `us`: United States
  - `it`: Italy
- `format`: **required if** `mode` **is** `latest` **or** `random`, must be one of:
  - `json`: the response type is json
  - `image`: will redirect to the image, can be used in `<img src='...'>`, `background-image: url(...)`, etc.
- `resolution`: **required if** `format` **is** `image`, must be one of:
  - `1920x1080`: the image resolution is 1920x1080
  - `UHD`: the image resolution is over 4K

### Request Examples
```
https://bing.dd1969.xyz/api/images?mode=latest&cc=cn&format=json
```
```
https://bing.dd1969.xyz/api/images?mode=random&cc=fr&format=image&resolution=1920x1080
```
```
https://bing.dd1969.xyz/api/images?mode=all&cc=gb
```

### Response Example
``` javascript
{
  "data": {
    "headline": "A right royal tradition",
    "title": "Street party for the coronation of Queen Elizabeth II in 1953",
    "copyright": "© KGPA Ltd/Alamy",
    "description": "As the Queen’s Platinum Jubilee celebrations draw to a close, neighbours across the UK will sit down to tables festooned with bunting and laden with food for The Big Jubilee Lunch. Street parties have been thrown to celebrate major events for more than a century, with roots in earlier “street dressing” traditions. But it was the ‘peace teas’ arranged in 1919 for children to celebrate the end of WWI that began the tradition of street parties as we know them. More followed in 1935, for the Jubilee of King George V, in 1937 for the coronation of George VI, and for VE and VJ days at the end of World War Two.",
    "quickFact": "An estimated 27m people in the UK watched the 1953 coronation on TV - for many, the first time they had watched a televised event.",
    "knowMoreURL": "https://www.bing.com/search?q=queen+Elizabeth+II+platinum+jubilee&form=hpcapt&filters=HpDate:"20220604_2300"",
    "timestamp": 1654383600000,
    "id": "OHR.JubileeParty_EN-GB9608177289",
    "urls": {
      "UHD": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_UHD.jpg",
      "1920x1200": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_1920x1200.jpg",
      "1920x1080": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_1920x1080.jpg",
      "1366x768": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_1366x768.jpg",
      "1280x768": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_1280x768.jpg",
      "1024x768": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_1024x768.jpg",
      "800x600": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_800x600.jpg",
      "800x480": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_800x480.jpg",
      "768x1280": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_768x1280.jpg",
      "720x1280": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_720x1280.jpg",
      "640x480": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_640x480.jpg",
      "480x800": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_480x800.jpg",
      "400x240": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_400x240.jpg",
      "320x240": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_320x240.jpg",
      "240x320": "https://www.bing.com/th?id=OHR.JubileeParty_EN-GB9608177289_240x320.jpg"
    }
  }
}
```

## For development

### build
``` bash
git clone https://github.com/Timesient/bing-gallery.git
npm install
```
### run
```bash
npm run dev
```
Open [http://localhost:23456](http://localhost:23456) with your browser to see the result.