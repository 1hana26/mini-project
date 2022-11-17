import {getToday} from "./utils.js"
import nodemailer from "nodemailer"
import 'dotenv/config'

//1
export function checkValidationEmail(myEmail){

    if(myEmail === undefined || myEmail.includes("@") === false){
        console.log("에러 발생!!! 이메일을 제대로 입력해 주세요!!!")
        return false
    }else{

    return true
    }
}

//2.
export function getWelcomeTemplate({name,email,personal,prefer,pwd,phone}){ 
    
    const myTemplate = `
        <html>
            <body>
                <div style="display: flex; flex-direction : column; align-items: center;">
                    <div style = "width: 500px">
                        <h1>${name}님, 가입을 환영합니다!!!!!</h1>
                        <hr>
                        <div>입력하신 정보는 아래와 같습니다</div>
                        <div style = "color : purple">이름 : ${name}</div>
                        <div style = "color : purple">입력하신 이메일 주소 : ${email} </div>
                        <div style = "color : purple">전화번호 : ${phone}</div>
                        <div style = "color : purple">좋아하는 사이트 : ${prefer}</div>
                        <div style = "color : red">가입일 : ${getToday()}</div>
                        <div> 앞으로도 저희와 오래오래 함께해주세요 :) </div>
                    </div>
                </div>
                                
            </body>
        </html>
    `
    return myTemplate
}

//3.
export async function sendTemplateToEmail(myEmail,result){
    //직접 이메일 보내기 이전의 코드
    //console.log(`${email} 주소로 가입환영 템플릿"${result}"을 전송합니다.`)

    const EMAIL_USER = process.env.EMAIL_USER
    const EMAIL_PASS = process.env.EMAIL_PASS
    const EMAIL_SENDER = process.env.EMAIL_SENDER

    const transporter = nodemailer.createTransport({
        service : "gmail",
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    })

    const response = await transporter.sendMail({
        from: EMAIL_SENDER,
        to: myEmail,
        subject: "가입을 환영합니다.",
        html: result ,
    })

    console.log(response)
}

