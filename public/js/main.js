$(document).ready(function () {


		// 點擊新增空間時，新增一行空間的輸入框
	$("#addroom").click(function () {
		$("#roomlist").append(
			`
			<tr>
			<th scope="row">   

			<select class="form-control" id="location" name="roomId" required>
			{{!-- 遍歷新空間陣列 --}}
			{{#each ../confRooms}}
			<option>第一會議室</option>
			<option>第二會議室</option>
			<option>第三會議室</option>
			<option>第四會議室</option>
			<option>第五會議室</option>
			{{/each}}
			</select>
		   </th>
		   <td>
					<button type='button' class='btn btn-outline-danger btn-sm deleteroom' id=''>
						<spanaria-hidden='true'>&#10006;</span>
					</button>
				</td>
		   </tr>

			`.trim());
	});


























	// 點擊新增與會人員時，新增一行與會人員資料的輸入框
	$("#addattend").click(function () {
		$("#attendeelist").append(
			`
				<tr class='attendee' id='delattendee'>
					<th scope='row'>
						<input class='form-control edit ' list='employeeList' name='attendees' size='10' required>
						<datalist id='employeeList'>
						{{#each ../users}}
							<option></option>
						{{/each}}
						</datalist>
					</th>
					<td>
						<select class='form-control edit' name='attendTypes'>
							<option value='1' selected>出席</option>
						</select>
					</td>
					<td valign='middle'></td>
					<td class='addbtn'>
						<button type='button' class='btn btn-outline-warning btn-sm edit deleteattend'>
							<span aria-hidden='true'>&#10006;</span>
						</button>
					</td>
				</tr>
			`.trim());
	});

	// 點擊新增與會人員時，新增一行與會人員資料的輸入框
	$("#addattend2").click(function () {
		$("#attendeelist2").append(
			`
				<tr class='attendee2' id='delattendee'>
					<th scope='row'>
						<input class='form-control edit ' list='employeeList' name='attendees2' size='10' required>
						<datalist id='employeeList'>
						{{#each ../users}}
							<option></option>
						{{/each}}
						</datalist>
					</th>
					<td>
						<select class='form-control edit' name='attendTypes'>
							<option value='2' selected>列席</option>
						</select>
					</td>
					<td valign='middle'></td>
					<td class='addbtn'>
						<button type='button' class='btn btn-outline-warning btn-sm edit deleteattend'>
							<span aria-hidden='true'>&#10006;</span>
						</button>
					</td>
				</tr>
			`.trim());
	});

	// 點擊新增通知人員時，新增一行通知人員資料的輸入框
	$("#addemail").click(function () {
		$("#emaillist").append(
			`
			<tr class='mail' id='delemail'>
				<th scope='row'>
					<input class='form-control' list='employeeList' name='employees' size='10'>
					<datalist id='employeeList'>
						<option></option>
					</datalist>
				</th>
				<td>
					<button type='button' class='btn btn-outline-danger btn-sm deleteemail' id=''>
						<spanaria-hidden='true'>&#10006;</span>
					</button>
				</td>
			</tr>
			`
		);
	});

});

// 點擊空間單行後面的刪除按鈕時，便刪除空間
$(document).on("click", ".deleteroom", function () {

	$(this).parent().parent().remove();

});



// 點擊與會人員單行後面的刪除按鈕時，便刪除按鈕當行與會人員
$(document).on("click", ".deleteattend", function () {

	$(this).parent().parent().remove();

});

// 點擊通知人員單行後面的刪除按鈕時，便刪除按鈕當行通知人員
$(document).on("click", ".deleteemail", function () {
	$(this).parent().parent().remove();
});

// 點擊成本計算時，計算與會清單內人數與場地費用
function costCalculate(laborCost, roomCost) {
	// 計算與會清單人數	
	const peoplenum = $("#attendeelist").children("tr").length;

	// 顯示文字
	$("#peoplecost").html(
		`
			<div class='row'>
				<div class='col'>本會議人數為 ${peoplenum + 1} 人，每人500元人事費，總人事費為 ${laborCost} 元。</div>
			</div>
			<div class='row'>
				<div class='col'>場地費為 ${roomCost} 元。</div>
			</div>
			<div class='row'>
				<div class='col'>會議總費用為 ${laborCost + roomCost} 元。</div>
			</div>
		`
	)

}

// 點擊編輯，啟用資訊頁面的輸入框(去掉disable)
$(function () {
	$("#openedit").click(function () {

		$(".edit").attr("disabled", false);

		// 啟用編輯後，出現新增、刪除與會人員的按鈕，並出現保存變更的按鈕
		$(".addbtn").show();

	});
});

// 預設資訊頁面不出現編輯時的新增、刪除及保存按鈕
$(function () {
	$(".addbtn").hide();
});

// 點擊表格列，前往會議資訊
function tableClick(confId) {
	window.location.href = `/confInfo?id=${confId}`
};

// 點擊通知的表格列，前往會議資訊
function noticeTableClick(noticeId, confId) {
	window.location.href = `/notice/${noticeId}?confId=${confId}`
}

// 點擊表格列，前往會議室會議資訊
function listTableClick(roomId) {
	window.location.href = `/list/roomInfo?id=${roomId}`
};
