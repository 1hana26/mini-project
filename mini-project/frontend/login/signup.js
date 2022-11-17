// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex'
  const myPhone = document.getElementById("PhoneNumber01").value+document.getElementById("PhoneNumber02").value+document.getElementById("PhoneNumber03").value


  console.log( "나의 핸드폰 번호는" ,myPhone) // 콤마를 통해서 연결.
            
  //2. 해당 휴대폰번호로 인증번호 api요청하기
  await axios.post("http://localhost:3000/tokens/phone",{
    myPhone: myPhone
    }).then((res)=>{
    console.log(res);
  })

  console.log('인증 번호 전송')
}

// 핸드폰 인증 완료 API 요청
const submitToken = () => {
  const myPhone = document.getElementById("PhoneNumber01").value+document.getElementById("PhoneNumber02").value+document.getElementById("PhoneNumber03").value
  const token = document.getElementById("TokenInput").value

  axios.patch("http://localhost:3000/tokens/phone",{
    myPhone : myPhone,
    token :token
  }).then((res)=>{
    if(res === false){
      console.log("인증에 실패하였습니다.")
      return false
    } 
    if(res === true) {
      console.log("인증에 성공하였습니다. ")
      return true
    }
  })
  //console.log('핸드폰 인증 완료')
}

// 회원 가입 API 요청
const submitSignup = async () => {
  const name = document.getElementById("SignupName").value;
  const email = document.getElementById("SignupEmail").value;
  const personal = document.getElementById("SignupPersonal1").value+"-"+document.getElementById("SignupPersonal2").value;
  const phone = document.getElementById("PhoneNumber01").value+document.getElementById("PhoneNumber02").value+document.getElementById("PhoneNumber03").value;
  const prefer = document.getElementById("SignupPrefer").value;
  const pwd = document.getElementById("SignupPwd").value;
  
  
  axios.post("http://localhost:3000/user",{
    name,
    email,
    personal,
    prefer,
    pwd,
    phone
  }).then((res)=>{
    console.log(res);
  })
  console.log('회원 가입 완료')
}
