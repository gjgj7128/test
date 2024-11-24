import {weatherSvg} from "./weatherSvg.js";
// console.log(weatherSvg);
const WEWTHER_API_KEY = "14f81daf1e494a66afe71318241910";
const MAPS_PLATFORM_API_KEY = "AIzaSyB14aweftuWa4DkztRzk5_JSU-e9f2xQWo";

function pos(location){
    const lat = location.lat; // 위도
    const lng = location.lng; // 경도
    const lang = "ko"; // 지원언어
    const days = 3; // 날짜
    const params = new URLSearchParams({
        "key": WEWTHER_API_KEY,
        "q": [lat, lng],
        "days": days,
        "lang" : lang,
    });
    const url = `https://api.weatherapi.com/v1/forecast.json?${params}`;
    
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        return insertData(data);
    }).catch(err => {
        return console.error('Error:', err);
    })
}

function geocoding(position){
    const lat = position.coords.latitude; // 위도
    const lng = position.coords.longitude; // 경도
    const params = new URLSearchParams({
        "key" : MAPS_PLATFORM_API_KEY,
        "latlng" : [lat,lng],
    })
    const url = `https://maps.googleapis.com/maps/api/geocode/json?${params}`;

    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        const locationName = document.querySelector(".location__name");
        locationName.innerText = data.results[4].formatted_address;
        return pos(data.results[4].geometry.location);
    })
};

// 텍스트 삽입
function insertData(data){
    // console.log(data)
    const current = data.current;
    const forecast = data.forecast;
    const currentHour = timeEpoch(data.location.localtime_epoch, forecast.forecastday[0].hour);

    const today = document.querySelector("#todayWeather"); // 오늘 날씨
    const tomorrow = document.querySelector("#tomorrowWeather"); // 내일 날씨
    const dayAfterTomorrow = document.querySelector("#dayAfterTomorrowWeather"); // 모레 날씨

    today.querySelector("span").innerText = textTranslations(current.condition);
    tomorrow.querySelector("span").innerText = textTranslations(forecast.forecastday[1].day.condition);
    dayAfterTomorrow.querySelector("span").innerText = textTranslations(forecast.forecastday[2].day.condition);
    today.querySelector(".svg__wrap").innerHTML = insertSvg(current.condition , today.querySelector("span"));
    tomorrow.querySelector(".svg__wrap").innerHTML = insertSvg(current.condition , tomorrow.querySelector("span"));
    dayAfterTomorrow.querySelector(".svg__wrap").innerHTML = insertSvg(current.condition , dayAfterTomorrow.querySelector("span"));

    
    const temC = document.querySelector(".temp_c span"); // 현재온도
    const feelslikeC = document.querySelector(".feelslike_c span"); // 체감온도
    const mintempC = document.querySelectorAll(".mintemp_c span"); // 최저온도
    const maxtempC = document.querySelectorAll(".maxtemp_c span"); // 최고온도
    const avgtempC = document.querySelectorAll(".avgtemp_c span"); // 평균온도
    
    temC.innerText = current.temp_c;
    feelslikeC.innerText = current.feelslike_c;
    itemForEach(mintempC, forecast.forecastday, findKeyArr("day.mintemp_c"));
    itemForEach(maxtempC, forecast.forecastday, findKeyArr("day.maxtemp_c"));
    itemForEach(avgtempC, forecast.forecastday, findKeyArr("day.avgtemp_c"));


    const humidity = document.querySelector(".humidity span"); // 습도
    const avghumidity = document.querySelectorAll(".avghumidity span"); // 평균 습도

    humidity.innerText = current.humidity !== undefined ? current.humidity : currentHour.humidity;
    itemForEach(avghumidity, forecast.forecastday, findKeyArr("day.avghumidity"));

    
    const totalprecipMm = document.querySelectorAll(".totalprecip_mm span"); // 총 강수량
    const precipMm = document.querySelector(".precip_mm span"); // 강수량
    const dailyChanceOfRain = document.querySelectorAll(".daily_chance_of_rain span"); // 일일 강수확률
    const chanceOfRain = document.querySelector(".chance_of_rain span"); // 강수확률

    itemForEach(totalprecipMm, forecast.forecastday, findKeyArr("day.totalprecip_mm"));
    precipMm.innerText = current.precip_mm !== undefined ? current.precip_mm : currentHour.precip_mm;
    itemForEach(dailyChanceOfRain, forecast.forecastday, findKeyArr("day.daily_chance_of_rain"));
    chanceOfRain.innerText = current.chance_of_rain !== undefined ? current.chance_of_rain : currentHour.chance_of_rain;

    const totalsnowCm = document.querySelectorAll(".totalsnow_cm span"); // 총 강설량
    const snowCm = document.querySelector(".snow_cm span"); // 강설량
    const dailyChanceOfSnow = document.querySelectorAll(".daily_chance_of_snow span"); // 일일 강설확률
    const chanceOfSnow = document.querySelector(".chance_of_snow span"); // 강설확률

    itemForEach(totalsnowCm, forecast.forecastday, findKeyArr("day.totalsnow_cm"));
    snowCm.innerText = current.snow_cm !== undefined ? current.snow_cm : currentHour.snow_cm;
    itemForEach(dailyChanceOfSnow, forecast.forecastday, findKeyArr("day.daily_chance_of_snow"));
    chanceOfSnow.innerText = current.chance_of_snow !== undefined ? current.chance_of_snow : currentHour.chance_of_snow;
    

    const sunrise = document.querySelectorAll(".sunrise time"); // 일출시간
    const sunset = document.querySelectorAll(".sunset time"); // 일몰시간
    
    itemForEach(sunrise, forecast.forecastday, findKeyArr("astro.sunrise"));
    itemForEach(sunset, forecast.forecastday, findKeyArr("astro.sunset"));


    backColor();
};
// 시간 확인
function timeEpoch(localtimeEpoch, hour){
    let currentTime = localtimeEpoch; // 현재 시간초
    const ms = 1 * 60 * 60; // 1시간 초 단위
    const arr = hour.find((time,idx) => {
        const setTime = time.time_epoch;
        return currentTime - ms <= setTime ? time : false;
    })
    return arr;
};

