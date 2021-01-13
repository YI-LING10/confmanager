// 檢查新增會議的資料
function checkCreateForm() {

    const startTime = document.forms["createConfForm"]["startTime"].value
    const endTime = document.forms["createConfForm"]["endTime"].value

    // 將日期轉成 timestamp 格式
    const startTimestamp = Date.parse(startTime).valueOf()
    const endTimestamp = Date.parse(endTime).valueOf()

    // 判斷時間是否正確
    if (startTimestamp >= endTimestamp) {
        alert("結束時間需晚於開始時間！")
        document.forms["createConfForm"]["startTime"].focus()
        return false
    }

    const chairId = $("input[name='chairId']").val() // 取得主持人員工編號

    // 取得每個出席與會者
    let attendees = [] // 物件
    $("input[name='attendees']").each(function () {
        console.log($(this).val())
        attendees.push($(this).val())
    })
    //取得每個列席與會者
    let attendees2 = [] // 物件
    $("input[name='attendees2']").each(function () {
        console.log($(this).val())
        attendees2.push($(this).val())
    })



    // console.log(typeof (chairId), chairId)
    // console.log(typeof (attendees), attendees)

    // 取得跟主持人編號相同的與會者
    const repeat = attendees.find((item) => item === `${chairId}`)
    const repeat2 = attendees2.find((item) => item === `${chairId}`)
    
    // console.log(repeat)

    // 如果repeat不是undefined->需要修改表單
    if (repeat) {
        alert("主持人不能跟出席者重複！")
        document.forms["createConfForm"]["chairId"].focus()
        return false
    }

    else if (repeat2) {
        alert("主持人不能跟列席者重複！")
        document.forms["createConfForm"]["chairId"].focus()
        return false
    }
    let i=0;
    for(i=0;i<attendees2.length;i++)
    {
        const repeat3= attendees.find((item) => item === `${attendees2[i]}`)
        if (repeat3){
            alert("出席者不能跟與會者重複！")
            
            return false
        }
             
    }
    for(i=0;i<attendees2.length;i++)
    {
        
        const repeat4= attendees2.find((item) => item === `${attendees[i]}`)
       
         if(repeat4){
            alert("出席者不能跟與會者重複！")
            
            return false
        }           
    }

   

    
}
