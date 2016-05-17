function makePasscodeRequest(data, url, cb) {
  var requestData = JSON.stringify(data);
  var headers = new Headers({
      'Content-Type': 'application/json; charset=UTF-8',
      'x-csrftoken': document.cookie.match(/csrftoken=(\w+)/)[1]
  });

  fetch(url, {
    method: 'POST',
    headers: headers,
    credentials: 'include',
    body: requestData
  }).then(function(response) {
    console.log(response.status);
    if(response.status === 200){
      cb();
    }else{
      cb(response);
    }
  }); 
}

function inputAllPasscodes(list) {
  var data = { 
    v: Array.prototype.map.call(document.querySelectorAll('script'),function(el){ return el.src }).toString().match(/gen_dashboard_(\w+).js/)[1]

  };

  
  var start = 0;
  var offset = list.length/10;
    for(start; start < list.length; start+=offset) {
      
    setTimeout((function(i){
      return function() { alert(i); }
    })(start), start * 1000 - ((start-offset) * 1000) + 1000)
    // (list.slice(start, start+offset)).forEach( function(el) {
    //   data.passcode = ""+el;
    //   makePasscodeRequest(data, 'r/redeemReward');
    // });
  }
}

function runInSeries(list){
  var data = { 
    v: Array.prototype.map.call(document.querySelectorAll('script'),function(el){ return el.src }).toString().match(/gen_dashboard_(\w+).js/)[1]
  };
  async.eachLimit(list, 10, function( value, cb) {
      
      makePasscodeRequest({
          v: data.v,
          passcode: "" + value,
        }, 'r/redeemReward', cb);

  }, function( err ) { if(err) console.log(err); });
}
inputAllPasscodes(ingress_passcodes_list);
// runInSeries([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
// 
// runInSeries(ingress_passcodes_list);
// setTimeout(
//   function(){
//     runInSeries(ingress_passcodes_list);
//   }, 2000);