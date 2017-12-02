document.addEventListener('DOMContentLoaded', init);

function init() {
    //when the html qnd js finish loading run this script
    document.getElementById('btnSend').addEventListener('click', getNumbers)
    document.getElementById('btnBack').addEventListener('click', nav)
}

function nav(ev) {
    let btn = ev.target;
    console.log(btn.id);
    switch (btn.id) {
        case 'btnSend':
            document.getElementById('home').classList.remove('active');
            document.getElementById('list').classList.add('active');
//            getNumbers();
            break;
        case 'btnBack':
            document.getElementById('home').classList.add('active');
            document.getElementById('list').classList.remove('active');
            break;
    }
}

//    function makeURL() {
//        let url = "http://10/mad9014-loto/nums.php?";
//        //        get the digits and max frim the form
//        let digits = document.getElementById('digits');
//        let max = document.getElementById('max');
//        url = `${url}digits=${digits.value}&max=${max.value}`;
//        return url;
//
//    }

    function getNumbers(ev) {
        ev.preventDefault();
        //        let url = makeURL();
        let url = "http://localhost/mad9014-lotto/nums.php?";
        let fd = new FormData();
        let d = document.getElementById('digits');
        let m = document.getElementById('max');

        let dv = d.value;
        let mv = m.value;

        if (parseInt(mv) < parseInt(dv) * 2) {
            //the max value must be at least doubble digit
            let btn =document.getElementById('btnBack');
            btn.dispatchEvent(new MouseEvent('click'));
            alert('Your max value is too low');

        } else if (isNaN(mv) || isNaN(dv)) {
            alert('you must provid numeric values for digits and max');
            let btn =document.getElementById('btnBack');
            btn.dispatchEvent(new MouseEvent('click'));
        }else if(mv.trim() == ""|| dv.trim() == ""){
            
        } 
        else {

            nav(ev);
            //do the fatch
            //all the other code for below goes here.
            fd.append('digits', dv);
            fd.append('max', mv);

            let h = new Headers({
                
            });
            let info = {
                method: 'POST',
                headers: h,
                body: fd
            };

            fetch(url, info)
    
                .then(response => response.json())
                .then(data => {
                    if (data.code == 0) {
                        let ul = document.querySelector('ul.num_list');
                        ul.innerHTML = "";
                        data.numbers.forEach((num) => {
                            let li = document.createElement("li");
                            li.className = "num";
                            li.textContent = num;
                            ul.appendChild(li);
                           
                            
                        })

                    } else {
                        //the code was bad.... do someting.......
                    }
                })
           
        }
    }