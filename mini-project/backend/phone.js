import coolsms from "coolsms-node-sdk"
import 'dotenv/config'


export function checkValidationPhone(myPhone){
    //1. 휴대폰번호 자리수 맞는지 확인하기

    if(myPhone.length === 10 || myPhone.length === 11){
        
        return true
        //early exit patton  안되는 경우의 수부터 해결하자.
        //잘못 됬는지 잘됬는지를 반환하고 밖의 함수를 return을 해야함!
    } else {
        console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!")
        return false
    }


}

export function getToken(){
    //2. 핸드폰 토큰 6자리 만들기

    const num = 6 //인증번호 갯수
    
    if(num === undefined){
        console.log("에러 발생!!! 갯수를 제대로 입력해 주세요.")
        return
    }else if(num <=0){
        console.log("에러 발생!!! 갯수가 너무 적습니다!!!")
        return
    }else if(num >= 10){
        console.log("에러 발생!!! 갯수가 너무 많습니다!!!")
        return
    }

    const result = String(Math.floor(Math.random() * 10 ** num)).padStart(num,"0")
    //인증 번호 토큰

    //console.log(result)

    return result
}

export async function sendTokenToSMS({myPhone,myToken}){
    // const result = myToken
    //3. 핸드폰 번호에 토큰 전송하기
    //개인정보를 입력할 변수를 만들고, .env에서 가져오기.
    const SMS_KEY = process.env.SMS_KEY;
    const SMS_SECRET = process.env.SMS_SECRET;
    const SMS_SENDER = process.env.SMS_SENDER;

    const mySMS = coolsms.default
    const messageService = new mySMS(SMS_KEY,SMS_SECRET) 
    //api key와 secret를 ""안 입력.

    const response = await messageService.sendOne({
        to: myPhone,
        from: SMS_SENDER,
        text: `[나에게 보내는 메시지] 안녕하세요. 요청하신 인증번호는 ${myToken}입니다.`
    })
    //요청이 coolSMS 백앤드로 가고, 백앤드에서 통신사로 보냄. 응답을 기다리고 응답 결과를 확인.

    console.log(response);//응답 결과를 확인
}