// 텍스트에 따라 svg 및 배경 색상 지정 정보
const weatherTranslations = {
    "비" : { svg : weatherSvg.rainy, id : "svgRainy", backColor : "rain",},
    "폭풍우" : { svg : weatherSvg.storm, id : "svgStorm", backColor : "rain",},
    "눈" : { svg : weatherSvg.snowy, id : "svgSnowy", backColor : "rain",},
    "흐림" : { svg : weatherSvg.cloudy, id : "svgCloudy", backColor : "rain",},
    "구름 많음" : { svg : weatherSvg.partly_cloudy, id : "svgPartlySloudy", backColor : null,},
    "맑음" : { svg : weatherSvg.sunny, id : "svgSunny", backColor : null,},
};
// 텍스트 일치화
const weatherTextUnify = {
    "비" : ["이슬비"],
    "폭풍우" : [],
    "눈" : [],
    "흐림" : ["흐린", "매우 흐림"],
    "구름 많음" : [],
    "맑음" : ["화창함"],
};
// 텍스트 통일 시키기
function textUnify(text){
    const unifyValueArr = Object.values(weatherTextUnify);
    let keyIdx; // key idx값 받을 변수
    const valueArr = unifyValueArr.filter((item,idx) => {
        if(item.includes(text)){
            keyIdx = idx;
            return item;
        }
    });
    const unifyKey = Object.keys(weatherTextUnify)[keyIdx];
    return unifyKey; 
}
// 텍스트 수정
function textTranslations(condition){
    const textArr = condition.text.trim().split(" ");
    const transKeyArr = Object.keys(weatherTranslations);
    let unify; // key 값 받을 변수
    const newArr = textArr.filter((item,idx) => {
        if(transKeyArr.includes(item)){
            return item;
        }else{
            unify = textUnify(item);
            return false;
        }
    });
    return newArr[0] === undefined ? unify : newArr[0];
};

// svg 추가
function insertSvg(condition, ele){
    const text = ele.innerText;
    return weatherTranslations[text] ? weatherTranslations[text].svg : false;
}
function backColor(){
    const weatherSvgs = document.querySelectorAll(".weather svg");
    weatherSvgs.forEach((item,idx) => {
        const span = item.parentElement.previousElementSibling;
        if(item.id === weatherTranslations[span.innerText].id){
            const bc = weatherTranslations[span.innerText].backColor;
            bc !== null ?  item.closest(".contents").classList.add(bc) : false;
        }
    });
};

// 문자열 키 배열 생성
function findKeyArr(keys){
    const findArr = keys.split(".");
    return findArr;
}
// 배열 요소의 키 찾기
function itemForEach(eleArr, dataArr, dataKeyArr){
    eleArr.forEach((ele,idx) => {
        const val = findKey(dataArr, dataKeyArr);
        if(val && val[idx] !== undefined){
            ele.textContent = val[idx];
            
        }
    });

}

// 중첩 배열 구조에서 특정 키 찾기
function findKey(arr, keys){
    let result = [];
    arr.forEach(item => {
        let val = item;
        for(let key of keys){
            val = val[key];
            if(val === undefined) break;
        }
        if(val !== undefined) result.push(val);
    })
   return result;
};

// 에러 메세지
function errorMsg(error){   
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("사용자가 위치 정보 제공을 거부했습니다. 시스템 설정에서 위치 서비스를 활성화해 주세요.");
            console.error("사용자가 위치 정보 제공을 거부했습니다. 시스템 설정에서 위치 서비스를 활성화해 주세요.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("위치 정보를 사용할 수 없습니다. 시스템 설정에서 위치 서비스를 활성화 해주세요.");
            console.error("위치 정보를 사용할 수 없습니다. 시스템 설정에서 위치 서비스를 활성화해 주세요.");
            break;
        case error.TIMEOUT:
            alert("위치 정보 요청 시간이 초과되었습니다. 재시도 해주세요.");
            console.error("위치 정보 요청 시간이 초과되었습니다. 재시도 해주세요.");
            break;
        default:
            alert("알 수 없는 오류가 발생했습니다.");
            console.error("알 수 없는 오류가 발생했습니다:", error.message);
            break;
    }
};
navigator.geolocation.getCurrentPosition(geocoding, errorMsg); 

