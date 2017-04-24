//
//
//
import axios from 'axios';


export default function requestData(api, param) {

	// let paramStr = JSON.stringify(param);
	// console.log(paramStr);

	return new Promise((resolve, reject) => {
		axios.get(api,{
			timeout: 20000,
			withCredentials: true
		})
		.then((response) => {
			console.log('请求成功-------')
			resolve(response)
		})
		.catch((error) => {
			console.log('请求失败-------',error)
			reject(error)
		})
	});
	// let paramStr = JSON.stringify(param);
	// console.log(paramStr);
	// let paramStr = JSON.stringify(param);

	// return new Promise((resolve, reject) => {
 //        fetch(api)
 //        .then((response) => response.json())
 //        .then((responseData) => {
 //            console.log('请求成功-------')
 //            resolve(responseData)
 //        })
 //        .catch((error) => {
 //        	console.log('请求失败-------',error)
 //            reject(error);
 //        })
 //    });

	// var xmlhttp;
	// var postRequestParam = JSON.stringify(requestParam) + '&action=' + api;

	// return new Promise((resolve, reject) => {
	// 	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
	//  		xmlhttp = new XMLHttpRequest();
	// 	} else {// code for IE6, IE5
	// 		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	// 	}

	// 	xmlhttp.onreadystatechange = function() {
	// 		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	// 			var serviceData = JSON.parse(xmlhttp.responseText);

	// 			resolve(serviceData);
	// 		}
	// 	}

	// 	xmlhttp.open(requestMethod, api);

	// 	if (requestMethod == "POST") {
	// 		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	// 		xmlhttp.send(postRequestParam);
	// 	} else {
	// 		xmlhttp.send();
	// 	}
	// });
}