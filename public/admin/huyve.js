
	getAllTicketsCancled()
	async function getAllTicketsCancled(){
		console.log("haha")
		$('.trash').remove();
		$("#table-hoadon").attr('height',20);
		const res1=await fetch('http://localhost:5000/vexe');
		const data1= await res1.json();
		const res = await fetch('http://localhost:5000/allTickets');
		const data = await res.json();
		for(var i=0;i<data1.length;i++){
			var ok=0;
			for(var j=0;j < data.length;j++){
				if(data1[i].MaVeXe==data[j].MaVeXe)ok=1;
			}
			if(ok==0)$('#MaVeXe-HuyVe').append(`<option>${data1[i].MaVeXe}</option>`);
		}
		var index =0;
		if(data.length <= 0) return ;
		for(var i=0;i < data.length;i++){
			if(true){
				var element='<td>'+String((Number(index)+1))+'</td>'+'<td>'+data[i].MaVeXe+'</td>'+'<td>'+data[i].Email+'</td>'+'<td>'+data[i].STK+'</td>'+'<td>'+data[i].DonGia+'</td>'+'<td>'+data[i].NgayHuy+'</td>'+'<td>'+data[i].TinhTrang+'</td>'+'</tr>';
				if(index%2==1){
					$("#table-vexehuy").append(
						'<tr height="50px" class="trash" style="background-color: #E4E4E4;">'+element);
					
				}else{
					$("#table-vexehuy").append(
						'<tr height="50px" class="trash">'+element);
					
				}
				index++;
			}
		}

	}
	async function handleDestroyTicket(){
		 const numbericRegex = new RegExp("^[0-9]{9,}");
		 let price = 0;
    if(numbericRegex.exec(document.querySelector('#STK').value) == null) return alert("Vui lòng điền đúng số tài khoản")
   console.log(document.querySelector('#MaVeXe-HuyVe').value)
try{
   const tic = await fetch(`http://localhost:5000/booking/ticket/${$('#MaVeXe-HuyVe').val()}`)
  const ticJson = await tic.json();
  console.log(tic)
  if(ticJson.length <= 0) return alert("Vé không tồn tại")

   const res = await fetch(`http://localhost:5000/getPostDetails/${ticJson[0].MaCX}`)
  const result = await res.json();

  	price = result[0].DonGia;
    fetch(`http://localhost:5000/destroy/${document.querySelector('#MaVeXe-HuyVe').value}`,{
       method: 'POST',
        headers:{
            'Content-Type' :'application/json'
        },
        body: JSON.stringify({
          'MaVeXe':$('#MaVeXe-HuyVe').val(),
          'STK':$('#STK').val(),
          'DonGia': price,
          "NgayHuy":formatDate()
          
        })
    })
    .then(res => res.json())
    .then(res =>{
    	if(res.err == 0) return alert("Huy ve thanh cong")
    	if(res.err == 1) return alert("Không tồn tại vé")
    	if(res.err == 2) return alert("Đã xảy ra lỗi. Thử lại")
    		window.location.href = window.location.href;
    	
    })
	}catch(err){

	}
 }
	function formatDate(){
		let date = new Date();
		  let dateString = "";
		  dateString += `${date.getFullYear()}-`;

		  if(date.getMonth() +1 < 10) dateString += `0${date.getMonth() +1}-`
		  else dateString += `${date.getMonth() +1}-`

		  if(date.getDate() < 10) dateString += `0${date.getDate()}`
		  else dateString += `${date.getDate()}`

		  return dateString
	}
