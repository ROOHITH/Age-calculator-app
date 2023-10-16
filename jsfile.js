$(".error").hide();
$('.date').removeClass('whenerror');

function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const today = new Date();
  
    let age = {};
    age.year = today.getFullYear() - dob.getFullYear();
    age.month = today.getMonth() - dob.getMonth();
    age.day = today.getDate() - dob.getDate();
  
    if (age.day < 0) {
      const daysInLastMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      age.month -= 1;
      age.day = daysInLastMonth + age.day;
    }
  
    if (age.month < 0) {
      age.year -= 1;
      age.month = 12 + age.month;
    }
  
    return age;
  }
  function animateValue(obj, start, end, duration, callback) {
    let startTimestamp = null;
  
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      $(obj).text(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        if (typeof callback === 'function') {
          callback(); // Invoke the callback when animation is completed
        }
      }
    };
  
    window.requestAnimationFrame(step);
  }
  
  
document.getElementById("validateForm").addEventListener("click", function (event) {
   $('.d1y').text('- -');
   $('.d1m').text('- -');
   $('.d1d').text('- -');

    const day = parseInt(document.getElementById("day").value, 10);
    const month = parseInt(document.getElementById("month").value, 10);
    const year = parseInt(document.getElementById("year").value, 10);
    const currentDate = new Date();
    const selectedDate = new Date(year, month - 1, day);
  
    if (!day || !month || !year) {
     $(".error").show();
     $('.date').addClass('whenerror');
      event.preventDefault();
    } else if (day < 1 || day > 31 || month < 1 || month > 12) {

      $(".monthError").show();
      $(".dayError").show();
      $('.date').addClass('whenerror');
      event.preventDefault();
    } else if (selectedDate > currentDate) {
     
      $(".error").show();
      $('.date').addClass('whenerror');
      event.preventDefault();
    } else if (selectedDate.getMonth() + 1 !== month || selectedDate.getDate() !== day) {
     
      $(".error").show();
      $('.date').addClass('whenerror');
      event.preventDefault();
    } else {
      // Form is valid, you can proceed with submission
      let dateOfBirth =year+`-`+month+`-`+day;
      console.log(dateOfBirth);
     let age = calculateAge(dateOfBirth);

     animateValue($('.d1y'), 0, Number(age.year), 5000, function () {
        animateValue($('.d1m'), 0, Number(age.month), 5000, function () {
          animateValue($('.d1d'), 0, Number(age.day), 5000, function () {
            // All animations have completed
          });
        });
      });
      
  
      $(".error").hide();
      $('.date').removeClass('whenerror');
      
    }
  });
  

  