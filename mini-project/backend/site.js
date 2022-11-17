import 'dotenv/config'
import axios from 'axios';
import cheerio from 'cheerio';

//1. 사용자가 입력한 사이트의 주소가 유효한지 확인.
export function checkValidationSite(mySite){

    if(mySite === undefined || mySite.includes("http") === false){
        console.log("에러 발생!!! 선호하는 사이트 주소를 제대로 입력해 주세요!!!")
        return false
    }else{

    return true
    }
}

//2.사용자가 입력한 사이트의 OG데이터 가져오기

export async function createOgObject(prefer){
    //사이트의 정보를 담을 객체
    const og ={
        title : '',
        description : '',
        image : ''
    }
    //1. 해당 문장을 axios.get으로 html코드 받아오기 => 스크래핑
    const result = await axios.get(prefer)

    //2. 스크래핑 결과 result에서 open data인 OG코드 골라서 변수에 저장하기
    const $ = cheerio.load(result.data)
    
    //$ 안에서 meta태그만골라줘.
    //each()는 치어리오에서의 for문 each((idex,element)=>{})
    $('meta').each((_,el)=>{
        //매타태그중에서 property속성을 가지고 있고 og:이라는 단어를 가지고 있는 것들만~
        if($(el).attr("property")?.includes("og:")){ 
            const key = $(el).attr("property").split(':')[1] //split을 통해서 분리후 이름만 가져오기.
            const value = $(el).attr("content")
            //콘솔창에 출력.
            console.log(key, value)
            //객체에 저장.
            og[key] = value
        }
    })

    return og

}